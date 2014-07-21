from api import API
from models import Heroes
from models import Lineup
import os
import requests

api = API()
heroes = Heroes()
lineup = Lineup()
# print api.get_matches(600, 677739681)

matches = heroes.hero_matches(29)
print lineup.lineupInMatch(matches[1])
