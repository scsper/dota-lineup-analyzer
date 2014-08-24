from services import LeagueService
import json

class Player:
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.matches = LeagueService(id, name, 'player').retrieve_matches()

    def to_JSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

