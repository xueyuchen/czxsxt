/**
 * Created by cxy on 2015/7/16.
 */
var Accessory = Backbone.Model.extend({
    idAttribute: 'accessoryId',
    defaults: {
        modelId: null,
        styleId: null,
        partId: null,
        level: null,
        saleMoney: null,
        imgDataUrl: null
    }
});