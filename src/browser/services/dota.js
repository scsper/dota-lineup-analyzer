import request from 'superagent';

export function getLeague(leagueId) {
    let url = `/matches/?leagueId=${leagueId}`;

    return new Promise((resolve, reject) => {
        request.get(url).end((error, res) => {
            if (error) {
                reject(error);
            }

            resolve(res.body);
        });
    });
}
