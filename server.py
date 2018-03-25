from bottle import route, run, template, static_file, get, post, request, BaseRequest, Bottle, abort, TEMPLATE_PATH
from bottledaemon import daemon_run
import os
import json
import urllib

TEMPLATE_PATH.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "view")))

# with open('functions.txt') as f:
#     same = f.read()
#     same.split('\n')

# for
@route('/')
def index():
    return "same"

@post('/sentence')
def sentence():
    body = request.body.read()
    body = body.replace("+","").replace("payload=","")
    parsedBody = urllib.unquote(body).decode('utf8')
    jsonObj = json.loads(parsedBody)

    params = jsonObj["params"])
    functions = jsonObj["functions"])
    return "same"




run(host='localhost', port=5000)
