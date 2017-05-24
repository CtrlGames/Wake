<wake-header>
  <header class={ dead:opts.dead }>
    <btn click={ wakeUp }>Wake Up</btn>
    <h1 id="locationName" class="animated fadeIn">{ tba.currentRoom.name }</h1>
    <small id="hintElm" class="animated fadeIn" if={ hint.length }>{ hint }</small>
    <nav class="menu">
      <a onclick={ reset }>reset</a>
    </nav>
  </header>

  <style type=sass>
    @import "sass/vars";

    wake-header

      h1
        display: inline-block
        &:after
          content: " "
          display: inline-block
      btn
        display: none

      .dead
        h1
          display: none
        btn
          display: inline-block


      #hintElm
        font-style: italic
        &::before
          content: "Hint: "

      .menu
        float: right;
        font-size: 10px
        color: $shade3
        cursor: pointer

        a
          padding: 5px 0
          &:hover
            color: $shade1
  </style>

  <script type=babel>
    var hint = '';
    var hintTimeout;
    this.mixin('tba');
    this.mixin('storage');

    Object.defineProperty(this, 'hint', {
      get(){return hint;},
      set(val){
        hint = val;
        this.update();
      }
    });

    this.wakeUp = () => {
      this.tba.wakeUp();
      this.tba.trigger('cardActivate', 'game-log');
    };

    this.clearHint = () => {
      this.hintElm.classList.add('fadeOut');
    };

    this.hintElm.addEventListener("animationend", () => { 
      if (this.hintElm.classList.contains('fadeOut')) {
        this.hintElm.classList.remove('fadeOut');
        this.hint = '';
      }
    });

    this.tba.on('hint', (hint, timeout=8000) => {
      this.hint = hint;
      if(hintTimeout) clearTimeout(hintTimeout);
      hintTimeout = setTimeout(this.clearHint, timeout);
    });

    this.tba.on('roomChange', () => {
      this.locationName.addEventListener("animationend", () => { 
        this.update();
        this.locationName.classList.remove("fadeOut");
        this.locationName.classList.add("fadeIn");
      }, false);
      this.locationName.classList.remove("fadeIn");
      this.locationName.classList.add("fadeOut");
    });

    this.reset = function(){
      this.storage.clear();
    };
  </script>
</wake-header>
