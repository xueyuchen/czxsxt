/**
 * Created by cxy on 2015/7/15.
 */
var constants = {};
constants.api = {};

constants.api.base = 'http:' + '//' + '192.168.10.156:7992' + '/api';

constants.brands = constants.api.base + '/brands';
constants.models = constants.api.base + '/models';
constants.style = constants.api.base + '/modelStyles';
constants.parts = constants.api.base + '/parts';
constants.accessories = constants.api.base + '/accessories';