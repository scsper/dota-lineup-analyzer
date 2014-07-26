import models

class LineupService:
    def create_lineups(self, match_json):
        dire = []
        radiant = []

        if('players' in match_json):
            heroes = match_json['players']
            count = 0

            for hero in heroes:
                if count < 5:
                    radiant.append(hero['hero_id'])
                else:
                    dire.append(hero['hero_id'])
                count += 1
        else:
            radiant_heroes = match_json['radiant']['heroes']
            dire_heroes = match_json['dire']['heroes']

            for hero in radiant_heroes:
                radiant.append(hero['id'])

            for hero in dire_heroes:
                dire.append(hero['id'])


        radiant_lineup = models.Lineup(radiant)
        dire_lineup = models.Lineup(dire)

        return {
            'radiant': radiant_lineup,
            'dire': dire_lineup
        }
