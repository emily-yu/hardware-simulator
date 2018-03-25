from bottle import route, run, template, static_file, get, post, request, BaseRequest, Bottle, abort, TEMPLATE_PATH
from bottledaemon import daemon_run
import os
import json
import urllib

TEMPLATE_PATH.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "view")))

names = []
descriptions = []
syntaxes = []

with open('functions.txt') as f:
    same = f.read()
    things = same.strip().split('\n')
    for x in things:
        splitsame = x.split("<split>")
        # print(splitsame)
        name = splitsame[0]
        description = splitsame[1]
        name = name.split('(')[0]
        if(len(splitsame) == 3):
            syntax = splitsame[2]
            names.append(name)
            descriptions.append(description)
            syntaxes.append(syntax)

def sentencify(params, functions):
    dictionary = {}
    params = json.loads(params)

    functions = functions.split(',')

    for x in range(0,len(functions)):
        param = params[x]
        function = functions[x].strip("[").strip("]").strip("\"")
        dictionary[function] = param

    sentence = ""

    for key, value in dictionary.iteritems():
        if(key in names):
            index = names.index(key)
            syntax = syntaxes[index]
            print (syntax)
            same2 = syntax.split(': ')[1]
            sentence += "The program will " + descriptions[index].lower() + "Where the parameter, " + syntax + "is " + dictionary[key][0] + ". "
        else:
            sentence += "The program will do " + key + ". "
    return sentence


@route('/')
def index():
    return "same"

@post('/sentence')
def sentence():
    body = request.body.read()
    body = body.replace("+","").replace("payload=","")
    parsedBody = urllib.unquote(body).decode('utf8')
    jsonObj = json.loads(parsedBody)

    params = jsonObj["params"]
    functions = jsonObj["functions"]

    sentence = sentencify(params, functions)

    return sentence


run(host='localhost', port=5000)
