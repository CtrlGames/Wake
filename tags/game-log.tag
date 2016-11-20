<game-log>
  <div class="gameLog__inputControls">
    <input type=text name=inputText class=gameLog__inputText onkeyup={ inputkeyup }>
    <button name=inputButton class=gameLog__inputButton onclick={ logInput }>&crarr;</button>
  </div>
  <div class=gameLog__log name=gameLog>
    <div class="gameLog__logEntry animated" each={ logEntries }>
      <div class="command" if={ command }>> { command } </div>
      <div class={ "output " + className }>{ output }</div>
    </div>
  </div>

  <style type=sass>
    @import "sass/vars";

    @keyframes gameLogEntry
      from 
        max-height: 0
        opacity: 0
        transform: translate3d(0, -100%, 0)

      to 
        max-height: 200px
        opacity: 1
        transform: none


    game-log
      display: flex
      flex-direction: column

    .gameLog

      &__inputControls
        +button-base
        display: flex
        flex: 0 0 auto
        padding: 0

      &__inputText
        border: none
        box-shadow: none
        flex: 1 1 auto
        margin: 2px 0 2px 2px
        padding: 3px 10px
        background: $shade5 

      &__inputButton
        background: none
        border-radius: 0
        border: none
        box-shadow: none
        flex: 0 0 auto
        padding: 0
        text-align: center
        width: 20px

      &__log
        +scrollbar-style

      &__logEntry
        margin-top: $gutter*1.5
        animation-name: gameLogEntry

        .command
          font-size: 0.6em
          font-weight: bold
          color: $shade3

  </style>

  <script type=babel>
    this.mixin('tba');
    this.mixin('scrollinit');
    this.logEntries = [];


    this.inputkeyup = function(e){
      if(e.key == "Enter") this.logInput();
    }

    this.logInput = function(){
        this.tba.input(this.inputText.value);
        this.inputText.select();
    }

    this.log = function(logOb) {
      if(typeof logOb === "string") logOb = {output: logOb};
      this.logEntries.unshift(logOb);
      return this.update; // returned so you can manually update the log if need be.
    }

    this.on('mount', () => this.inputText.focus());
    this.tba.on('log', lobOb => this.log(lobOb)());
    this.tba.on('output', (output, input) => this.log({command: input, output})());

    this.scrollinit.vertical(this.gameLog);

  </script>
</game-log>