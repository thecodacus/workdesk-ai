#!/bin/sh
pip install poetry
python -m venv .venv
source ./.venv/bin/activate
python -m poetry install
python -m poetry shell
uvicorn workdesk_api.server:app --reload --host 0.0.0.0 --port 8000


