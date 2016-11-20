<wake-header>
  <header>
    <h1 id="locationName" class="animated fadeIn">{ tba.currentRoom.name }</h1>
    <small class="hint">A little hint about something.</small>
  </header>

  <style type=sass>
    wake-header
      h1
        display: inline-block

      hint
        font-style: italic
        &::before
          content: "Hint: "
  </style>

  <script type=babel>
    this.mixin('tba');

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
