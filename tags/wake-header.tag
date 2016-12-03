<wake-header>
  <header class={ dead:opts.dead }>
    <btn click={ wakeUp }>Wake Up</btn>
    <h1 id="locationName" class="animated fadeIn">{ tba.currentRoom.name }</h1>
    <small id="hintElm" class="animated fadeIn" if={ hint.length }>{ hint }</small>
  </header>

  <style type=sass>
    wake-header
      h1
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
  </style>

  <script type=babel>
    var hint = '';
    var hintTimeout;
    this.mixin('tba');

    Object.defineProperty(this, 'hint', {
      get(){return hint;},
      set(val){
        hint = val;
        this.update();
      }
    })

    this.wakeUp = () => {
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
      to = setTimeout(this.clearHint, timeout);
    });

    this.tba.on('roomChange', () => {
      this.locationName.addEventListener("animationend", () => { 
        this.update() 
        this.locationName.classList.remove("fadeOut");
        this.locationName.classList.add("fadeIn");
      }, false);
      this.locationName.classList.remove("fadeIn");
      this.locationName.classList.add("fadeOut");
    });
  </script>
</wake-header>
