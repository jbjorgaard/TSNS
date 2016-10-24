(function(root) {
  "strict";
  define(['jquery', 'presentation', 'domain'], function($) {
    var currentGame = new MUD.Game();
    var getGame = function() {
      return currentGame;
    };
    var $container = $('.container');
    var $scrollChat = function() {
      $container[0].scrollTop = $container[0].scrollHeight;
    };
    var runGame = function() {
      $scrollChat();
      $('.inp').keyup(function(evt) {
        if(evt.keyCode == 13) {
          var entry = $(this).val();
          getGame().processInput(entry);
          getGame().printOutput();
          $(this).val('');
          $scrollChat();
        }
      })
      .focus();
    };
    runGame();
  });
})(window.MUD);
