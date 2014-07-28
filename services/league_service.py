import json
import models
import os

from match_service import MatchService
from api import API

api = API()

class LeagueService:
    def get_file_in_cache(self, league_name):
        folder = "cache/league_data/"
        target_filename = league_name + ".txt"
        for filename in os.listdir(folder):
            if filename == target_filename:
                return folder + filename

        return None


    def retrieve_matches(self, league_id, league_name):
        cached_file = self.get_file_in_cache(league_name)

        if cached_file:
            matches = self.cache_retrieve_matches(cached_file)
        else:
            matches = self.api_retrieve_matches(league_id)

        return matches


    def cache_retrieve_matches(self, cached_file):
        with open(cached_file) as json_file:
            self.json_data = json.load(json_file)
            json_file.close()

        count = 1

        matches_json = self.json_data["matches"]
        matches = []
        length = len(matches_json)

        for match_json in matches_json:
            match = MatchService().create_match(match_json)
            matches.append(match)
            # print 'completed ' + str(count) + ' out of ' + str(length)
            count += 1

        return matches


    def api_retrieve_matches(self, league_id):
        match_ids = self._retrieve_match_ids(league_id)
        matches = []
        count = 0
        length = str(len(match_ids))
        print len(match_ids)

        for id in match_ids:
            match = MatchService().create_match(api.get_match_details(id), id)
            count += 1
            if match:
                matches.append(match)
            print 'completed ' + str(count) + ' out of ' + length

        return matches


    def _retrieve_match_ids(self, league_id):
        remaining_matches = 1
        last_match_id = None
        num_of_matches_to_retrieve = 25
        match_ids = []

        while(remaining_matches > 0):
            result = api.get_matches(league_id, last_match_id, num_of_matches_to_retrieve)['result']

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



