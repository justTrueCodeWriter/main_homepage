from flask import Flask, render_template, request
from flask import jsonify
import json
import os
import sys

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
