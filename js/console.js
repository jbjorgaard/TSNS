// current structure to use
define(['jquery', 'presentation', 'domain'], function($, Presentation, Domain) {
  "strict";
  return {
    runGame: function() {
      Presentation.$scrollChat();
      $('.inp').keyup(function(evt) {
        if(evt.keyCode == 13) {
          var entry = $(this).val();
          Presentation.processInput(entry);
          Presentation.printOutput();
          $(this).val('');
          Presentation.$scrollChat();
        }
      })
      .focus();
    }
  };
});
