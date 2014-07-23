import models

class LineupService:
    def createLineups(self, match_json):
        heroes = match_json["players"]
        dire = []
        radiant = []
        count = 0

        for hero in heroes:
            if count < 5:
                radiant.append(hero["hero_id"])
            else:
                dire.append(hero["hero_id"])
            count += 1

        radiant_lineup = models.Lineup(radiant)
        dire_lineup = models.Lineup(dire)

        return {
            'radiant': radiant_lineup,
            'dire': dire_lineup
        }

