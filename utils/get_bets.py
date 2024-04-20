import json
import requests

api_key = "2fd5fee9325f737ec459adc38a559749"
url = "https://api.the-odds-api.com/v3/odds"

def get_lines_baseball():
    # get the odds for baseball games today
    sport_key = "baseball_mlb"
    region = "us"
    mkt = "h2h"
    odds_response = requests.get(url, params={"api_key": api_key, "sport": sport_key, "region": region, "mkt": mkt})
    odds_json = json.loads(odds_response.text)
    # print the name of each sportsbook that gave us odds, just by using the data in the first game
    for site in odds_json["data"][0]["sites"]:
       print(site["site_nice"])

def get_lines_basketball():
    pass

def get_lines_hockey():
    pass

# get a list of in season sports 
def get_sports():
    url = "https://api.the-odds-api.com/v3/sports"
    response = requests.get(url, params={"api_key": api_key})
    sports = json.loads(response.text)
    # for each sport, print "key" if "active" == true
    for sport in sports["data"]:
        if sport["active"]:
            print(sport["key"])
    

if __name__ == "__main__":
    get_lines_baseball()

