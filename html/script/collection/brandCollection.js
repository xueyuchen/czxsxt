/**
 * Created by cxy on 2015/7/15.
 */
var BrandController = Backbone.Collection.extend({
    model: Brand,
    url: constants.brands
});