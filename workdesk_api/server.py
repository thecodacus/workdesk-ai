import shutil
from typing import Annotated, List, Union
from tinydb import TinyDB, Query, where
import os
from fastapi import FastAPI, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import time
from chromadb.config import Settings
from workdesk_api.lib.agent import AgentManager, DocumentManager
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException

# make directory "./db" if not exist
dataPath="./data"
if not os.path.exists(dataPath):
    os.mkdir(dataPath)

if not os.path.exists(f"{dataPath}/db"):
    os.mkdir(f"{dataPath}/db")

if not os.path.exists(f"{dataPath}/db/config"):
    os.mkdir(f"{dataPath}/db/config")

if not os.path.exists(f"{dataPath}/db/chroma"):
    os.mkdir(f"{dataPath}/db/chroma")

if not os.path.exists(f"{dataPath}/docs"):
    os.mkdir(f"{dataPath}/docs")


chromadbBasePath=f"{dataPath}/db/chroma"

projectDB = TinyDB(f'{dataPath}/db/config/projects.json')
documentDB = TinyDB(f'{dataPath}/db/config/documents.json')





app = FastAPI(title="my app root")
api_app = FastAPI(title="my existing api")



api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@api_app.get("/projects/")
async def get_all_projects():
    return  projectDB.all()


@api_app.post("/projects/")
async def create_project(request: Request):
    project=await request.json()
    # generate id using current timestamp
    project['id']= str(int(round(time.time() * 1000)))
    print(project)
    projectDB.insert(project)
    return {'id':project['id']}

@api_app.get("/projects/{id}/")
async def get_project_by_id(id):
    # print("getting project by id",str(id))
    data= projectDB.search(where('id')==id)
    # print(data)
    return data

@api_app.delete("/projects/{id}/")
async def delete_project_by_id(id):
    query=Query()
    projectDB.remove(query.id==id)
    return {'id':id}

@api_app.put("/projects/{id}/")
async def update_project_by_id(id,request: Request):
    project=await request.json()
    query=Query()
    projectDB.update(project,query.id==id)
    return {'id':id}


@api_app.get("/projects/{project_id}/documents/")
async def get_all_documents():
    return  documentDB.all()


@api_app.post("/projects/{project_id}/documents/")
async def create_document(project_id,file: UploadFile):
    query=Query()
    project=projectDB.search(query.id==project_id) 
    print("searching for project in db")
    if(len(project)==0):
        return {'error':'project not found'}
    
    docPath="./data/docs/"+str(project_id)
    if not os.path.exists(docPath):
        os.mkdir(docPath)
    print("Uploading file")
    with open(docPath+"/"+file.filename, "wb") as buffer:
        buffer.write(file.file.read())
    
    id=str(int(round(time.time() * 1000)))
    documentDB.insert({
        'id':id,
        'project_id':project_id,
        'name':file.filename,
        'type':file.content_type,
        'path':docPath+"/"+file.filename,
    })
    return {'id':id,'status':"Document added successfully"}

@api_app.get("/projects/{project_id}/documents/{id}/")
async def get_document_by_id(id):
    query=Query()
    return documentDB.search(query.id==id)

@api_app.delete("/projects/{project_id}/documents/{id}/")
async def delete_document_by_id(id,project_id):
    query=Query()
    docs=documentDB.search(query.id==id)
    if(len(docs)==0):
        {'success':False,'id':id, 'error':'doc not found'}
    doc=docs[0]
    docPath=doc['path']
    if os.path.exists(docPath):
        os.remove(docPath)
    documentDB.remove(query.id==id)
    
    return {'success':True,'id':id}

@api_app.put("/projects/{project_id}/documents/{id}/")
async def update_document_by_id(id,request: Request):
    document=await request.json()
    query=Query()
    documentDB.update(document,query.id==id)
    return {'id':id}

@api_app.get("/projects/{project_id}/digest")
async def digest_documents(project_id,request:Request):
    query=Query()
    project=projectDB.search(query.id==project_id) 
    print("searching for project in db")
    if(len(project)==0):
        return {'error':'project not found'}
    
    docPath=f"{dataPath}/docs/{project_id}"
    chromadbPath=f"{chromadbBasePath}/{project_id}"
    if os.path.exists(chromadbPath):
        shutil.rmtree(chromadbPath)
    docManager= DocumentManager(dbPath=chromadbPath,documentPath=docPath)
    docManager.loadDocs(api_key=request.headers['openai-api-key'])

@api_app.post("/projects/{project_id}/qa")
async def get_answer(project_id:str,request: Request):
    
    query=Query()
    project=projectDB.search(query.id==project_id) 
    print("searching for project in db")
    if(len(project)==0):
        return {'error':'project not found'}
    
    api_key=request.headers['openai-api-key']
    data=await request.json()

    model_name=data['parameters']['modelName']
    temperature=data['parameters']['temperature']
    qaType=data['parameters']['answerMethod']
    sourceMatchCount=data['parameters']['sourceMatchCount']

    docPath=f"{dataPath}/docs/{project_id}"
    chromadbPath=f"{chromadbBasePath}/{project_id}"
    docManager= DocumentManager(dbPath=chromadbPath,documentPath=docPath)
    retriever=docManager.getRetriever(api_key=api_key, k_count=sourceMatchCount)
    
    agent=AgentManager()
    return agent.get_answer(
        retriever=retriever,
        question=data['question'],
        model_name=model_name,
        temperature=temperature,
        qaType=qaType, 
        api_key=api_key
    )



app.mount("/api/v1",api_app)
app.mount('/', StaticFiles(directory="./UIBuild", html=True), name="static")

from fastapi.templating import Jinja2Templates
templates = Jinja2Templates(directory="./UIBuild")

@app.exception_handler(StarletteHTTPException)
async def my_custom_exception_handler(request: Request, exc: StarletteHTTPException):
    # print(exc.status_code, exc.detail)
    if exc.status_code == 404:
        return templates.TemplateResponse('index.html', {'request': request})





