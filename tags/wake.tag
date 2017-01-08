<wake>
  <wake-header if={ ~activeCards.indexOf('wake-header') } class=card dead={ activeCards.length === 1 } />
  <div class=wake__gameBoard>
    <game-log class=card if={ ~activeCards.indexOf('game-log') } />
    <div class=wake__gameControls>
      <location-actions class=card if={ ~activeCards.indexOf('location-actions') } />
      <div class=wake__generalControls>
        <increment-pools class=card if={ ~activeCards.indexOf('increment-pools') } />
        <game-controls class=card if={ ~activeCards.indexOf('game-controls') } />
      </div>
    </div>
  </div>

  <style type=sass>
    @import 'sass/vars';

    wake
      display: flex
      flex-direction: column
      flex: 1 1 auto
      padding: 5px
      width: 100%

    .wake

      &__gameBoard
        display: flex
        flex: 1 1 auto
        height: 0px

      &__gameControls
        display: flex
        flex: 1 1 auto
        flex-direction: column

      &__generalControls
        display: flex
        flex: 1 1 auto

      &.active
        opacity: 1
    
    game-log
      flex: 0 0 auto
      width: 300px

    increment-pools
      width: 250px

      &:only-child
        width: inherit
        flex: 1 0 auto

    game-controls
      flex: 1 1 auto

    location-actions
      min-height: 38px

  </style>

  <script type=babel>
    this.mixin('tba');
    this.mixin('inc');
    this.mixin('storage');
    this.activeCards = this.storage.get('activeCards') || ['wake-header'];

    var onCardActivate = (card) => {
      if(!~this.activeCards.findIndex(e => e===card)) {
        this.activeCards.push(card);
        this.storage.set('activeCards', this.activeCards);
        this.update();
      }
    };

    this.tba.on('cardActivate', onCardActivate);
    this.inc.on('cardActivate', onCardActivate);

    this.tba.on('died', () => {
      this.activeCards = ['wake-header'];
      this.update();
    });
  </script>

</wake>
