from api import API
from models import Heroes
from models import Lineup
from models import League
from cache import LeagueSaver

import os
import requests

api = API()
league = League("the_international_2014")
LeagueSaver().save(league)
# print lineup.lineupInMatch(matches[1])


