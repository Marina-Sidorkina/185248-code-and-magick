'use strict';

(function () {
  var STATUS_OK = 200;
  var urls = {
    SEND_ADDRESS: 'https://js.dump.academy/code-and-magick',
    LOAD_ADDRESS: 'https://js.dump.academy/code-and-magick/data'
  };
  var script = document.createElement('script');

  var addScript = function (cb) {
    document.body.append(script);
    script.id = 'script' + cb;
    script.src = urls.LOAD_ADDRESS + '?callback=' + cb;
    document.getElementById(script.id).remove();
    return cb;
  };

  var getCallbackName = function () {
    var request = Math.round(100000 * Math.random());
    return 'cb_' + request;
  };

  var load = function (onLoad, onError) {
    var callback = getCallbackName();
    window[callback] = function (wizards) {
      if (wizards) {
        onLoad(wizards);
      }
    };
    script.addEventListener('error', function (error) {
      if (error) {
        onError();
      }
    });
    addScript(callback);
  };

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    return xhr;
  };

  var send = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('POST', urls.SEND_ADDRESS);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };
})();
