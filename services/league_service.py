import json
import models
import os
from models import lan_utils

from match_service import MatchService
from api import API

api = API()

class LeagueService:
    def __init__(self, id, name, type):
        self.type = type

        if self.type == 'league':
            self.cache_folder = "cache/league_data/"
        elif self.type == 'player':
            self.cache_folder = "cache/player_data/"

        self.id = id
        self.name = name


    def get_file_in_cache(self):
        folder = self.cache_folder
        target_filename = self.name + ".txt"
        for filename in os.listdir(folder):
            if filename == target_filename:
                return folder + filename

        return None


    def retrieve_matches(self):
        cached_file = self.get_file_in_cache()

        if cached_file:
            matches = self.cache_retrieve_matches(cached_file)
        else:
            matches = self.api_retrieve_matches()

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
            count += 1

        return matches


    def api_retrieve_matches(self):
        if(lan_utils.is_lan(self.name)):
            match_ids = lan_utils.get_match_ids(self.name)
        else:
            match_ids = self._retrieve_match_ids()

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



