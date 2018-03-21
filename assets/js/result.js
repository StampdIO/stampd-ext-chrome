// On ready, init
$(function () {

  var $hash = $('.js-hash');
  var $url = $('.js-url');
  var $data = $('.js-data');
  var $img = $('.js-img');
  var $explain = $('.js-explain');
  var $txid = $('.js-txid');

  chrome.runtime.onMessage.addListener(function (request, sender, response) {
    console.log(request);

    if (request.action === 'fill_data') {
      $hash.text(request.hash);
      $url.text(request.url);
      $explain.html(request.type === 'dom' ? 'You have stamped the <b>content</b> of an HTML page.' : 'You have stamped a <b>screenshot</b> of an HTML page');
      $data.text(request.data);
      $txid.text(request.txid);
      $img.attr('src', request.img);
    }
  });

  chrome.runtime.sendMessage({
    action: "finished_loading"
  });

});
