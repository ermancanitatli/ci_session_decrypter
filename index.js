'use strict';

/*
 * Filename: codeigniter_session_decrypter\index.js
 * Path: codeigniter_session_decrypter
 * Created Date: Monday, October 1st 2018, 2:37:22 am
 * Author: Erman Canıtatlı
 * License: MIT
 *
 */


class SessionDecrypter {


    /**
     * Set options
     *
     * @param redis settings and cookie infos
     * @return SessionDecrypter object
     * @throws
     */
    constructor(options) {
        try {

            if (options.client != undefined) {

                this.client = options.client;

            } else {

                // Connect to redis
                this.redis = require("redis"),
                    this.client = this.redis.createClient(options.redisOptions);

                this.cookie_name = options.cookie_name || "ci_session"; // default cookie name

            }
            this.decrypt = this.decrypt;
            return this;

        } catch (e) {

            return reject(e.message);

        }

    }






    /**
     * Decrypt session
     *
     * @param sessionKey
     * @return unserialized data
     * @throws
     */
    decrypt(sessionKey) {

        return new Promise((resolve, reject) => {
            try {

                this.client.get(this.cookie_name + ":" + sessionKey, function (err, cookie) {

                    if (err) return reject(err);

                    const unserializer = require('php-session-unserialize');

                    this.unserializedSession = unserializer(cookie);
                    this.finalObj = {
                        __ci_last_regenerate: this.unserializedSession.__ci_last_regenerate,
                        session_info: this.unserializedSession.uye.stdClass
                    };

                    return resolve(this.finalObj);


                });

            } catch (e) {

                return reject(e.message);

            }

        })

    }





    /**
     * Get Session's cookie
     *
     * @param sessionKey
     * @return cookie
     * @throws
     */
    getCookie(sessionKey) {
        return new Promise((resolve, reject) => {

            try {

                this.client.get(this.cookie_name + ":" + sessionKey, function (err, cookie) {

                    if (err) return reject(err);

                    return resolve(cookie);

                })

            } catch (e) {

                return reject(e.message);

            }

        });
    }



}


module.exports = SessionDecrypter;