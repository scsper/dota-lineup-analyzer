import requests
import os

API_KEY = os.environ.get("DOTA2_API_KEY")
BASE_URL = "https://api.steampowered.com/IDOTA2Match_570"

MATCH_HISTORY_URL = BASE_URL + "/GetMatchHistory/V001/?key=" + API_KEY
MATCH_DETAILS_URL = BASE_URL + "/GetMatchDetails/V001/?key=" + API_KEY
PLAYER_STATS_URL =  BASE_URL + '/GetTournamentPlayerStats/v1/?key=' + API_KEY

class API:
    def get_matches(self, league_id, starting_match_id=None, matches_requested=None):
        url = MATCH_HISTORY_URL + "&league_id=" + str(league_id)

        if(matches_requested != None):
            url += "&matches_requested=" + str(matches_requested)

        if(starting_match_id != None):
            url += "&start_at_match_id=" + str(starting_match_id)

        return requests.get(url).json()


    def get_match_details(self, match_id):
        url = MATCH_DETAILS_URL + "&match_id=" + str(match_id)

        return requests.get(url).json()


    def get_heroes(self):
        url = "https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v001/?key=" + API_KEY + "&language=en_us"

        return requests.get(url).json()["result"]["heroes"]

    def get_player_stats(self, league_id, account_id):
        url = PLAYER_STATS_URL + '&league_id=' + str(league_id) + '&account_id=' + str(account_id)

        return requests.get(url).json()['result']


