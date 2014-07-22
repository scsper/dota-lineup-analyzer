from heroes import Heroes
from lineup import Lineup

class Match:
    def __init__(self, match,  match_id=None):
        # Matches with ID's have more information
        if(match_id != None):
            self.id = match_id
            if match["radiant_win"]:
                self.winner = "radiant"
            else:
                self.winner = "dire"
        else:
            self.id = -1
            self.winner = ""

        numPlayers = len(match["players"])
        if numPlayers != 10:
            self.invalid = True
            return

        dire = []
        radiant = []
        count = 0
        for hero in match["players"]:
            if count < 5:
                radiant.append(hero["hero_id"])
            else:
                dire.append(hero["hero_id"])
            count += 1
        self.radiant = Lineup(radiant)
        self.dire = Lineup(dire)

    def __str__(self):
        return self.id

    def getDireLineup(self):
        return self.dire.getHeroList()

    def getRadiantLineup(self):
        return self.radiant.getHeroList()

    def get_lineup_with_hero(self,hero_id):
        if hero_id in self.dire.getHeroList():
            return self.getDireLineup()
        if hero_id in self.radiant.getHeroList():
            return self.getRadiantLineup()
        return

    def is_valid(self):
        return not self.invalid
