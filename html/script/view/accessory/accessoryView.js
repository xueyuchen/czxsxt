/**
 * Created by cxy on 2015/7/16.
 */
var AccessoryView = Backbone.View.extend({
    initialize: function(option) {
        this.router = option.router;
    },
    tagName: 'article',
    className: 'sale-tile col-lg-3 col-md-3 col-sm-6 col-xs-6',
    template: _.template($('#accessoryTemplate').html()),
    events: {
        'click a': 'changeModel',
        'click .enter': 'enterMoney'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    changeModel: function() {
        //this.router.partCollectionView.clearPartSelect();
        //var brandId = this.model.get('brandId');
        //this.router.modelCollectionView.refashData(brandId);
    },
    enterMoney: function(){
        var view = this;
        var saleMoney = this.$('input').val();
        $.ajax({
            url: constants.accessories,
            type: 'post',
            data: {
                accessoryId: view.model.get('accessoryId'),
                saleMoney: saleMoney
            },
            success: function(data){
                console.log(data);
                if(data == 'success'){
                    view.model.set('saleMoney', saleMoney);
                    view.render();
                }
            }
        });
    }
});