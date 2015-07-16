/**
 * Created by cxy on 2015/7/16.
 */
var ModelStyleCollectionView = Backbone.View.extend({
    el: '#modelStyle-list',
    initialize: function(option){
        //this.brandId = option.brandId;
        if(!this.brandId){
            this.brandId = 1;
        }
        var view = this;
        this.collection = new ModelStyleCollection();
        this.listenTo(this.collection, 'all', this.render);
        this.collection.fetch({
            url: constants.style + '/' + view.brandId
            //success: function(){
            //view.render();
            //}
        });
    },
    render: function(){
        this.$el.empty();
        var view = this;
        this.collection.each(function(item){
            view.renderModelStyle(item);
        }, this);
        var swiperStyle = new Swiper('.swiper-container-style', {
            slidesPerView: 8,
            spaceBetween: 30,
            freeMode: true,
            setWrapperSize: true,
            prevButton: '.left-style',
            nextButton: '.right-style'
        });
    },
    renderModelStyle: function(item){
        var modelStyleView = new ModelStyleView({
            model: item
        });
        this.$el.append(modelStyleView.render().el);
    },
    refashData: function(modelId){
        var view = this;
        this.collection = new ModelStyleCollection();
        this.collection.fetch({
            url: constants.style + '/' + modelId,
            success: function(){
                view.render();
                var firstStyleId = view.collection.models[0].get('styleId');
            }
        });
    }
});