from flask import Flask, render_template, json
from os import environ

from modules import torg

USER = environ["USER"]
ORG_FILENAME = f"/home/{USER}/org/Orgmode.org"

app = Flask(__name__)

def get_bookmarks() -> dict:
    with open('bookmarks.json', 'r') as f:
        return json.load(f)

@app.route('/')
def index():
    bookmarks = get_bookmarks()
    return render_template('index.html', bookmarks=bookmarks)

@app.route('/get_schedule')
def get_schedule():
    return torg.get_schedule(ORG_FILENAME)

@app.route('/get_todo')
def get_todo():
    return torg.get_todo(ORG_FILENAME)

@app.route('/get_agenda')
def get_agenda():
    return "agenda"
