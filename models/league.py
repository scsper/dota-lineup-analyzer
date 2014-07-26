from league_ids import LeagueIds
from services import LeagueService
import json

class League:
    def __init__(self, name):
        self.id = LeagueIds().getLeagueId(name)
        self.name = name
        self.matches = LeagueService().retrieve_matches(self.id, self.name)

    def get_matches(self):
        return self.matches

    def to_JSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
