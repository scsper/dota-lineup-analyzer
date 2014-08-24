from league_ids import LeagueIds
from services import LeagueService
import json

class League:
    def __init__(self, name):
        self.id = LeagueIds().getLeagueId(name)
        self.name = name
        self.matches = LeagueService(self.id, self.name, 'league').retrieve_matches()

    def get_matches(self):
        return self.matches

    def to_JSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
