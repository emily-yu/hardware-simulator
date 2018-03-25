import sys
infile = sys.argv[1]
with open (infile) as f:
    same = f.read()
    same = same.replace("\\n", "").replace("\\t", "").replace("\\r", "").replace("\\v", "").replace('\"\\\"', '\"\\\\\"')
    same = same.replace("}", "},")
    same = "[" + same + "]"


with open(infile, 'w') as f:
    f.write(same)
