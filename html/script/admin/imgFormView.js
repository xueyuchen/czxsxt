/**
 * Created by cxy on 2015/7/17.
 */
var ImgFormView = Backbone.View.extend({
    className: 'imgForm',
    template: _.template($('#imgFromTemplate').html()),
    events: {
        'change .inputImg': 'getFileUrl',
        'change select': 'getNextSelect',
        'click #send': 'saveAccessory',
        'click #delete': 'deleteAccessory'
    },
    initialize: function() {
        this.model = new Accessory();
        this.brands = null;
        var view = this;
        $.ajax({
            url: constants.brands,
            success: function(data) {
                view.brands = data;
                $.ajax({
                    url: constants.parts,
                    success: function(data) {
                        view.render();
                        for (var i in view.brands) {
                            view.$('.brand').append($('<option></option>').val(view.brands[i].brandId).text(view.brands[i].brandName));
                        }
                        for (var i in data) {
                            view.$('.part').append($('<option></option>').val(data[i].partId).text(data[i].partName));
                        }
                    }
                });
            }
        });
    },
    render: function() {
        this.$el.append(this.template());
        $('#insertForm').before(this.el);
    },
    getNextSelect: function(e) {
        var view = this;
        var option = $(e.target).attr('name');
        var val = $(e.target).val();
        this.model.set(option, val);
        console.log(this.model);
        if (option == 'brandId') {
            $.ajax({
                url: constants.models + '/' + val,
                success: function(data) {
                    view.$('.model option:not(:first)').remove();
                    for (var i in data) {
                        view.$('.model').append($('<option></option>').val(data[i].modelId).text(data[i].modelName));
                    }
                }
            });
        }
        if(option == 'modelId'){
            $.ajax({
                url: constants.style + '/' + val,
                success: function(data){
                    view.$('.style option:not(:first)').remove();
                    for(var j in data){
                        view.$('.style').append($('<option></option>').val(data[j].style.styleId).text(data[j].style.styleName));
                    }
                }
            });
        }
    },
    getFileUrl: function(sourceId) {
        var view = this;
        var url;
        if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE
            url = this.$('.inputImg')[0].value;
        } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox
            url = window.URL.createObjectURL(this.$('.inputImg')[0].files.item(0));
        } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome
            url = window.URL.createObjectURL(this.$('.inputImg')[0].files.item(0));
        }
        this.$('img').attr('src', url);
        this.$('.text').hide();
        this.$('img').show();
        this.$('img')[0].onload = function() {
            var data = view.getBase64Image(view.$('img')[0]);
            console.log(data);
            view.model.set('imgDataUrl', data);
        };
    },
    getBase64Image: function(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var dataURL = canvas.toDataURL("image/png");
        return dataURL;

        // return dataURL.replace("data:image/png;base64,", "");
    },
    saveAccessory: function(){
        var view = this;
        $.ajax({
            url: constants.accessories,
            type: 'post',
            data: {
                modelId: view.model.get('modelId'),
                styleId: view.model.get('styleId'),
                partId: view.model.get('partId'),
                level: view.model.get('level'),
                imgDataUrl: view.model.get('imgDataUrl')
            },
            success: function(data){
                console.log(data);
                view.$('.selects select').attr('disabled', true);
                view.$('#delete').hide();
                view.$('#send').hide();
            }
        })
    },
    deleteAccessory: function(){
        this.$el.remove();
        $('#insertForm span').html(Number($('#insertForm span').html()) - 1);
    }
});