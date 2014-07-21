import requests
import os

API_KEY = os.environ.get("DOTA2_API_KEY")
BASE_URL = "https://api.steampowered.com/IDOTA2Match_570"

MATCH_HISTORY_URL = BASE_URL + "/GetMatchHistory/V001/?key=" + API_KEY
MATCH_DETAILS_URL = BASE_URL + "/GetMatchDetails/V001/?key=" + API_KEY

class API:
    def __init__(self):
        self.matches_requested = 25

    def get_matches(self, league_id, match_id):
        url = MATCH_HISTORY_URL + "&league_id=" + league_id + "&start_at_match_id=" + match_id + "&matches_requested=" + self.matches_requested

        return requests.get(url).json()


 # "&match_id=765930912"



s = requests.get(API)
r = requests.get(MATCH_API)



# print s.json()
# print r.json()\
