<wake>
  <wake-header class=card />
  <div class="wake__gameBoard">
    <game-log class=card />
    <div class="wake__gameControls">
      <location-actions class=card />
      <div class="wake__generalControls">
        <increment-pools />
        <game-controls />
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

      &__gameControls
        display: flex
        flex: 1 1 auto
        flex-direction: column

      &__generalControls
        display: flex
        flex: 1 1 auto


    game-log
      flex: 0 0 auto
      width: 300px

    increment-pools
      width: 250px

    game-controls
      flex: 1 1 auto

    location-actions
      min-height: 38px

  </style>

</wake>
