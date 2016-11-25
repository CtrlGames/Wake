<tabs>
  <div name=tabs class=tabs__tabs onclick={ selectTab }>
    <yield from=tabs />
  </div>
  <div name=tabContent class="tabs__tabContent animated fadeIn">
    <yield from=content />
  </div>

  <style type=sass>
    @import 'sass/vars'
    
    tabs
      position: relative

    .tabs

      &__tabs
        position: absolute
        z-index: 1
        white-space: nowrap
        top: 0
        transform: rotateZ(-90deg)
        transform-origin: 100% 100%
        right: 100%

        a
          position: relative
          display: inline-block
          padding: .5em 1.5em 0 1.5em
          color: inherit
          cursor: pointer
          text-decoration: none
          font-size: .75em
          margin-right: -8px

          &:before
            content: ''
            position: absolute
            top: 0
            right: 0
            bottom: 0 
            left: 0
            z-index: -1
            border-radius: 5px 5px 0 0
            background: #ddd
            box-shadow: $shadow2
            transform: perspective(5px) rotateX(3deg)
            transform-origin: bottom 
            transition: background $animationDuration

          &.selected
            z-index: 1
          
            &:before
              bottom: -1px
              background: #fff

      &__tabContent

        & > div
          animation-duration: $animationDuration
          display: none

          &.selected
            display: block
          
  </style>

  <script type=babel>
    this.selectTab = function(e){
      this.deselectAll(() => {
        this[e.target.getAttribute('for')].classList.add('selected');
      });
      e.target.classList.add('selected');
    }

    this.deselectAll = function(callback) {
      this.tabContent.callback = callback;
      this.tabs.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
      this.tabContent.classList.remove('fadeIn');
      this.tabContent.classList.add('fadeOut');
    }

    this.tabContent.addEventListener("animationend", () => { 
      if (this.tabContent.classList.contains('fadeOut')) {
        this.tabContent.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
        if(this.tabContent.callback) this.tabContent.callback();
        this.tabContent.classList.remove('fadeOut');
        this.tabContent.classList.add('fadeIn');
      }
    });
  </script>
  
</tabs>
