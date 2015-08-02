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
            url: constants.accessoriesSearch + '?key=奥迪',
            success: function() {
                view.renderByLucene();
            }
        });
        $('#searchPar').on('input', function() {
            var parStr = $('#searchPar').val();
            console.log(parStr);
            if (parStr) {
                view.collection = new AccessoryCollection();
                view.collection.key = parStr;
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
        view.callbacked = true;
        console.log('2: ' + view.collection.hasNextPage());
        this.collection.each(function(item) {
            view.renderAccessory(item);
        }, this);
        console.log('3: ' + view.collection.hasNextPage());
        $(window).off('scroll');
        $(window).on('scroll', function() {
            console.log(document.body.scrollTop);
            console.log(document.body.scrollHeight);
            console.log(window.screen.height);
            console.log('--------------');
            if (document.body.scrollTop + window.screen.height > document.body.scrollHeight) {
                console.log(view.collection.hasNextPage());
                if (view.collection.hasNextPage()) {
                    if(view.callbacked) {
                        view.callbacked = false;
                        view.collection.getNextPage({
                            url: constants.accessoriesSearch + '?key=' + view.collection.key,
                            success: function() {
                                view.renderByLucene();
                                view.callbacked = true;
                            }
                        });
                    }
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
        if (option.modelName) {
            urlStr = urlStr + option.modelName + ' ';
        }
        if (option.styleName) {
            urlStr = urlStr + option.styleName + ' ';
        }
        if (option.partName) {
            urlStr = urlStr + option.partName + ' ';
        }
        var url = constants.accessoriesSearch + '?key=' + urlStr;
        this.collection.key = urlStr;
        this.collection.getFirstPage({
            url: url,
            success: function() {
                $('#accessory-list').empty();
                view.renderByLucene();
            }
        });
    },
    refashData: function(brandName) {
        var view = this;
        this.collection = new AccessoryCollection();
        this.collection.key = brandName;
        this.collection.getFirstPage({
            url: constants.accessoriesSearch + '?key=' + brandName,
            success: function(data) {
                view.$el.empty();
                view.renderByLucene();
            }
        });
    }
});