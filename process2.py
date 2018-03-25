import json

with open('general_func.txt') as f:
    # same = f.read()
    # same = json.dumps([same.strip()])
    # print (same)

    same = json.load(f)

    for x in same:
        print (x + "\n")
