FROM python:3-slim
RUN pip install poetry
WORKDIR /app

COPY poetry.lock .
COPY pyproject.toml .
RUN poetry config virtualenvs.create false

COPY ./workdesk_api ./workdesk_api
COPY ./README.md ./README.md

RUN poetry install

EXPOSE 80
# 
CMD ["uvicorn", "workdesk_api.main:app", "--host", "0.0.0.0", "--port", "80"]