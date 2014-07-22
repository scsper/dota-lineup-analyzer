from heroes import Heroes
from lineup import Lineup

heroes = Heroes()

class Match:
    def __init__(self, match_id, match):
        self.id = match_id
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
        self.radiant = Lineup(radiant)
        self.dire = Lineup(dire)

        if match["radiant_win"]:
            self.winner = "radiant"
        else:
            self.winner = "dire"

        print self.radiant

    def __str__(self):
        return self.id


