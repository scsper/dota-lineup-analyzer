from collection import LineupCollection

class LineupIndexer:
    def __init__(self):
        self.lineupCollection = LineupCollection()


    def index(self, league):
        for match in league.matches:
            self.lineupCollection.add(match.radiant)
            self.lineupCollection.add(match.dire)


    # def filter(self, hero_name):
    #     lineups = self.lineupCollection.get_lineups(hero_name)
    #     collection = LineupCollection()

    #     for lineup in lineups:
    #         collection.add(lineup)

    #     return collection


    def get_lineups(self):
        return self.lineupCollection
