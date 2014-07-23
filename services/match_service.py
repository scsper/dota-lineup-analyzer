import models

class MatchService:
    def createMatch(self, match_json, match_id):
        raw_match = match_json['result']
        numPlayers = len(raw_match['players'])
        if numPlayers != 10:
            return None

        return models.Match(raw_match, match_id)


