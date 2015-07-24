/**
 * Created by cxy on 2015/7/15.
 */
var constants = {};
constants.api = {};

//constants.api.base = 'http:' + '//' + 'localhost:7992' + '/api';
constants.api.base = 'http:' + '//' + '115.28.209.203:80' + '/api';

constants.brands = constants.api.base + '/brands';
constants.models = constants.api.base + '/models';
constants.style = constants.api.base + '/modelStyles';
constants.parts = constants.api.base + '/parts';
constants.accessories = constants.api.base + '/accessories';
constants.login = constants.api.base + '/admin';
constants.accessoriesSearch = constants.api.base + '/accessories/lucene';