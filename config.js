const merge = require('lodash/merge');

const isDev = process.env.NODE_ENV !== 'production';
console.log('isDev', isDev);

const second = 1000;
const minute = 60 * second;

const prodConfig = {
    appName: 'ScanCook',
    baseUrl: '',
    apiString: '/api',
    dev: isDev,
    openaiToken: ''

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
