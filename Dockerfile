FROM python:3.10-slim
WORKDIR /app

COPY poetry.lock .
COPY pyproject.toml .
RUN export HNSWLIB_NO_NATIVE=1
COPY . .
RUN export HNSWLIB_NO_NATIVE=1 && pip install .



EXPOSE 8000
# 
CMD ["uvicorn", "workdesk_api.server:app", "--host", "0.0.0.0", "--port", "8000"]