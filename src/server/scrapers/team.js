var _ = require('lodash'),
    Team;

/**
 * @param {Number} id The id of the team
 * @param {String} name The name of the team
 * @param {Array} picksAndBans
 */
Team = function (id, name, picksAndBans) {
    this.id = id;
    this.name = name;
    this.picks = _.filter(picksAndBans, { 'is_pick': true });
    this.bans = _.filter(picksAndBans, { 'is_pick': false });
};

module.exports = Team;
