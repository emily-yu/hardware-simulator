import json
import sys

infile = sys.argv[1]
outfile = sys.argv[2]
with open(infile) as f:
    same = json.load(f)
    names = []
    descriptions = []
    params = []
    for x in same:
        if(x == {}):
            continue
        names.append(x["name"])
        descriptions.append(x["description"])
        if("syntax" in x):
            params.append(x["syntax"])
        else:
            params.append(" ")

names = list(set(names))
description = list(set(descriptions))

with open(outfile, 'w') as f:
    for x in range(0,len(names)):
        name = names[x]
        description = descriptions[x]
        param = params[x]
        f.write(description[6:] + " <split>" + name + " <split> " + " " + " \n")
