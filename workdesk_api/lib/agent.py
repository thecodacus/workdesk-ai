import os
from langchain import PromptTemplate

from langchain.vectorstores import Chroma 
from langchain.embeddings import OpenAIEmbeddings 
from langchain.text_splitter import RecursiveCharacterTextSplitter 
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQAWithSourcesChain ,RetrievalQA
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
        embedding = OpenAIEmbeddings(openai_api_key=api_key)
        vectordb = Chroma(persist_directory=self.dbPath, embedding_function=embedding)
        retriever=vectordb.as_retriever(search_kwargs={"k": k_count})
        return retriever

class AgentManager:
    def __init__(self) -> None:
        pass
    def get_answer(self,retriever,question:str,api_key:str,qaType:str='stuff',model_name:str='gpt-3.5-turbo',temperature:float=0)->None:
        llm=ChatOpenAI(
            temperature=temperature,
            model_name=model_name,
            openai_api_key=api_key
        )
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm, 
            chain_type=qaType, 
            retriever=retriever, 
            return_source_documents=True,
            # chain_type_kwargs={'prompt':PROMPT}
        )
        
        return qa_chain(question)
