# hardware-simulator
Simulator for that runs code and uses `three.js` to display what would theoretically happen should the code be run.

### Table of Contents
- [Installation](#installation)
- [Requirements](#requirements)
- [Usage](#usage)

### Installation
    git clone https://github.com/emily-yu/hardware-simulator.git
    cd hardware-simulator
    
### Requirements
- c-tokenizer
- tokenizer-array
- request
- cheerio
- fs
- express
- body-parser
- consolidate
- bottle
- bottledaemon
- os
- json
- urllib
    
### Usage

Replace the relative `python_ngrok` and `node_ngrok` variables in `real.html` with the generated tunnel urls.

    ./ngrok http 5000
    python server.py
    
	./ngrok http 8000
	node array.js
	
Run `server.js` and open `localhost:3000` in Chrome.