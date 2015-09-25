/* global module, Promise */



var convertReponse = function(contentType,response) {
    var actualContentType =  ( contentType.split(";")[0] || "" ).toUpperCase();

    if ( actualContentType === "APPLICATION/JSON" ) {
        return JSON.parse(response);
    } else {
        return response; //fornow
    }

};

var ajaxii = {};

var ajaxiiCall = function(method,url, contentType, data ) {

    return new Promise(function(resolve,reject) {
        var request = new XMLHttpRequest();


        //data, textStatus, jqXHR ) {}, function( jqXHR, textStatus, errorThrown
        request.onload = function () {

            var resData = null;
            var contentType = this.getResponseHeader('content-type');

            if ( this.response ) {
                resData = convertReponse(contentType,this.response);
            }

            resolve.apply(null,[resData,this.status,this]) ;

        };

        request.onerror = function (err) {
            reject.apply(null,[this,this.status,err]);
        };

        //open
        request.open(method, url, true);

        if ( contentType ) {
            request.setRequestHeader('Content-Type', contentType);
        }

        if (data) {
            request.send(JSON.stringify(data));
        } else {
            request.send();
        }
    });

};




ajaxii.post = function(url,data) {
    //FIXME not yet fully tested and we need to support form etc
    if ( data ) {
        return ajaxiiCall('POST',url,'application/json; charset=utf-8',data);
    } else {
        return ajaxiiCall('POST',url);
    }

};
ajaxii.get = function(url,bust) {
    var realUrl = url;
    if ( bust === true ) {
        var containsParams = url.indexOf("?") > -1;
        realUrl = realUrl +  (containsParams ? "&" : "?") + "bust=" + (new Date().getTime());
    }
    return ajaxiiCall('GET',realUrl);
};

ajaxii.delete = function(url) {
    return ajaxiiCall('DELETE',url);
};

ajaxii.put = function(url,data) {
    return ajaxiiCall('PUT',url,'application/json; charset=utf-8',data);
};

module.exports = ajaxii;
