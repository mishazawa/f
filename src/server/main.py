import hrpyc, os, json
from flask import Flask, Response, request, send_from_directory
from dotenv import load_dotenv

import remesh

load_dotenv(".env.local") 

PORT = os.environ['SERVER_PORT']
HOUDINI_PORT = os.environ['HOUDINI_RCP_PORT']
HIPFILE = os.environ['HIPFILE']
connection, hou = hrpyc.import_remote_module(port=HOUDINI_PORT)

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def hello_world():
    return "Hello, World!"


@app.route('/files/<path:path>')
def send_file(path):
    
    return send_from_directory('../../', path)

@app.route('/remesh_pig', methods=['POST'])
def remesh_pig():
    request_data = request.get_json()

    if 'remesh' in request_data:
        target_size = request_data['remesh']
        out_file = remesh.run(hou, HIPFILE, target_size)
        return Response(
            json.dumps({'output':out_file}),
            status=200,
            mimetype='application/json'
            )

        

    return Response(f"\{'remesh':{request_data['remesh']}\}", status=400, mimetype='application/json')


if __name__ == '__main__':
    app.run(port=PORT, debug=True)
