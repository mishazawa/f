import os
from flask import Flask
from dotenv import load_dotenv

load_dotenv(".env.local") 

PORT = os.environ['SERVER_PORT']

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def hello_world():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(port=PORT)
