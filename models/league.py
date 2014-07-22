from league_ids import LeagueIds
from match import Match
from api import API

api = API()

class League:
    def __init__(self, name):
        self.id = LeagueIds().getLeagueId(name)
        self.name = name
        self.matches = self._retrieve_matches()

    def _retrieve_match_ids(self):
        remaining_matches = 1
        last_match_id = None
        num_of_matches_to_retrieve = 25
        match_ids = []

        while(remaining_matches > 0):
            result = api.get_matches(self.id, last_match_id, num_of_matches_to_retrieve)['result']

            matches = result['matches']
            remaining_matches = result['results_remaining']

            last_match_id = matches[len(matches) - 1]['match_id']

            match_ids.extend(self._extract_match_ids(matches))

        return match_ids


    def _extract_match_ids(self, matches):
        match_ids = []
        for match in matches:
            match_ids.append(match['match_id'])

        return match_ids


    def _retrieve_matches(self):
        match_ids = self._retrieve_match_ids()
        matches = []

        for id in match_ids:
            matches.append(Match(api.get_match_details(id)['result']))

        return matches

    def get_matches(self):
        return self.matches
