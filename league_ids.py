class LeagueIds:
    def __init__(self):
        self.ids = {
            "the_international_2014": 600
        }

    def getLeagueId(self, league):
        return self.ids[league]
