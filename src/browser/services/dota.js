import request from 'superagent';

export function getLeague(patch) {
    let url = `/tournaments/?patch=${patch}`;

    return new Promise((resolve, reject) => {
        request.get(url).end((error, res) => {
            if (error) {
                reject(error);
            }

            resolve(res.body);
        });
    });
}
