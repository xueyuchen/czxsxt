/**
 * Created by cxy on 2015/7/16.
 */
var ModelStyle = Backbone.Model.extend({
    idAttribute: 'styleId',
    parse: function(data){
        return data.style;
    }
});