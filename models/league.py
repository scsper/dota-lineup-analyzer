from league_ids import LeagueIds
from services import MatchService
from api import API
import json

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
            total_results = result['total_results']

            print str(total_results)
            print str(remaining_matches) + ' left to fetch...'

            last_match_id = matches[-1]['match_id']

            match_ids.extend(self._extract_match_ids(matches))
            print 'outer match ids: ' + str(len(match_ids))

        return match_ids


    def _extract_match_ids(self, matches):
        match_ids = []
        for match in matches:
            match_ids.append(match['match_id'])

        print 'inner match ids: ' + str(len(match_ids))
        print match_ids

        return match_ids


    def _retrieve_matches(self):
        match_ids = self._retrieve_match_ids()
        matches = []
        count = 0
        length = str(len(match_ids))
        print len(match_ids)

        for id in match_ids:
            match = MatchService().createMatch(api.get_match_details(id),id)
            count += 1
            if match:
                matches.append(match)
            print 'completed ' + str(count) + ' out of ' + length

        return matches

    def get_matches(self):
        return self.matches

    def to_JSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
