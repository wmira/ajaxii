
/* global require,global */

var assert = require("assert");
var ajaxii = require('../index');


var xmlReq = null;

describe('Ajaxii Tests', function(){


    describe('ajaxii get', function(){

        it('it should return get requests', function(){

            global.XMLHttpRequest = function() {
                xmlReq = this;
                this.send = function(tosend) {
                    assert.equal(true,!tosend);
                };
                this.open = function(method,url,isAsync) {
                    assert.equal('GET',method);
                    assert.equal('/a.txt',url);
                    assert.equal(true,isAsync);
                };
                this.getResponseHeader = function() {
                    return 'text/plain; charset=UTF-8';
                };

                return this;
            };

            ajaxii.get('/a.txt').then(function(res ){
                assert.equal('OK',res);
            },function(err) {
                console.log(err);
            });
            xmlReq.response ='OK';
            xmlReq.onload();
            xmlReq = null;
        });
    });

    describe('ajaxii post',function() {
        it('it should return post requests', function() {
            global.XMLHttpRequest = function () {
                xmlReq = this;
                this.send = function (tosend) {
                    console.log('sending..');
                    console.log(tosend);
                };
                this.setRequestHeader = function (contype, type) {
                    assert.equal('Content-Type', contype);
                    assert.equal('application/json; charset=utf-8', type);
                };
                this.open = function (method, url, isAsync) {
                    assert.equal('POST', method);
                    assert.equal('/endpoint/a', url);
                    assert.equal(true, isAsync);
                };
                this.getResponseHeader = function () {
                    return 'application/json; charset=UTF-8';
                };

                return this;
            };

            ajaxii.post('/endpoint/a', {name: 'Name', age: 12}).then(function (res) {
                assert.equal('OK', res);
            }, function (err) {
                console.log('error');
                console.log(err);
            });

            xmlReq.response = '{\"A\" : 2}';
            xmlReq.onload();
            xmlReq = null;
        });
    });
});
