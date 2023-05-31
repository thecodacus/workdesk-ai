FROM python:3.10-slim
WORKDIR /app
# build essential is needed for installing chromadb dependency hnswlib
RUN apt-get update && apt-get install build-essential -y 

COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000
# 
CMD ["uvicorn", "workdesk_api.server:app", "--host", "0.0.0.0", "--port", "8000"]