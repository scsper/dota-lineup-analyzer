import os
import requests

class Lineup:
    def __init__(self, hero_list):
        self.hero_list = hero_list

    def __str__(self):
        return "[" + self.hero_list[0] + ", " + self.hero_list[1] + ", " + self.hero_list[2] + ", " + self.hero_list[3] + ", " + self.hero_list[4] + " ]"
