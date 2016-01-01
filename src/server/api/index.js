import request from 'superagent';
const API_KEY = process.env.DOTA2_API_KEY;
const BASE_URL = 'https://api.steampowered.com/IDOTA2Match_570';
const MATCH_HISTORY_URL = BASE_URL + '/GetMatchHistory/V001/?key=' + API_KEY;
const MATCH_DETAILS_URL = BASE_URL + '/GetMatchDetails/V001/?key=' + API_KEY;
const PLAYER_STATS_URL = BASE_URL + '/GetTournamentPlayerStats/v1/?key=' + API_KEY;

/**
 * Wrapper method for the GetMatchHistory API
 *
 * @param {String} url The URL to hit
 * @param {Number} [Optional] startingMatchId The match id to start at.
 * @param {Number} [Optional] matchesRequested A maximum of 25 matches can be returned.
 *
 * @return {Promise} An unresolved promise that will contain the data of the request.
 */
function getMatches(url, startingMatchId, matchesRequested) {
    var requestUrl = url;

    if (matchesRequested) {
        requestUrl += '&matches_requested=' + matchesRequested;
    }

    if (startingMatchId) {
        requestUrl += '&start_at_match_id=' + startingMatchId;
    }

    return makeRequest('GET', requestUrl);
}

/**
 * Wrapper method to make requests.
 *
 * @param {String} method HTTP method for the request, i.e. 'GET', 'POST', 'PUT', etc
 * @param {String} url The url to make the request to
 *
 * @return {Promise} An unresolved promise that will contain the data of the request.
 */
function makeRequest(method, url) {
    return new Promise(function(resolve, reject) {
        request(method, url).end(function(error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

/**
 * Get matches associated with a particular league using the GetMatchHistory API.
 * Documentation: http://dev.dota2.com/showthread.php?t=47115
 *
 * @param {Number} leagueId The id of the league.
 *      The league ids can be found here: http://www.cyborgmatt.com/league-ids/
 * @param {Number} startingMatchId The match id to start at.
 * @param {Number} matchesRequested A maximum of 25 matches can be returned.
 *
 * @return {Promise} Unresolved promise that will contain the data for this API
 */
export function getLeagueMatches(leagueId, startingMatchId, matchesRequested) {
    const url = MATCH_HISTORY_URL + '&league_id=' + leagueId;

    return getMatches(url, startingMatchId, matchesRequested);
}

/**
 * Get matches associated with a particular player using the GetMatchHistory API.
 * Documentation: http://dev.dota2.com/showthread.php?t=47115
 *
 * @param {Number} playerId The id of the player.
 * @param {Number} startingMatchId The match id to start at.
 * @param {Number} matchesRequested A maximum of 25 matches can be returned.
 *
 * @return {Promise} Unresolved promise that will contain the data for this API
 */
export function getPlayerMatches(playerId, startingMatchId, matchesRequested) {
    const url = MATCH_HISTORY_URL + '&account_id=' + playerId;

    return getMatches(url, startingMatchId, matchesRequested);
}

/**
 * Get the details associated with one particular match.
 * Documentation: http://dev.dota2.com/showthread.php?t=47115
 *
 * @param {Number} matchId The id of the match.
 *
 * @return {Promise} Unresolved promise that will contain the data for this API.
 */
export function getMatchDetails(matchId) {
    var url = MATCH_DETAILS_URL + '&match_id=' + matchId;

    return makeRequest('GET', url);
}

/**
 * Get the list of heroes and associated meta data from the DOTA API.
 *
 * @return {Promise} Unresolved promise that will contain the data for this API.
 */
export function getHeroes() {
    var url = 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v001/?key=' + API_KEY + '&language=en_us';

    return makeRequest('GET', url);
}

/**
 * Not sure what this does.  Ported it from Python code.
 */
export function getPlayerStats(leagueId, accountId) {
    var url = PLAYER_STATS_URL + '&league_id=' + leagueId + '&account_id=' + accountId;

    return makeRequest('GET', url);
}
