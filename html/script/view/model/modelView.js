/**
 * Created by cxy on 2015/7/15.
 */
var ModelView = Backbone.View.extend({
    tagName: 'span',
    className: 'swiper-slide',
    template: _.template($('#modelTemplate').html()),
    events: {
        'click a': 'changeModel'
    },
    initialize: function(option){
        this.router = option.router;
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    changeModel: function(e){
        $('#model-list a').removeClass('onCheck');
        this.$('a').toggleClass('onCheck');
        var i = this.model.get('modelId');
        this.router.modelStyleCollectionView.refashData(i);
        this.router.searchParam.modelId = this.model.get('modelName');
        this.router.searchParam.styleId = null;
        $('#part-list a').removeClass('onCheck');
        this.router.searchParam.partId = null;
        this.router.accessoryCollectionView.searchAccessory(this.router.searchParam);
    }
});