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
            success: function() {
                view.render();
            }
        });
        $('#searchPar').on('input', function() {
            var parStr = $('#searchPar').val();
            console.log(parStr);
            if (parStr) {
                view.collection = new AccessoryCollection();
                view.collection.getFirstPage({
                    url: constants.accessoriesSearch + '?key=' + parStr,
                    success: function() {
                        $('#accessory-list').empty();
                        view.renderByLucene();
                    }
                });
            }
        });
        $('#searchAccessory').on('click', function() {
            var parStr = $('#searchPar').val();
            if (parStr) {
                view.collection = new AccessoryCollection();
                view.collection.getFirstPage({
                    url: constants.accessoriesSearch + '?key=' + parStr,
                    success: function() {
                        $('#accessory-list').empty();
                        view.renderByLucene();
                    }
                });
            }
        });
    },
    render: function(url) {
        console.log('1: ' + this.collection.hasNextPage());
        var view = this;
        console.log('2: ' + view.collection.hasNextPage());
        this.collection.each(function(item) {
            view.renderAccessory(item);
        }, this);
        console.log('3: ' + view.collection.hasNextPage());
        $(window).off('scroll');
        $(window).on('scroll', function() {
            if (document.body.scrollTop + document.body.scrollHeight > window.screen.height) {
                console.log(view.collection.hasNextPage());
                if (view.collection.hasNextPage()) {
                    view.collection.getNextPage({
                        success: function() {
                            view.render();
                        }
                    });
                }
            }
        });
    },
    renderByLucene: function() {
        console.log('1: ' + this.collection.hasNextPage());
        var view = this;
        console.log('2: ' + view.collection.hasNextPage());
        this.collection.each(function(item) {
            view.renderAccessory(item);
        }, this);
        console.log('3: ' + view.collection.hasNextPage());
        $(window).off('scroll');
        $(window).on('scroll', function() {
            if (document.body.scrollTop + document.body.scrollHeight > window.screen.height) {
                console.log(view.collection.hasNextPage());
                if (view.collection.hasNextPage()) {
                    view.collection.getNextPage({
                        url: constants.accessoriesSearch + '?key=' + $('#searchPar').val(),
                        success: function() {
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
            urlStr = urlStr + '&modelId=' + option.modelId;
        }
        if (option.styleId) {
            urlStr = urlStr + '&styleId=' + option.styleId;
        }
        if (option.partId) {
            urlStr = urlStr + '&partId=' + option.partId;
        }
        var url = constants.accessories + '?brandId=1' + urlStr;
        this.collection.getFirstPage({
            url: constants.accessories + '?brandId=1' + urlStr,
            success: function() {
                $('#accessory-list').empty();
                view.render(url);
            }
        });
    },
    refashData: function(brandId) {
        var view = this;
        this.collection = new AccessoryCollection();
        this.collection.getFirstPage({
            url: constants.accessories + '/' + brandId,
            success: function(data) {
                view.$el.empty();
                view.render();
            }
        });
    }
});