import os
import requests

API_KEY = os.environ.get("DOTA2_API_KEY")
HERO_LIST_URL = "https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v001/?key=" + API_KEY + "&language=en_us"

class Heroes:
    def __init__(self):
        url = HERO_LIST_URL
        self.hero_json = requests.get(url).json()
        hero_list = self.hero_json["result"]["heroes"]
        self.hero_map = {}

        for hero in hero_list:
            hero_id = hero["id"]
            self.hero_map[hero_id] = hero["localized_name"]


    def hero_name(self, hero_id):
        return self.hero_map[hero_id]
