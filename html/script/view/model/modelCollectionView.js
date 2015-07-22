/**
 * Created by cxy on 2015/7/15.
 */
var ModelCollectionView = Backbone.View.extend({
    el: '#model-list',
    initialize: function(option){
        //this.brandId = option.brandId;
        this.router = option.router;
        if(!this.brandId){
            this.brandId = 1;
        }
        var view = this;
        this.collection = new ModelCollection();
        this.listenTo(this.collection, 'all', this.render);
        this.collection.fetch({
            url: constants.models + '/' + view.brandId
            //success: function(){
                //view.render();
            //}
        });
    },
    render: function(){
        this.$el.empty();
        var view = this;
        this.collection.each(function(item){
            view.renderModel(item);
        }, this);
        var swiperModel = new Swiper('.swiper-container-model', {
            slidesPerView: 8,
            spaceBetween: 30,
            freeMode: true,
            setWrapperSize: true,
            prevButton: '.left-model',
            nextButton: '.right-model'
        });
    },
    renderModel: function(item){
        var modelView = new ModelView({
            model: item,
            router: this.router
        });
        this.$el.append(modelView.render().el);
    },
    refashData: function(brandId){
        var view = this;
        this.collection = new ModelCollection();
        this.collection.fetch({
            url: constants.models + '/' + brandId,
            success: function(){
                //view.render();
                //console.log(view.collection.models[0]);
                var firstModelId = view.collection.models[0].get('modelId');
                view.router.modelStyleCollectionView.refashData(firstModelId);
                view.render();
            }
        });
    }
});