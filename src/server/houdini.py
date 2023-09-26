import hrpyc, os
from dotenv import load_dotenv

load_dotenv(".env.local") 
PORT = os.environ['HOUDINI_RCP_PORT']

hrpyc.start_server(port=PORT)
