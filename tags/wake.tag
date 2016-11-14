<wake>
  <header class="wake__gameHead">
    <h1>Your location</h1>
    <small class="wake__hint">A little hint about something.</small>
  </header>
  <div class="wake__gameBoard">
    <game-log />
    <div class="wake__gameControls">
      <location-actions />
      <div class="wake__generalControls">
        <increment-pools />
        <tabs />
      </div>
    </div>
  </div>

  <style type=sass>
    @import 'sass/vars'

    wake
      display: flex
      flex: 1 1 auto
      flex-direction: column
      padding: $gutter

    .wake

      &__gameHead
        h1
          display: inline-block

      &__gameBoard
        display: flex
        flex: 1 1 auto

      &__gameControls
        display: flex
        flex: 1 1 auto
        flex-direction: column
        padding-left: $gutter

      &__generalControls
        display: flex
        flex: 1 1 auto
        padding-top: $gutter

      &__hint
        font-style: italic
        &::before
          content: "Hint: "

    game-log
      width: 250px

    increment-pools
      width: 175px

    tabs
      flex: 1 1 auto

  </style>

  <script type="babel">
    var a = 111;
    var b = 222;
    if(a){

    }
  </script>
</wake>
