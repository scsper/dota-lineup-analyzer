import hero_utils
import json

class Lineup:
    def __init__(self, hero_ids):
        self.heroes = self.generate_heroes(hero_ids)

    def generate_heroes(self, hero_ids):
        heroes = []
        for hero_id in hero_ids:
            heroes.append(hero_utils.get_hero_by_id(hero_id))
        return heroes

    def __str__(self):
        return "[" + str(self.heroes[0]) + ", " + str(self.heroes[1]) + ", " + \
        str(self.heroes[2]) + ", " + str(self.heroes[3]) + ", " + str(self.heroes[4]) + "]"

    def to_JSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
