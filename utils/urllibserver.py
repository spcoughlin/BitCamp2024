import json
import urllib3

# API key for accessing the Odds API
api_key = "2fd5fee9325f737ec459adc38a559749"
http = urllib3.PoolManager()

def fetch_odds(sport_key):
    # Build the URL for the specific sport and set up query parameters
    url = f"https://api.the-odds-api.com/v4/sports/{sport_key}/odds"
    params = {
        "api_key": api_key,
        "regions": "us",
        "markets": "h2h"
    }
    encoded_params = urllib3.request.urlencode(params)
    full_url = f"{url}?{encoded_params}"

    # Make the GET request
    response = http.request('GET', full_url)
    if response.status == 200:
        # Parse the JSON response into a Python dictionary
        odds_json = json.loads(response.data.decode('utf-8'))
        return calculate_ev(odds_json)
    else:
        # Handle errors
        return f"Error fetching data: {response.status}"

def get_lines_baseball():
    # Fetch odds for MLB baseball games
    return fetch_odds("baseball_mlb")

def get_lines_basketball():
    # Fetch odds for NBA basketball games
    return fetch_odds("basketball_nba")

def get_lines_hockey():
    # Fetch odds for NHL hockey games
    return fetch_odds("icehockey_nhl")

def calculate_ev(odds_json):
    games_averages = {game["id"]: average_odds(game) for game in odds_json if "bookmakers" in game}

    evs = []

    for game in odds_json:
        game_id = game["id"]
        if game_id in games_averages:
            av_home, av_away = games_averages[game_id]
            for book in game["bookmakers"]:
                for market in book.get("markets", []):
                    for line in market.get("outcomes", []):
                        if line["name"] == game["home_team"]:
                            P_home = 1 / av_home if av_home > 0 else 0
                            ev_home = (P_home * (line["price"] - 1)) - ((1 - P_home) * 1)
                            evs.append({"team": game["home_team"], "bookmaker": book["title"], "ev": ev_home, "odds": line["price"]})
                        elif line["name"] == game["away_team"]:
                            P_away = 1 / av_away if av_away > 0 else 0
                            ev_away = (P_away * (line["price"] - 1)) - ((1 - P_away) * 1)
                            evs.append({"team": game["away_team"], "bookmaker": book["title"], "ev": ev_away, "odds": line["price"]})

    return evs

def average_odds(game):
    total_h2h_home = total_h2h_away = count_home = count_away = 0

    for book in game.get("bookmakers", []):
        for market in book.get("markets", []):
            for line in market.get("outcomes", []):
                if line["name"] == game["home_team"]:
                    total_h2h_home += line["price"]
                    count_home += 1
                elif line["name"] == game["away_team"]:
                    total_h2h_away += line["price"]
                    count_away += 1

    av_h2h_home = total_h2h_home / count_home if count_home > 0 else 0
    av_h2h_away = total_h2h_away / count_away if count_away > 0 else 0

    return (av_h2h_home, av_h2h_away)


def compile_evs():
    # Compile expected values from all sports into one list
    baseball = get_lines_baseball()
    basketball = get_lines_basketball()
    hockey = get_lines_hockey()

    compiled = baseball + basketball + hockey
    return compiled

