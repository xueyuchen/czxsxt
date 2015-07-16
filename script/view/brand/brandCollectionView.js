/**
 * Created by cxy on 2015/7/15.
 */
var BrandCollectionView = Backbone.View.extend({
    el: '#brand-list',
    initialize: function(option){
        this.router = option.router;
        this.collection = new BrandController();
        this.listenTo(this.collection, 'all', this.render);
        this.collection.fetch({
            //success: function(){
            //    view.render();
            //}
        });
    },
    render: function(){
        this.$el.empty();
        var view = this;
        this.collection.each(function(item){
            view.renderBrand(item);
        }, this);
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 8,
            spaceBetween: 30,
            freeMode: true,
            prevButton: '.left-brand',
            nextButton: '.right-brand'
        });
    },
    renderBrand: function(item){
        var view = this;
        var brandView = new BrandView({
            model: item,
            router: view.router
        });
        this.$el.append(brandView.render().el);
    }
});