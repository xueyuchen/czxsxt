/**
 * Created by cxy on 2015/7/16.
 */
var ModelStyleView = Backbone.View.extend({
    tagName: 'span',
    className: 'swiper-slide',
    template: _.template($('#modelStyleTemplate').html()),
    events: {
        'click a': 'changeStyle'
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    changeStyle: function(){
        this.$('a').toggleClass('onCheck');
    }
});