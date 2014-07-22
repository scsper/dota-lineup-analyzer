import os
import requests
from heroes import Heroes

heroes = Heroes()

class Lineup:
    def __init__(self, hero_list):
        self.hero_list = hero_list
        self.hero_list_names =[]
        for hero_id in self.hero_list:
            name = heroes.hero_name(hero_id)
            self.hero_list_names.append(name)

    def __str__(self):
        return "[" + self.hero_list_names[0] + ", " + self.hero_list_names[1] + ", " + \
        self.hero_list_names[2] + ", " + self.hero_list_names[3] + ", " + self.hero_list_names[4] + " ]"

    def getHeroList(self):
        return self.hero_list
