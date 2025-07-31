from flask import Flask, render_template, request

from config import ORG_FILENAME
from modules import torg
from helpers import get_bookmarks, handle_config


app = Flask(__name__)

@app.route('/')
def index():
    handle_config()
    bookmarks = get_bookmarks()
    return render_template('index.html', bookmarks=bookmarks)

@app.route('/get_schedule')
def get_schedule():
    return torg.get_schedule(ORG_FILENAME)

@app.route('/get_todo')
def get_todo():
    return torg.get_todo(ORG_FILENAME, "")

@app.route('/get_agenda')
def get_agenda():
    return torg.get_agenda(ORG_FILENAME)

@app.route('/set_task_done')
def set_task_done() -> str:
    line_number = int(request.args.get("line_number"))
    torg.set_task_done(ORG_FILENAME, line_number)
    return f"{line_number}"
