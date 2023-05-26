FROM python:3-slim
RUN pip install poetry
WORKDIR /app

COPY poetry.lock .
COPY pyproject.toml .
RUN poetry config virtualenvs.create false

COPY . .

RUN poetry install
RUN poetry shell

EXPOSE 8000
# 
CMD ["uvicorn", "workdesk_api.server:app", "--host", "0.0.0.0", "--port", "8000"]