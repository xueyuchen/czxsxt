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
        var accessoryView = new AccessoryView({
            model: item,
            router: view.router
        });
        this.$el.append(accessoryView.render().el);
    },
    searchAccessory: function(modelName, styleName, partName) {
        var view = this;
        this.collection = new AccessoryCollection();
        this.collection.fetch({
            url: constants.accessories + '?modelName=' + modelName + '&styleName= ' + styleName + '&partName=' + partName,
            success: function(){
                view.render();
            }
        });
    }
});