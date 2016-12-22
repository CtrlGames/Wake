<location-actions>
  <virtual each={ action, index in actions }>
    <btn 
      class="animated fadeIn"
      style={"animation-delay: " + .05*index + "s"}
      click={ parent.updateTba.bind(this, action.text) }
      timer-name={ action.text.replace(/\s/, '').toLowerCase() }
    >
      { action.text }
    </btn>
  </virtual>

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

  <script type="babel">
    this.mixin('tba');
    this.mixin('storage');

    var prevent = false;
    var cardActive = !!(this.storage.get('activeCards') && ~this.storage.get('activeCards').indexOf('location-actions'));

    this.updateTba = function(text){
      this.tba.input(text);
    };

    Object.defineProperty(this, 'actions', {
      get: () => this.tba.currentRoom.actions.filter(e => e.locationButton)
    })

    this.tba.on('cardActivate', (card) => {
      if (card === 'location-actions' && !cardActive) {
        prevent = true;
        cardActive = true;
      }
    });

    this.tba.on('roomChange', () => {
      var btns = this.root.querySelectorAll('btn');
      btns[0].addEventListener("animationend", () => { 
        this.update() 
      }, false);
      if(!prevent) btns.forEach(e => e.className = "animated fadeOut");
      else prevent = false;
    });

  </script>
</location-actions>
