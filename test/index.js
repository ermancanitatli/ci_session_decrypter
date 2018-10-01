var CI_decrypter = require('../index');

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

}).catch(err => {

    console.log(err);

})
