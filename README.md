codeigniter_session_parser
==================

Installation
------------

### Node.js

Install from npm :

```sh
npm install ci_session_decrypter
```

The use it the usual way :

```javascript
var CI_decrypter = require('ci_session_decrypter');

var options = {
    cookie_name: 'ci_session',
    redisOptions: {
        host: '',
        password: '',
        port: ''
    }
}

var decrypter = new CI_decrypter(options);
const session = 'c29b6amfduvf9tbf7kefinkfifmeeaho';
var result = decrypter.getCookie(session).then(res => {

    console.log(res);
    
    // output : 
    //
    // { __ci_last_regenerate: 1538346339,
    //  session_info:
    //   { uye: { stdClass: [Object] },
    //     guvenlik: { stdClass: [Object] } } }

}).catch(err => {

    console.log(err);

})
```

Usage
-----

The module exposes two methods:

### `crypt(string)`

It return JSON object.

### `getCookie(string)`

It return cookie
