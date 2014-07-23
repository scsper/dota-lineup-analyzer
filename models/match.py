import json
from heroes import Heroes
from lineup import Lineup

from services import LineupService

class Match:
    def __init__(self, match, match_id=None):
        # Matches with ID's have more information
        self.id = match_id
        if match["radiant_win"]:
            self.winner = "radiant"
        else:
            self.winner = "dire"

        lineups = LineupService().createLineups(match)

        self.radiant = lineups['radiant']
        self.dire = lineups['dire']


    def get_lineup_with_hero(self,hero_id):
        if hero_id in self.dire.getHeroList():
            return self.getDireLineup()
        if hero_id in self.radiant.getHeroList():
            return self.getRadiantLineup()
        return

    def to_JSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
