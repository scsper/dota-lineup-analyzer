from services import LeagueService

class Player:
    def __init__(self, id, name):
        self.id = id
        self.matches = LeagueService(id, name, 'player').retrieve_matches()
        print matches

