import request from 'superagent';

export function getLeague(tournamentName) {
    let url = `/tournaments/?tournamentName=${tournamentName}`;

    return new Promise((resolve, reject) => {
        request.get(url).end((error, res) => {
            if (error) {
                reject(error);
            }

            resolve(res.body);
        });
    });
}
