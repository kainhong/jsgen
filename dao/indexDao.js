'use strict';
/*global require, module, Buffer, jsGen*/

/*
 */
var union = jsGen.lib.tools.union,
    intersect = jsGen.lib.tools.intersect,
    globalConfig = jsGen.lib.json.GlobalConfig,
    wrapCallback = jsGen.lib.tools.wrapCallback,
    callbackFn = jsGen.lib.tools.callbackFn;

var that = jsGen.dao.db.bind('global', {

    getGlobalConfig: function (callback) {
        that.findOne({
            _id: 'GlobalConfig'
        }, {
            sort: {
                _id: -1
            }
        }, wrapCallback(callback));
    },

    setGlobalConfig: function (Obj, callback) {
        var setObj = {},
            newObj = {
                domain: '',
                beian: '',
                title: '',
                url: '',
                logo: '',
                email: '',
                description: '',
                metatitle: '',
                metadesc: '',
                keywords: '',
                robots: '',
                visitors: 0,
                users: 0,
                articles: 0,
                comments: 0,
                onlineNum: 0,
                onlineUsers: 0,
                maxOnlineNum: 0,
                maxOnlineTime: 0,
                TimeInterval: 0,
                ArticleTagsMax: 0,
                UserTagsMax: 0,
                TitleMinLen: 0,
                TitleMaxLen: 0,
                SummaryMaxLen: 0,
                ContentMinLen: 0,
                ContentMaxLen: 0,
                UserNameMinLen: 0,
                UserNameMaxLen: 0,
                register: true,
                emailVerification: true,
                UsersScore: [0, 0, 0, 0, 0, 0, 0],
                ArticleStatus: [0, 0],
                ArticleHots: [0, 0, 0, 0, 0],
                userCache: 0,
                articleCache: 0,
                commentCache: 0,
                listCache: 0,
                tagCache: 0,
                collectionCache: 0,
                messageCache: 0,
                paginationCache: 0,
                smtp: {
                    host: '',
                    secureConnection: true,
                    port: 0,
                    auth: {
                        user: '',
                        pass: ''
                    },
                    senderName: '',
                    senderEmail: ''
                },
                info: {}
            };

        intersect(newObj, Obj);
        setObj.$set = newObj;

        if (callback) {
            that.findAndModify({
                _id: 'GlobalConfig'
            }, [], setObj, {
                w: 1,
                'new': true
            }, wrapCallback(callback));
        } else {
            that.update({
                _id: 'GlobalConfig'
            }, setObj);
        }
    },

    initGlobalConfig: function (callback) {
        globalConfig.date = Date.now();
        that.insert(
            globalConfig, {
                w: 1
            }, wrapCallback(callback));
    }

});

module.exports = {
    getGlobalConfig: that.getGlobalConfig,
    setGlobalConfig: that.setGlobalConfig,
    initGlobalConfig: that.initGlobalConfig
};