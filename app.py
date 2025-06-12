from flask import Flask, render_template, json

app = Flask(__name__)

def get_bookmarks() -> dict:
    with open('bookmarks.json', 'r') as f:
        return json.load(f)

@app.route('/')
def index():
    bookmarks = get_bookmarks()
    return render_template('index.html', bookmarks=bookmarks)
