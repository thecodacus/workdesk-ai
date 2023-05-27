#!/bin/sh
pip install poetry
python -m venv .venv
source ./.venv/bin/activate
poetry shell
poetry install
uvicorn workdesk_api.server:app --reload --host 0.0.0.0 --port 8000


