/**
 * Created by cxy on 2015/7/16.
 */
var AccessoryCollectionView = Backbone.View.extend({
    el: '#accessory-list',
    initialize: function(option) {
        this.router = option.router;
        this.collection = new AccessoryCollection();
        this.listenTo(this.collection, 'all', this.render);
        this.collection.fetch({
            url: constants.accessories
        });
    },
    render: function() {
        this.$el.empty();
        var view = this;
        this.collection.each(function(item) {
            view.renderAccessory(item);
        }, this);
    },
    renderAccessory: function(item) {
        var view = this;
        var accessorySaleView = new AccessorySaleView({
            model: item,
            router: view.router
        });
        this.$el.append(accessorySaleView.render().el);
    },
    searchAccessory: function(option) {
        var view = this;
        this.collection = new AccessoryCollection();
        if(option.brandId){
            var urlStr = '?brandId=1';
        }if(option.modelId){
            urlStr = urlStr + '&modelId=' + option.modelId;
        }if(option.styleId){
            urlStr = urlStr + '&styleId=' + option.styleId;
        }if(option.partId){
            urlStr = urlStr + '&partId=' + option.partId;
        }
        this.collection.fetch({
            url: constants.accessories + urlStr,
            success: function() {
                view.render();
            }
        });
    },
    refashData: function(brandId) {
        var view = this;
        this.collection = new AccessoryCollection();
        this.collection.fetch({
            url: constants.accessories + '/' + brandId,
            success: function() {
                view.render();
            }
        });
    }
});