/**
 * Created by cxy on 2015/7/15.
 */
var BrandView = Backbone.View.extend({
    initialize: function(option){
        this.router = option.router;
    },
    tagName: 'div',
    className: 'swiper-slide brand-img',
    style: 'width: 30px',
    template: _.template($('#brandTemplate').html()),
    events: {
        'click a': 'changeBrand'
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    changeBrand: function(){
        this.router.partCollectionView.clearPartSelect();
        var brandId = this.model.get('brandId');
        var brandName = this.model.get('brandName');
        this.router.searchParam.brandId = brandId;
        this.router.modelCollectionView.refashData(brandId);
        this.router.accessoryCollectionView.refashData(brandId);
        $('#model-list').css('transform', 'translate3d(0px, 0px, 0px)');
        $('#model-list').css('-webkit-transform', 'translate3d(0px, 0px, 0px)')
    }
});