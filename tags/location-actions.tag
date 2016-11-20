<location-actions>
  <virtual each={ action, index in actions }>
    <btn class="animated fadeIn" each={[action]} 
      style={"animation-delay: " + .05*parent.index + "s"}>
      { text }
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

    Object.defineProperty(this, 'actions', {
      get: () => this.tba.currentRoom.actions.filter(e => e.locationButton)
    })

    this.tba.on('roomChange', () => {
      var btns = this.root.querySelectorAll('btn');
      btns[0].addEventListener("animationend", () => this.update(), false);
      btns.forEach(e => e.className = "animated fadeOut");
    });
  </script>
</location-actions>