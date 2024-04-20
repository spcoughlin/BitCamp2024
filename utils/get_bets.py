import json
import requests

api_key = "2fd5fee9325f737ec459adc38a559749"

def get_lines_baseball():
    # get the odds for baseball games today
    sport_key = "baseball_mlb"
    url = f"https://api.the-odds-api.com/v4/sports/{sport_key}/odds"
    region = "us"
    mkt = "h2h"
    odds_response = requests.get(url, params={"api_key": api_key, "regions": region, "markets": mkt})
    odds_json = json.loads(odds_response.text) # odds_json is a list(dict)
    return calcluate_ev(odds_json)

def get_lines_basketball():
    sport_key = "basketball_nba"
    url = f"https://api.the-odds-api.com/v4/sports/{sport_key}/odds"
    region = "us"
    mkt = "h2h"
    odds_response = requests.get(url, params={"api_key": api_key, "regions": region, "markets": mkt})
    odds_json = json.loads(odds_response.text) # odds_json is a list(dict)
    return calcluate_ev(odds_json)

def get_lines_hockey():
    sport_key = "icehockey_nhl"
    url = f"https://api.the-odds-api.com/v4/sports/{sport_key}/odds"
    region = "us"
    mkt = "h2h"
    odds_response = requests.get(url, params={"api_key": api_key, "regions": region, "markets": mkt})
    odds_json = json.loads(odds_response.text) # odds_json is a list(dict)
    return calcluate_ev(odds_json)

# calculate the expected value of all bets for a sport in a day
def calcluate_ev(odds_json):
    # calculate the average odds for this game
    games_averages = {}
    for game in odds_json:
        av = average_odds(game)
        games_averages[game["home_team"]] = av[0]
        games_averages[game["away_team"]] = av[1]

    evs = {}

    # calculate the expected value of each bet by comparing the average odds to the actual odds on each book
    for game in odds_json:
        for book in game["bookmakers"]:
            ev_home = 0
            ev_away = 0
            P_average = 0
            for line in book["markets"][0]["outcomes"]:
                if line["name"] == game["home_team"]:
                    P_average = 1 / games_averages[game["home_team"]]
                    ev_home = (P_average * (line["price"] - 1)) - ((1 - P_average) * 1)
                if line["name"] == game["away_team"]:
                    P_average = 1 / games_averages[game["away_team"]]
                    ev_away = (P_average * (line["price"] - 1)) - ((1 - P_average) * 1)
    
            evs[f"{book['key']} {game['home_team']}"] = ev_home
            evs[f"{book['key']} {game['away_team']}"] = ev_away

    return evs

# average the odds for h2h bets across sportsbooks
# return (average home odds, average away odds)
def average_odds(game: dict):
    # calculate the average odds for h2h bets
    av_h2h_home = 0
    av_h2h_away = 0
    for book in game["bookmakers"]:
        for line in book["markets"][0]["outcomes"]:
            if line["name"] == game["home_team"]:
                av_h2h_home += line["price"]
            if line["name"] == game["away_team"]:
                av_h2h_away += line["price"]

    av_h2h_home /= len(game["bookmakers"])
    av_h2h_away /= len(game["bookmakers"])

    return (av_h2h_home, av_h2h_away)

def compile_evs():
    baseball = get_lines_baseball()
    basketball = get_lines_basketball()
    hockey = get_lines_hockey()

    compiled = {**baseball, **basketball, **hockey}
    return compiled
