const merge = require('lodash/merge');

const isDev = process.env.NODE_ENV !== 'production';
console.log('isDev', isDev);

const second = 1000;
const minute = 60 * second;

const prodConfig = {
    appName: 'dehydrator',
    baseUrl: 'https://dev-app.benchfoods.com',
    apiString: '/api',
    dev: isDev,
    broadcastPort: 6024,
    testLogin: '',
    testPassword: '',

    pairTimeout: 20 * second,
    scanTime: 20 * second,
    resetTimeout: 3 * minute,
};

let localConfig = {};
// if (isDev) {
    try {
        localConfig = require('./config.local.js');
    } catch (ex) {
        console.log('ex', ex);
        console.log('config.local does not exist.');
    }
// }

module.exports = merge(prodConfig, localConfig);
