import os
import requests
from hero import Hero
from heroes import Heroes


class Lineup:
    def __init__(self, hero_ids):
        self.heroes = self.generate_heroes(hero_ids)

    def generate_heroes(self, hero_ids):
        hero_utils = Heroes()
        heroes = []
        for hero_id in hero_ids:
            heroes.append(Hero(hero_id, hero_utils.get_hero_name(hero_id)))

    def __str__(self):
        return "[" + self.heroes[0] + ", " + self.heroes[1] + ", " + \
        self.heroes[2] + ", " + self.heroes[3] + ", " + self.heroes[4] + " ]"
