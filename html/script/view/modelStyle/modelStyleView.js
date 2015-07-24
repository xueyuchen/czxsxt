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
    initialize: function(option){
        this.router = option.router;
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    changeStyle: function(){
        $('#modelStyle-list a').removeClass('onCheck');
        this.$('a').toggleClass('onCheck');
        this.router.searchParam.styleId = this.model.get('styleName');
        $('#part-list a').removeClass('onCheck');
        this.router.searchParam.partId = null;
        this.router.accessoryCollectionView.searchAccessory(this.router.searchParam);
    }
});