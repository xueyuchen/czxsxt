/**
 * Created by cxy on 2015/7/16.
 */
var PartView = Backbone.View.extend({
    tagName: 'span',
    className: 'swiper-slide',
    template: _.template($('#partTemplate').html()),
    events: {
        'click a': 'changePart'
    },
    initialize: function(option){
        this.router = option.router;
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    changePart: function(e){
        this.$('a').toggleClass('onCheck');
        this.router.accessoryCollectionView.searchAccessory()
    }
});