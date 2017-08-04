<location-actions>
  <btn-group 
    each={ action, index in actions }
    class="animated fadeIn"
    style={"animation-delay: " + .05*index + "s"}
  >
    <btn 
      clickHandle={ parent.updateTba.bind(parent, action.text) }
      timer-name={ action.text.replace(/\s/, '').toLowerCase() }
    >
      { parent.action.text }
    </btn>
    <btn clickHandle={ parent.handleInc.bind(parent, action.inc) } if={ action.inc && parent.showWorkerButtons } disable={ parent.checkReq(action.inc) } tooltip={parent.getTooltip(action.inc)}>+</btn>
  </btn-group>

  <style type=sass>
    @import "sass/vars"

    location-actions
      display: block

      &.card
        padding-top: 0

      btn-group
        margin-top: 5px
        margin-right: $gutter/2

  </style>

  <script>
    this.mixin('inc');
    this.mixin('tba');
    this.mixin('utils');
    this.mixin('storage');

    var cardActive = !!(this.storage.get('activeCards') && ~this.storage.get('activeCards').indexOf('location-actions'));

    this.updateTba = text => this.tba.input(text);

    this.checkReq = name => this.inc.island.checkPoolRequirements(name).success;

    this.getTooltip = name => this.utils.getRequirementsList(name);

    this.handleInc = pool => this.inc.island.modifyPoolAmount(pool, 1);

    Object.defineProperty(this, 'actions', {
      get(){ 
        return this.tba.currentRoom && this.tba.currentRoom.actions?
          this.tba.currentRoom.actions.filter(e => e.locationButton):[];
      }
    });

    Object.defineProperty(this, 'showWorkerButtons', {
      get(){
        return this.inc.island.getPoolAmount('moochers') !== null;
      }
    });

    this.tba.on('cardActivate', (card) => {
      if (card === 'location-actions' && !cardActive) {
        cardActive = true;
      }
    });

    this.tba.on('updateLocationAction', () => this.update());

    this.tba.on('roomChange', () => {
      var btns = this.root.querySelectorAll('btn-group');
      if (btns.length) {
        btns[0].addEventListener("animationend", () => { 
          this.update();
        }, false);
      } else this.update();
      Array.prototype.forEach.call(btns, e => e.className = "animated fadeOut");
    });

  </script>
</location-actions>
