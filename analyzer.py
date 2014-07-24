import os
import requests
import json

from cache import LeagueReader

#  Initialize from cache
league = LeagueReader()

# Get hero with same lineup
matches = league.create_matches()
print matches

# for match in matches:
#     lineup.append()
