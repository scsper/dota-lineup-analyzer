from api import API

api = API()

class LeagueService:
    def __init__(self, league_id):
        self.league_id = league_id


    def get_matches(self):
        matches = api.get_matches(self.league_id)['result']['matches']

        print matches




