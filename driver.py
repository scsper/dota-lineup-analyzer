from api import API
from models import Heroes
from models import Lineup
from models import League
from cache import LeagueSaver
from models import Match

import os
import requests

api = API()
heroes = Heroes()
league = League("the_international_2014")
# print api.get_matches(600, 677739681)
#url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=60910F01FE5DEC9EAE9AD28782DFE895&match_id=681491340"
#tempMatch = requests.get(url).json()
#Match( tempMatch["result"],681491340)

my_hero_id = 33



total_matches = {}
matches = league.get_matches()
# matches = heroes.hero_matches(my_hero_id)
print len(matches)


for match in matches:
    my_match = match
    for hero in my_match.get_lineup_with_hero(my_hero_id):
            if hero not in total_matches:
                total_matches[hero] = 0

            total_matches[hero] += 1


total_sorted_matches = sorted(total_matches)
for hero_id in  total_matches:
    print heroes.hero_name(hero_id) + " " + str(total_matches[hero_id])



