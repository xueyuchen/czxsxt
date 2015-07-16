/**
 * Created by cxy on 2015/7/16.
 */
var AccessoryView = Backbone.View.extend({
    initialize: function(option) {
        this.router = option.router;
    },
    tagName: 'div',
    className: 'part-detial',
    template: _.template($('#accessoryTemplate').html()),
    events: {
        'click a': 'changeModel'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    changeModel: function() {
        //this.router.partCollectionView.clearPartSelect();
        //var brandId = this.model.get('brandId');
        //this.router.modelCollectionView.refashData(brandId);
    }
});