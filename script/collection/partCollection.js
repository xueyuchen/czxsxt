/**
 * Created by cxy on 2015/7/16.
 */
var PartCollection = Backbone.Collection.extend({
    model: Part,
    url: constants.parts
});