<location-actions>
  <btn 
    each={ action, index in actions }
    class="animated fadeIn"
    style={"animation-delay: " + .05*index + "s"}
    clickHandle={ parent.updateTba.bind(this, action.text) }
    timer-name={ action.text.replace(/\s/, '').toLowerCase() }
  >
    { action.text }
  </btn>

  <style type=sass>
    @import "sass/vars"

    location-actions
      display: block

      &.card
        padding-top: 0

      btn
        margin-top: 5px
        margin-right: $gutter/2

  </style>

  <script>
    this.mixin('tba');
    this.mixin('storage');

    var cardActive = !!(this.storage.get('activeCards') && ~this.storage.get('activeCards').indexOf('location-actions'));

    this.updateTba = function(text){
      this.tba.input(text);
    };

    Object.defineProperty(this, 'actions', {
      get(){ 
        var actions = this.tba.currentRoom && this.tba.currentRoom.actions?
          this.tba.currentRoom.actions : []

          return actions;

        /*return this.tba.currentRoom && this.tba.currentRoom.actions?*/
          /*this.tba.currentRoom.actions.filter(e => e.locationButton):[];*/
      }
    });

    this.tba.on('cardActivate', (card) => {
      if (card === 'location-actions' && !cardActive) {
        cardActive = true;
      }
    });

    this.tba.on('roomChange', () => {
      var btns = this.root.querySelectorAll('btn');
      if (btns.length) {
        btns[0].addEventListener("animationend", () => { 
          this.update();
        }, false);
      } else this.update();
      Array.prototype.forEach.call(btns, e => e.className = "animated fadeOut");
    });

  </script>
</location-actions>
