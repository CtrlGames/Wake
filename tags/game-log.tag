<game-log>
  <div class="gameLog__inputControls">
    <input type=text ref=inputText class=gameLog__inputText onkeyup={ inputkeyup } onkeydown={ inputkeydown }>
    <button ref=inputButton class=gameLog__inputButton onclick={ logInput }>&crarr;</button>
  </div>
  <div class=gameLog__log ref=gameLog>
    <div class="gameLog__logEntry animated" each={ logEntries }>
      <div class="command" if={ command }>> { command } </div>
      <raw class={ "output " + className } output={ output } />
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

        &::selection
          background-color: $shade4

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

        .exits, .item
          font-size: 0.9em
          &:first-child
            padding-top: 5px

        .small
          font-size: 0.9em

        .indent
          padding-left: 1em
  </style>

  <script>
    this.mixin('tba');
    this.mixin('scrollinit');
    this.logEntries = [];
    this.commandEntries = [];

    var commandSearchIndex = 0;

    document.onkeydown = function(){
      this.refs.inputText.value = '';
      this.refs.inputText.focus();
    }.bind(this);

    this.inputkeyup = function(e){
      if(e.key == "Enter") this.logInput();
      if(e.key == "ArrowUp" && this.commandEntries[commandSearchIndex+1])
        this.selectText(this.commandEntries[++commandSearchIndex]);
      if(e.key == "ArrowDown" && this.commandEntries[commandSearchIndex-1])
        this.selectText(this.commandEntries[--commandSearchIndex]);
    };

    this.selectText = function(text) {
      this.refs.inputText.value = text;
      this.refs.inputText.select();
    };

    this.inputkeydown = function(e){
      e.stopPropagation();
      return true;
    };

    this.logInput = function(){
      this.tba.input(this.refs.inputText.value);
      this.refs.inputText.select();
    };

    this.log = function(logOb) {
      if(typeof logOb === "string") logOb = {output: logOb};
      if(logOb.output) {
        this.logEntries.unshift(logOb);
        if(logOb.command){
          if(this.commandEntries[0] != logOb.command) this.commandEntries.unshift(logOb.command);
          if(this.commandEntries.length > 10) this.commandEntries.pop();
          this.refs.inputText.value = logOb.command;
          this.refs.inputText.select();
        }
      }
      return this.update; // returned so you can manually update the log if need be.
    };

    this.tba.on('log', lobOb => this.log(lobOb)());
    this.tba.on('output', (output, input) => this.log({command: input, output})());
    this.on('mount', () => {
      this.refs.inputText.focus();
      this.scrollinit.vertical(this.refs.gameLog);
    });


  </script>
</game-log>
