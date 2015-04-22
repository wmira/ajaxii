/* global module */
/* jshint esnext: true */

//FIXME, no promise in IE 8 and above.

var convertReponse = function(contentType,response) {
    var actualContentType =  ( contentType.split(";")[0] || "" ).toUpperCase();

    if ( actualContentType === "APPLICATION/JSON" ) {
        return JSON.parse(response);
    } else {
        return response; //fornow
    }

};

var ajaxiiCall = function(method,url, contentType, data ) {

    return new Promise(function(resolve,reject) {
        var request = new XMLHttpRequest();

        if ( contentType ) {
            request.setRequestHeader('Content-Type', contentType);

        }

        request.onload = function () {

            var resData = null;
            var contentType = this.getResponseHeader('content-type');

            if ( this.response ) {
                resData = convertReponse(contentType,this.response);
            }

            if ( this.status === 200  ) {
                resolve({ status: this.status, res: resData}) ;
            } else {
                reject( {status: this.status , res: this.response});
            }
        };

        request.onerror = function (err) {
            reject(err);
        };

        //open
        request.open(method, url, true);

        if (data) {
            request.send(JSON.stringify(data));
        } else {
            request.send();
        }
    });

};


var ajaxii = {};

ajaxii.post = function(url,data) {
    //FIXME not yet fully tested and we need to support form etc
    if ( data ) {
        return ajaxiiCall('POST',url,'application/json; charset=utf-8',data);
    } else {
        return ajaxiiCall('POST',url);
    }

};
ajaxii.get = function(url) {
    return ajaxiiCall('GET',url);
};

ajaxii.delete = function(url) {
    return ajaxiiCall('DELETE',url);
};

ajaxii.put = function(url,contentType,data) {
    return ajaxiiCall('PUT',url,contentType,data);
};

module.exports = ajaxii;