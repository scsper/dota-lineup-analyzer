from api import API

api = API()

class LeagueService:
    def __init__(self, league_id):
        self.league_id = league_id
        self.match_ids = []


    def get_match_ids(self):
        remaining_matches = 1
        match_id = None
        num_of_matches_to_retrieve = 25

        while(remaining_matches > 0):
            result = api.get_matches(self.league_id, match_id, num_of_matches_to_retrieve)['result']

            matches = result['matches']
            remaining_matches = result['results_remaining']

            match_id = matches[num_of_matches_to_retrieve - 1]['match_id']

            self.store_match_ids(matches)


    def store_match_ids(self, matches):
        for match in matches:
            self.match_ids.append(match['match_id'])
