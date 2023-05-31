import os
from langchain import LLMChain, PromptTemplate

from langchain.vectorstores import Chroma 
from langchain.embeddings import OpenAIEmbeddings 
from langchain.text_splitter import RecursiveCharacterTextSplitter 
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.chains import  RetrievalQA,ConversationalRetrievalChain
from langchain.chains.question_answering import load_qa_chain
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.chains.conversational_retrieval.prompts import CONDENSE_QUESTION_PROMPT
from langchain.document_loaders import TextLoader, PyPDFLoader
from langchain.document_loaders import DirectoryLoader

class DocumentManager:
    def __init__(self,documentPath:str,dbPath:str) -> None:
        self.documentPath=documentPath
        
        self.dbPath=dbPath
    
    def loadDocs(self,api_key:str):
        txtloader=DirectoryLoader(self.documentPath,glob="*.txt",loader_cls=TextLoader)
        pdfloader=DirectoryLoader(self.documentPath,glob="*.pdf",loader_cls=PyPDFLoader)
        txtDocuments=txtloader.load()
        pdfDocuments=pdfloader.load()
        documents=txtDocuments+pdfDocuments
        print(f"loading {len(documents)} documents",documents[0])



        text_splitter=RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts=text_splitter.split_documents(documents=documents)
        embedding = OpenAIEmbeddings(openai_api_key=api_key)
        vectordb =Chroma.from_documents(documents=texts,embedding=embedding,persist_directory=self.dbPath)
        vectordb.persist()
    
    def getRetriever(self,api_key:str,k_count:int=2):
        print("loading retriever at path:",self.dbPath)
        embedding = OpenAIEmbeddings(openai_api_key=api_key)
        vectordb = Chroma(persist_directory=self.dbPath, embedding_function=embedding)
        retriever=vectordb.as_retriever(search_kwargs={"k": k_count})
        
        print("retriever loaded")
        return retriever

class AgentManager:
    def __init__(self) -> None:
        pass
    def get_answer(self,retriever,question:str,messages:dict,api_key:str,qaType:str='stuff',model_name:str='gpt-3.5-turbo',temperature:float=0)->None:
        llm=ChatOpenAI(
            temperature=temperature,
            model_name=model_name,
            openai_api_key=api_key
        )
        queries=[f"{m['message']}" for m in messages if m['role']=='User']
        answers=[f"{m['message']}" for m in messages if m['role']=='AI']
        # chatPairLength=len(answers)

        chat_history=[(queries[ind],answer) for ind, answer in enumerate(answers)]
        
        question_generator = LLMChain(llm=llm, prompt=CONDENSE_QUESTION_PROMPT)
        doc_chain = load_qa_chain(llm, chain_type=qaType)

        qa_chain = ConversationalRetrievalChain(
            retriever=retriever,
            question_generator=question_generator,
            combine_docs_chain=doc_chain,
            return_source_documents=True
        )
        
        return qa_chain({"question": question,'chat_history':chat_history})
