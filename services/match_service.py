import models

class MatchService:
    def create_match(self, match_json, match_id=None):
        is_from_cache = 'winner' in match_json # winner is a serialized field

        if(is_from_cache):
            raw_match = match_json
        else:
            raw_match = match_json['result']

            if(not self.is_player_count_valid(raw_match)):
                return None

            if raw_match['radiant_win']:
                raw_match['winner'] = 'radiant'
            else:
                raw_match['winner'] = 'dire'

        return models.Match(raw_match, match_id)

    def is_player_count_valid(self, raw_match):
        players = raw_match['players']
        numPlayers = len(players)
        if numPlayers != 10:
            return False
        else:
            return True
