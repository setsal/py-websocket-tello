// Support TLS-specific URLs, when appropriate.
if (window.location.protocol == "https:") {
  var ws_scheme = "wss://";
} else {
  var ws_scheme = "ws://"
};


var inbox = new ReconnectingWebSocket(ws_scheme + location.host + "/receive");
var outbox = new ReconnectingWebSocket(ws_scheme + location.host + "/submit");

inbox.onmessage = function(e) {
  var myReader = new FileReader();
  myReader.readAsText(e.data);
  myReader.onload = function(e) {
    var res = myReader.result;
    var data = JSON.parse(res);
    $("#chat-text").append("<div class='panel panel-default'><div class='panel-heading'>" + $('<span/>').text('Send message to client').html() + "</div><div class='panel-body'>" + $('<span/>').text(data.text).html() + "</div></div>");
    $("#chat-text").stop().animate({
      scrollTop: $('#chat-text')[0].scrollHeight
    }, 800);    
  };
};

inbox.onclose = function(){
    console.log('inbox closed');
    this.inbox = new WebSocket(inbox.url);

};

outbox.onclose = function(){
    console.log('outbox closed');
    this.outbox = new WebSocket(outbox.url);
};

$("#input-form").on("submit", function(event) {
  event.preventDefault();
  var text   = $("#input-text")[0].value;
  outbox.send(JSON.stringify({ text: text }));
  $("#input-text")[0].value = "";
});
