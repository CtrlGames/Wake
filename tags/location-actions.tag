<location-actions>
  <virtual each={ action, index in actions }>
    <btn 
      class="animated fadeIn"
      style={"animation-delay: " + .05*index + "s"}
      click={ parent.updateTba.bind(this, action.text) }
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
    var prevent = false;
    this.mixin('tba');
    this.mixin('storage');

    this.updateTba = function(text){
      this.tba.input(text);
    };

    Object.defineProperty(this, 'actions', {
      get: () => this.tba.currentRoom.actions.filter(e => e.locationButton)
    })

    this.tba.on('cardActivate', (card) => {
      if (card === 'location-actions') {
        prevent = true;
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
