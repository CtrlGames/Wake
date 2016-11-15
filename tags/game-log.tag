<game-log>
  <div class="gameLog__inputControls btn">
    <input type=text name=inputText class=gameLog__inputText>
    <button name=inputButton class=gameLog__inputButton>+</button>
  </div>
  <div class=gameLog__log>
    <div class=gameLog__logEntry each={ logEntries }>
      <div class="command" if={ command }>> { command } </div>
      <div class="output">{ output }</div>
    </div>
  </div>
  <!-- check comment -->

  <style type=sass>
    @import "sass/vars";

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
        border-left: solid 2px $shade1
        border-radius: 0
        flex: 0 0 auto
        padding: 0
        text-align: center
        width: 20px

      &__logEntry
        margin-top: $gutter*1.5

        .command
          font-size: 0.6em
          font-weight: bold
          color: $shade3
  </style>

  <script type="babel">
    // will store the log here
    this.logEntries = [
      {command: "Dolor est it", output: "Lorem ipsum dolor est it. Lorem ipsum dolor est it. Lorem ipsum dolor est it. Lorem ipsum dolor est it."},
      {command: "Dolor est it", output: "Lorem ipsum dolor est it. Lorem ipsum dolor est it. Lorem ipsum dolor est it. Lorem ipsum dolor est it."},
      {command: "Dolor est it", output: "Lorem ipsum dolor est it. Lorem ipsum dolor est it. Lorem ipsum dolor est it. Lorem ipsum dolor est it."},
      {output: "You wake with the waves calm against your face."}
    ];
  </script>
</game-log>
