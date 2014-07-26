import json
import pprint

from models import Match

class LeagueReader:
    def __init__(self):
        # with open('match.txt') as json_file:
            self.json_data = json.load(json_file)
            json_file.close()


    def get_raw_data(self):
        return self.json_data

    # def __init__(self):
    #     with open('match.txt') as json_file:
    #         self.json_data = json.load(json_file)
    #         json_file.close()

    # def create_matches(self):
    #     json_matches = self.json_data["matches"]
    #     matches = []
    #     for match in json_matches:
    #         matches.append(Match(match, match["id"]))
    #     return matches

    # def _extract_match_ids(self, matches):
    #     match_ids = []
    #     for match in matches:
    #         match_ids.append(match['match_id'])

    #     return match_ids


    # def _retrieve_matches(self):
    #     match_ids = self._retrieve_match_ids()
    #     matches = []

    #     for id in match_ids:
    #         match = MatchService().createMatch(api.get_match_details(id),id)
    #         if match:
    #             matches.append(match)

    #     return matches
