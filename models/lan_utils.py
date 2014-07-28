# The International 2014 LAN-matches aren't available via GetMatchHistory request (with league_id "600" parameter), but
# there is a way to get them by using the GetTournamentPlayerStats request. Let's take one player from each team and
# do this request for all of them.  You'll get a list of matches (containing match ids) for each player, and hence
# each team.  Each team plays each other, so filter out the duplicates.

from api import API
from league_ids import LeagueIds

api = API()

# the value is the id of the last match you want to store.
# in the case of the international, the qualifiers were all played online, so that data is retrieved in the normal
# api flow.  so, in order to remove duplicates, exclude all matches that are qualifiers.
lan_tournaments = {
    "the_international_2014": 765484065
}

# map from team to player id within the team
teams = {
    'alliance': '101495620',
    'titan': '94362277',
    'eg': '87276347',
    'fnatic': '100317750',
    'newbee': '100883708',
    'vici': '91698091',
    'navi': '70388657',
    'dk': '90892734',
    'ig': '88553213',
    'cloud9': '19757254',
    'empire': '89269794',
    'navius': '1185644',
    'arrow': '131380551',
    'lgd': '123854991',
    'mouz': '87285329',
    'liquid': '86738694',
    'mvp': '88933594',
    'cis': '21289303',
    'vp': '36547811'
}


def is_lan(league):
    if(league in lan_tournaments):
        return True
    else:
        return False


def get_match_ids(league):
    match_id_set = set()

    for team in teams:
        raw_matches = api.get_player_stats(LeagueIds().getLeagueId(league), teams[team])['matches']
        match_ids = []

        for raw_match in raw_matches:
            id = raw_match['match_id']
            if(int(id) > lan_tournaments[league]):
                match_ids.append(id)

        match_id_set.update(match_ids)

    print match_id_set
    print len(match_id_set)
