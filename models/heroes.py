import os
import requests
from hero import Hero
from league_ids import LeagueIds
from api import API

api = API()

class Heroes:
    def __init__(self):
        self.heroesByNames = {}
        self.heroByIds = {}
        self._build_hero_maps()


    def _build_hero_maps(self):
        raw_heroes = self._get_raw_heroes()
        for raw_hero in raw_heroes:
            hero = Hero(raw_hero['id'], raw_hero['localized_name'])
            self.heroByIds[hero.id] = hero
            self.heroesByNames[hero.name] = hero


    def _get_raw_heroes(self):
        hero_json = api.get_heroes()
        return hero_json


    def get_hero_name(self, hero_id):
        return self.heroByIds[hero_id]


    def get_hero_id(self, hero_name):
        return self.heroesByNames[hero_name]
