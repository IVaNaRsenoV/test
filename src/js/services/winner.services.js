import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class WinnerService {
    constructor() {

    }
    getWinners() {
        const http = new Http();
        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/winners`)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}