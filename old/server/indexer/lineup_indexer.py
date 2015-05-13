from collection import LineupCollection

class LineupIndexer:
    def __init__(self):
        self.lineupCollection = LineupCollection()


    def index(self, league):
        for match in league.matches:
            self.lineupCollection.add(match.radiant)
            self.lineupCollection.add(match.dire)


    def get_lineups(self):
        return self.lineupCollection
