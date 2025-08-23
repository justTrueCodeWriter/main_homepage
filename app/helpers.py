from flask import json
from os.path import isdir
from os import system

from config import CONFIG_FOLDER, ORG_FILENAME

def handle_config() -> None:
    if not isdir(CONFIG_FOLDER):
        system(f"mkdir {CONFIG_FOLDER} && cp app/bookmarks.json {CONFIG_FOLDER} && cp app/Orgmode.org {ORG_FILENAME} && cp app/progress.txt")
        

def get_bookmarks() -> dict:
    with open(CONFIG_FOLDER+"/bookmarks.json", 'r') as f:
        return json.load(f)
