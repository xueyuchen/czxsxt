/**
 * Created by cxy on 2015/7/16.
 */
var AccessoryCollectionView = Backbone.View.extend({
    el: '#accessory-list',
    initialize: function(option) {

        var view = this;
        this.router = option.router;
        this.collection = new AccessoryCollection();
        //this.listenTo(this.collection, 'all', this.render);
        this.collection.getFirstPage({
            url: constants.accessories,
            success: function(){
                view.render();
            }
        });
        $('#searchPar').on('change', function() {
            var parStr = $('#searchPar').val();
            view.collection = new AccessoryCollection();
            view.collection.fetch({
                url: constants.accessoriesSearch + '?key=' + parStr,
                success: function() {
                    $('#accessory-list').empty();
                    view.render();
                }
            });
        });
    },
    render: function() {
        console.log('1: ' + this.collection.hasNextPage());
        var view = this;
        console.log('2: ' + view.collection.hasNextPage());
        this.collection.each(function(item) {
            view.renderAccessory(item);
        }, this);
        console.log('3: ' + view.collection.hasNextPage());
        $(window).on('scroll', function(){
            if(document.body.scrollTop + document.body.scrollHeight > window.screen.height){
                console.log(view.collection.hasNextPage());
                if(view.collection.hasNextPage()){
                    view.collection.getNextPage({
                        success: function(){
                            view.render();
                        }
                    });
                }
            }
        });
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
        var urlStr = '';
        if (option.modelId) {
            urlStr = urlStr + option.modelId + ' ';
        }
        if (option.styleId) {
            urlStr = urlStr + option.styleId + ' ';
        }
        if (option.partId) {
            urlStr = urlStr + option.partId + ' ';
        }
        this.collection.fetch({
            url: constants.accessoriesSearch + '?key=' + urlStr,
            success: function() {
                $('#accessory-list').empty();
                view.render();
            }
        });
    },
    refashData: function(brandName) {
        var view = this;
        this.collection = new AccessoryCollection();
        this.collection.fetch({
            url: constants.accessoriesSearch + '?key=' + brandName,
            success: function(data) {
                view.$el.empty();
                view.render();
            }
        });
    }
});