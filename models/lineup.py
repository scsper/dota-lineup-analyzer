import os
import requests
from heroes import Heroes

heroes = Heroes()

class Lineup:
    def lineupInMatch(self,match):

        numPlayers = len(match["players"])
        if numPlayers != 10:
            return
        dire = []
        radiant = []
        count = 0
        for hero in match["players"]:
            if count < 5:
                radiant.append(heroes.hero_name(hero["hero_id"]))
            else:
                dire.append(heroes.hero_name(hero["hero_id"]))
            count += 1

        print radiant
        print dire
