<wake-header>
  <header class={ dead:opts.dead }>
    <btn clickHandle={ wakeUp }>Wake Up</btn>
    <h1 id="locationName" ref=locationName class="animated fadeIn">{ name }</h1>
    <small id="hintElm" ref="hintElm" class="animated fadeIn" if={ hint.length }>{ hint }</small>
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
            color: $shade0
  </style>

  <script>
    var hint = '';
    var hintTimeout;
    var loaded = false;
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

    this.reset = function(){
      this.storage.clear();
    };

    this.clearHint = () => {
      this.refs.hintElm.classList.add('fadeOut');
    };

    this.tba.on('hint', (hint, timeout=8000) => {
      this.hint = hint;
      if(hintTimeout) clearTimeout(hintTimeout);
      hintTimeout = setTimeout(this.clearHint, timeout);
    });

    var locationAnimationEvent = () => {
      this.name = this.tba.currentRoom.name;
      this.update();
      this.refs.locationName.classList.remove("fadeOut");
      this.refs.locationName.classList.add("fadeIn");
      this.refs.locationName.removeEventListener('animationend', locationAnimationEvent, false);
    };

    this.tba.on('roomChange', () => {
      if (loaded) {
        this.refs.locationName.addEventListener("animationend", locationAnimationEvent, false);
        this.refs.locationName.classList.remove("fadeIn");
        this.refs.locationName.classList.add("fadeOut");
      } else {
        this.name = this.tba.currentRoom.name;
        this.update();
        loaded = true;
      }
    });

  </script>
</wake-header>
