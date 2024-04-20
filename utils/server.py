from fastapi import FastAPI
from get_bets import compile_evs

app = FastAPI()

@app.get("/bets")
async def get_bets():
    return compile_evs()

