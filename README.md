Lineup Analyzer
================

Setup
==============

### Setup a dev key
1. Get a [steam api key](https://steamcommunity.com/login/home/?goto=%2Fdev%2Fapikey)
2. Open up your ~/.profile and set your dev key as
`export DOTA2_API_KEY="YOUR_API_KEY_HERE"`

### Environment Setup
1. Set up Node (see below)
2. run `npm install` in terminal in the git repo directory
3. `npm install -g gulp`
4. `npm install -g gulp-cli`
5. run `gulp`
7. go to [http://localhost:3000/api](http://localhost:3000/api) in your browser and see if data is there

### Setting up Node
1. Install nvm from [this site](https://github.com/creationix/nvm).
2. `nvm install 0.12.0`
3. `nvm use 0.12.0`
4. Add `. ~/.nvm/nvm.sh` to your ~/.profile (load nvm when you open a shell)
5. Add `nvm use 0.12.0` to your ~/.profile (load the correct version of Node automatically when you open a shell)
6. If you are running Ubuntu, then install nodejs-legacy: `sudo apt-get install nodejs-legacy`
    a. [See this](http://stackoverflow.com/questions/21168141/can-not-install-packages-using-node-package-manager-in-ubuntu) for more info.

Data that is saved
====================

- league id ([list here](http://dota2.prizetrac.kr/leagues))
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

