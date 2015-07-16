/**
 * Created by cxy on 2015/7/16.
 */
var PartCollectionView = Backbone.View.extend({
    el: '#part-list',
    initialize: function(option){
        //this.brandId = option.brandId;
        this.router = option.router;
        if(!this.partId){
            this.partId = 1;
        }
        var view = this;
        this.collection = new PartCollection();
        this.listenTo(this.collection, 'all', this.render);
        this.collection.fetch();
    },
    render: function(){
        this.$el.empty();
        var view = this;
        this.collection.each(function(item){
            view.renderPart(item);
        }, this);
        var swiperPart = new Swiper('.swiper-container-part', {
            slidesPerView: 8,
            spaceBetween: 30,
            freeMode: true,
            setWrapperSize: true,
            prevButton: '.left-part',
            nextButton: '.right-part'
        });
    },
    renderPart: function(item){
        var partView = new PartView({
            model: item,
            router: this.router
        });
        this.$el.append(partView.render().el);
    },
    clearPartSelect: function(){
        $('#part-list a').removeClass('onCheck');
    }
    //refashData: function(brandId){
    //    var view = this;
    //    this.collection = new ModelCollection();
    //    this.collection.fetch({
    //        url: constants.models + '/' + brandId,
    //        success: function(){
    //            //view.render();
    //            console.log(view.collection.models[0]);
    //            var firstModelId = view.collection.models[0].get('modelId');
    //            view.router.modelStyleCollectionView.refashData(firstModelId);
    //            view.render();
    //        }
    //    });
    //}
});