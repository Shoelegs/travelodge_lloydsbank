(function (exports) {
  "use strict";

  function getMetatagContent(name) {
      var elem = document.getElementsByName(name)[0];
      if (elem) {
          return elem.getAttribute('content');
      }
      return "";
  }

  exports.cdApi = {
      getCustomerSessionID: function (callback) {
          callback(getMetatagContent('dcconfsid'));
      },
      getCustomerConfigLocation: function (callback) {
          callback(getMetatagContent('wup_url'));
      }
  };
})(self);


