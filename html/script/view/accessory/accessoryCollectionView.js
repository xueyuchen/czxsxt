/**
 * Created by cxy on 2015/7/16.
 */
var AccessoryCollectionView = Backbone.View.extend({
    el: '#accessory-list',
    initialize: function(option) {
        var view = this;
        this.router = option.router;
        this.collection = new AccessoryCollection();
        this.listenTo(this.collection, 'all', this.render);
        this.collection.fetch({
            url: constants.accessories
        });
        $('#searchAccessory').on('click', function(){
            var parStr = $('#searchPar').val();
            var parArray = parStr.split(' ');
            var searchStr = '';
            if(parArray[0]){
                searchStr = searchStr + '?brandName=' + parArray[0];
            }
            if(parArray[1]){
                searchStr = searchStr + '&modelName=' + parArray[1];
            }
            if(parArray[2]){
                searchStr = searchStr + '&styleName=' + parArray[2];
            }
            if(parArray[3]){
                searchStr = searchStr + '&partName=' + parArray[3];
            }
            view.collection = new AccessoryCollection();
            view.collection.fetch({
                url: constants.accessoriesSearch + searchStr,
                success: function() {
                    view.render();
                }
            });
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
        var accessoryView = new AccessoryView({
            model: item,
            router: view.router
        });
        this.$el.append(accessoryView.render().el);
    },
    searchAccessory: function(option) {
        var view = this;
        this.collection = new AccessoryCollection();
        var urlStr = '?brandId=1';
        if (option.modelId) {
            urlStr = urlStr + '&modelId=' + option.modelId;
        }
        if (option.styleId) {
            urlStr = urlStr + '&styleId=' + option.styleId;
        }
        if (option.partId) {
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