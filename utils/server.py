from fastapi import FastAPI
from get_bets import compile_evs

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/bets")
async def get_bets():
    return {"data": compile_evs()}

