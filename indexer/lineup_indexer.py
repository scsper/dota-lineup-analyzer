class LineupIndexer:
    def __init__(self):
        self.heroesToLineups = {}

    def index(self, league):
        print league
        print league.matches
        for match in league.matches:
            self._add_lineup_to_index(match.radiant)
            self._add_lineup_to_index(match.dire)


    def _add_lineup_to_index(self, lineup):
        for hero in lineup:
            name = hero['name']

            if name not in heroesToLineups:
                heroesToLineups[name] = []

            heroesToLineups[name].append(lineup)


    def find_hero(self, hero_name):
        for lineup in heroesToLineups[hero_name]:
            print lineup
