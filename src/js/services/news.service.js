import { Http } from './../core/http.service';
import { ENV } from './../config/env';

/**
 * @description - класс NewsService получает JSON объект в виде массива по токену
 */

export class NewsService {
    /**
     * @description - геттер для получения токена
     */
    get token() {
        return localStorage.getItem('sn_user_token');
    }
    /**
     * @description - метод getNews нужен для получения новостей
     * @param {token} token - передаём токен
     * @return {promise} - возвращаем промис
     */
    getNews(token) {
        const http = new Http();
    
        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/news`, {
                type: "GET",
                headers: {
                    "x-access-token": token
                }
            })
                .then((response) => resolve(response))
                .catch((err) => reject(err));
        });
    }
}
