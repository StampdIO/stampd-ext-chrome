// On ready, init
$(function () {

  var HASH_PREFIX = '5354414d50442323';
  var API_URL = 'http://dev.stampd.io/api/v2.php';
  // var API_URL = 'https://stampd.io/api/v2.php';

  var $blockchain = $('[name="blockchain"]');
  var $type = $('[name="type"]');
  var $client_id = $('[name="client_id"]');
  var $secret_key = $('[name="secret_key"]');

  var $stamp_form = $(".js-form-stamp");
  var $set_form = $(".js-form-credentials");

  var $tabs = $('[data-tab-btn]');
  var $tabContents = $('[data-tab-content]');

  // Tabs
  // =========================================================

  $tabs.click(function (e) {
    e.preventDefault();

    var $el = $(this);

    if ($el.hasClass('is-active')) {
      return;
    }

    $tabs.removeClass('is-active');
    $tabContents.removeClass('is-active');

    $el.addClass('is-active');
    $('[data-tab-content="' + $el.attr('data-tab-btn') + '"]').addClass('is-active');

  });

  // Show notification
  // =========================================================

  var display_notification = function (text, type) {
    if (typeof type === 'undefined') {
      type = 'default';
    }

    var $notif = $('.js-notification');
    var $notif_cont = $('.js-notification__content');

    $notif.attr('data-notification-type', type);

    $notif_cont.html(text);
    $notif.slideDown(function () {
      window.setTimeout(function () {
        $notif.fadeOut();
      }, 2000);
    });
  };

  // Retrieve active tab DOM
  // =========================================================
  var retrieveActiveTabDom = function (cb) {

    var returnDOM = function () {
      return document.body.innerHTML;
    };

    chrome.tabs.executeScript({
      code: '(' + returnDOM + ')();'
    }, (results) => {
      cb(results[0]);
    });
  };

  // Sign in
  // =========================================================

  var sign_in = function (client_id, secret_key, cb) {

    $.get(API_URL, {
      requestedURL: "init",
      client_id: client_id,
      secret_key: secret_key,
    }, function (res) {
      var res_json = JSON.parse(res);
      cb(res_json.session_id ? res_json.session_id : false);
    }).fail(function () {
      cb(false);
    });
  };

  // Calculate hash
  // =========================================================

  var calc_hash = function (data, cb) {

    var progress_cb = function (p) {
      // TODO: progress?
      console.log((p * 100).toFixed(0) + '%');
    };

    CryptoJS.SHA256(data, progress_cb, cb);
  };

  // Retrieved hash
  // =========================================================

  var retrieved_hash = function (hash) {
    // TODO: do something with hash
    console.warn(HASH_PREFIX + hash);
  };

  // Load settings
  // =========================================================

  // blockchain option
  $blockchain.change(function () {
    chrome.storage.sync.set({
      blockchain: $blockchain.val(),
    }, function () {
      // ..
    });
  });

  // type option
  $type.change(function () {
    chrome.storage.sync.set({
      type: $type.val(),
    }, function () {
      // ..
    });
  });

  // retrieve saved options
  chrome.storage.sync.get({
    client_id: null,
    secret_key: null,
    blockchain: null,
    type: null,
  }, function (items) {

    if (items.blockchain) {
      $blockchain.val(items.blockchain);
    }

    if (items.type) {
      $type.val(items.type);
    }

    if (items.client_id && items.secret_key) {
      var $client_id = $('[name="client_id"]');
      $client_id.val(items.client_id);
      var $secret_key = $('[name="secret_key"]');
      $secret_key.val(items.secret_key);

      $tabs.first().click();
    } else {
      $('[data-tab-btn="settings"]').click();
    }
  });

  // Save settings
  // =========================================================

  $set_form.submit(function (e) {
    e.preventDefault();

    $set_form.addClass('is-disabled');

    var client_id = $client_id.val();
    var secret_key = $secret_key.val();

    if (!navigator.onLine) {
      display_notification('Your computer appears to be offline', 'error');
      return;
    }

    sign_in(client_id, secret_key, function (session_id) {
      $set_form.removeClass('is-disabled');

      if (!session_id) {
        display_notification('Incorrect credentials', 'error');
        return;
      }

      chrome.storage.sync.set({
        client_id: client_id,
        secret_key: secret_key,
      }, function () {
        display_notification('Credentials saved', 'success');

        $tabs.first().click();
      });
    });

  });

  // Stamp
  // =========================================================

  $stamp_form.submit(function (e) {
    e.preventDefault();

    $stamp_form.addClass('is-disabled');

    var client_id = $client_id.val();
    var secret_key = $secret_key.val();

    var blockchain = $blockchain.val();
    var type = $type.val();

    if (type === 'page_content') {
      // DOM content
      retrieveActiveTabDom(function (dom) {

        // TODO: hash below val
        console.warn(dom);

        calc_hash(dom, retrieved_hash);

      });
    } else {
      // screenshot
      chrome.tabs.captureVisibleTab(null, {}, function (image) {

        // TODO: hash below val
        console.warn(image);

        calc_hash(image, retrieved_hash);

      });
    }

    if (!navigator.onLine) {
      display_notification('Your computer appears to be offline', 'error');
      return;
    }

    sign_in(client_id, secret_key, function (session_id) {
      if (!session_id) {
        $set_form.removeClass('is-disabled');
        display_notification('Incorrect credentials', 'error');
        return;
      }

      var blockchain = $blockchain.val();
      var type = $type.val();

      if (type === 'page_content') {
        // DOM content
        retrieveActiveTabDom(function (dom) {

          // TODO: hash below val
          console.warn(dom);

          calc_hash(dom, retrieved_hash);

        });
      } else {
        // screenshot
        chrome.tabs.captureVisibleTab(null, {}, function (image) {

          // TODO: hash below val
          console.warn(image);

          calc_hash(image, retrieved_hash);

        });
      }

      console.warn(blockchain, type, session_id);

      $set_form.removeClass('is-disabled');
    });

  });


});
