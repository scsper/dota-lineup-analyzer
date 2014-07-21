import os
import requests
from league_ids import LeagueIds

API_KEY = os.environ.get("DOTA2_API_KEY") #60910F01FE5DEC9EAE9AD28782DFE895
HERO_LIST_URL = "https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v001/?key=" + API_KEY + "&language=en_us"
MATCH_LIST_URL = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v001/?key=" + API_KEY

class Heroes:
    def __init__(self):
        url = HERO_LIST_URL
        self.hero_json = requests.get(url).json()
        hero_list = self.hero_json["result"]["heroes"]
        self.heroesByNames= {}
        self.heroByIds= {}
        for hero in hero_list:
            hero_id = hero["id"]
            self.heroByIds[hero_id] = hero["localized_name"]
            self.heroesByNames[hero["localized_name"]] = hero_id


    def hero_name(self, hero_id):
        return self.heroByIds[hero_id]

    def hero_id(self, hero_name):
        return self.heroesByNames[hero_name]

    def hero_matches(self, hero_id):
        url = MATCH_LIST_URL
        league_id = LeagueIds().getLeagueId("the_international_2014")
        url += "&league_id=" + str(league_id)
        url += "&hero_id=" + str(hero_id)

        self.matches = requests.get(url).json()["result"]["matches"]
        return self.matches
