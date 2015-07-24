/**
 * Created by cxy on 2015/7/16.
 */
var AccessoryCollection = Backbone.PageableCollection.extend({
    model: Accessory,
    url: constants.accessories,
    state: {
        firstPage: 0,
        currentPage: 0,
        pageSize: 10
    },
    queryParams: {
        currentPage: 'page',
        pageSize: 'size'
    },
    parseState: function (resp, queryParams, state, options) {
        return {totalRecords: resp.totalElements};
    },
    // get the actual records
    parseRecords: function (resp, options) {
        return resp.content;
    }
});