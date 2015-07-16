/**
 * Created by cxy on 2015/7/15.
 */
var Router = Backbone.Router.extend({
    initialize: function(option) {
        this.brandCollectionView = new BrandCollectionView({
            router: this
        });
        this.modelCollectionView = new ModelCollectionView({
            router: this
        });
        this.modelStyleCollectionView = new ModelStyleCollectionView({
            router: this
        });
        this.partCollectionView = new PartCollectionView({
            router: this
        });
        this.accessoryCollectionView = new AccessoryCollectionView({
            router: this
        });
    }
});