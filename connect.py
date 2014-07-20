import requests
import os

API_KEY = os.environ.get("DOTA2_API_KEY")

print API_KEY

API = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=" + API_KEY + "&league_id=600&matches_requested=25&start_at_match_id=679501763"

MATCH_API = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=765930912&key=" + API_KEY

s = requests.get(API)
r = requests.get(MATCH_API)

# print s.json()
# print r.json()\
