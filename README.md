Lineup Analyzer
================

[![Build Status](https://travis-ci.org/scsper/dota-lineup-analyzer.svg?branch=master)](https://travis-ci.org/scsper/dota-lineup-analyzer)


Data that is saved
====================

- league id (http://www.cyborgmatt.com/league-ids/)
- matches (getLeagueMatches.result.matches)
    - match_id (getLeagueMatches.result.matches.match_id)
    - winner  (getMatchDetails.result.radiant_win)
    - radiant (getMatchDetails.result.picks_bans)
        - team_id (getMatchDetails.result.radiant_team_id)
        - team_name (getMatchDetails.result.radiant_name)
        - picks (radiant is the first 5 heroes in getLeagueMatches.result.matches.players)
            - hero_id
            - hero_name
        - bans
            - hero_id
            - hero_name
    - dire
        - team_id
        - team_name
        - picks
            - hero_id
            - hero_name
        - bans
            - hero_id
            - hero_name

