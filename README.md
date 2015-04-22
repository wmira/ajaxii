ajaxii
=======

Is a small ajax library and a replacement for $.ajax

[![Build Status](https://travis-ci.org/wmira/ajaxii.svg?branch=master)](https://travis-ci.org/wmira/ajaxii)


## Usage

```javascript
    
    var ajax = require('ajaxii')
    
    ajax.get('/url.txt').then( res => {} , err => {} );
    ajax.post('/url',{}).then( res => {} , err => {} );
    
    
```