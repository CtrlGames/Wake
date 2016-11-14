<game-log>
  <div class="gameLog__inputControls btn">
    <input type=text name=inputText class=gameLog__inputText>
    <button name=inputButton class=gameLog__inputButton>+</button>
  </div>
  <div class=gameLog__log>
    <div class=gameLog__logEntry each={ logEntries }>{ value }</div>
  </div>
  <!-- check comment -->

  <style type=sass>
    game-log
      display: block

    .gameLog
      &__inputControls
        display: flex
        padding-right: 0

      &__inputText
        border: none
        flex: 1 1 auto
        padding: 0

      &__inputButton
        background: none
        border: none
        border-left: solid 2px #000
        border-radius: 0
        flex: 0 0 auto
        padding: 0
        text-align: center
        width: 20px

      &__logEntry
        margin-top: 5px
  </style>

  <script type="babel">
    // will store the log here
    this.logEntries = [
      {value: "Item one"},
      {value: "Item two"},
      {value: "Item three"},
      {value: "Item four"}
    ];
  </script>
</game-log>
