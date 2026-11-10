import uvicorn
import os
import sys

# Ensure project root is in Python module search path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

if __name__ == "__main__":
    print("=" * 60)
    print("Starting IIM Sambalpur Campus Navigator API Server")
    print("Base URL: http://localhost:8000")
    print("Interactive Swagger Docs: http://localhost:8000/docs")
    print("Interactive ReDoc: http://localhost:8000/redoc")
    print("=" * 60)
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
