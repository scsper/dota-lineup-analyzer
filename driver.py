from models import League
from cache import LeagueSaver
from models import Match
from models import Hero
from models import Lineup
from services import MatchService

import os
import requests
import json
# league = League("the_international_2014")
# print api.get_matches(600, 677739681)
url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=60910F01FE5DEC9EAE9AD28782DFE895&match_id=681491340"
tempMatch = requests.get(url).json()
match_service = MatchService()
my_Match = match_service.createMatch(tempMatch, 677739681)

print my_Match
# my_match = Match( tempMatch["result"],681491340)

# my_hero_id = 33


# Get all matches that match the hero and print out mot used characters
# total_matches = {}
# matches = league.get_matches()
# # matches = heroes.hero_matches(my_hero_id)
# print len(matches)

# for match in matches:
#     my_match = match
#     for hero in my_match.get_lineup_with_hero(my_hero_id):
#             if hero not in total_matches:
#                 total_matches[hero] = 0
#             total_matches[hero] += 1


# total_sorted_matches = sorted(total_matches)
# for hero in  total_matches:
#     print hero + " " + str(total_matches[hero])
# hero = Hero(29, "Tidehunter")

# arr = [29,29,29,29,29]
# lineup = Lineup(arr)
# leagueSaver = LeagueSaver();
# leagueSaver.save("the_international_2014")


filename = "match.txt"
with open(filename, 'w') as filehandle:
    filehandle.write(my_Match.to_JSON())
