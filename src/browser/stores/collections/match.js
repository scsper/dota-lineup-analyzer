export default class MatchCollection {
    constructor() {
        // key: match id
        // value: match with this format:
        /**
            {
                "id": 2015945300,
                "winner": 1, // 0 or 1 for the side
                "radiant": {
                    "id": 111474, // team id
                    "name": "Alliance", // team name
                    "picks": [Array of Picks like this:
                        {
                            "is_pick": true,
                            "hero_id": 38,
                            "team": 0,
                            "order": 19
                        }
                    ],
                    "bans": [Array of Bans.  Has the same format as picks.]
                },
                "dire": {
                    // same format as radiant
                }
            }
         **/
        this.matches = {};
    }

    add(match) {
        this.matches[match.id] = match;
    }

    get(matchId) {
        if (!matchId) {
            throw new Error('Must pass a match id in order to get a match.');
        }

        return this.matches[matchId];
    }
}
