from api import API
from models import Heroes
from models import Lineup
from models import League
from cache import LeagueSaver
import os
import requests

api = API()
heroes = Heroes()
# print api.get_matches(600, 677739681)
url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=60910F01FE5DEC9EAE9AD28782DFE895&match_id=681491340"
tempMatch = requests.get(url).json()

#print tempMatch
Match( tempMatch["result"],681491340)

total_matches = {}
matches = heroes.hero_matches(29)
for match in matches:
    my_match = Match(match)
    for hero in my_match.getDireLineup():
        if 29 in my_match.getDireLineup():
            if hero in total_matches:
                count = total_matches[hero]
                count +=1
                total_matches[hero] = count
            else:
                total_matches[hero] = 1
    for hero in my_match.getRadiantLineup():
        if 29 in my_match.getRadiantLineup():
            if hero in total_matches:
                count = total_matches[hero]
                count +=1
                total_matches[hero] = count
            else:
                total_matches[hero] = 1

for hero_id in  total_matches:
    print heroes.hero_name(hero_id) + " " + total_matches[hero_id]
