from api import API
from models import Heroes
from models import Lineup
from models import Match
import os
import requests

api = API()
heroes = Heroes()
# print api.get_matches(600, 677739681)
url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=60910F01FE5DEC9EAE9AD28782DFE895&match_id=681491340"
tempMatch = requests.get(url).json()

#print tempMatch
Match(681491340, tempMatch["result"])


#matches = heroes.hero_matches(29)
# for match in matches:
#     print Match(match)
