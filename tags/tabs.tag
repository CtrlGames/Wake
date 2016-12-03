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
        display: flex
        flex-direction: row-reverse
        position: absolute
        right: 100%
        top: 0
        transform-origin: 100% 100%
        transform: rotateZ(-90deg)
        user-select: none
        white-space: nowrap
        z-index: 1

        a
          color: inherit
          cursor: pointer
          display: inline-block
          font-size: .75em
          margin-right: -8px
          padding: .5em 1.5em 0 1.5em
          position: relative
          text-decoration: none

          &:before
            background: #ddd
            border-radius: 5px 5px 0 0
            bottom: 0 
            box-shadow: $shadow2
            content: ''
            left: 0
            position: absolute
            right: 0
            top: 0
            transform-origin: bottom 
            transform: perspective(5px) rotateX(3deg)
            transition: background $animationDuration
            z-index: -1

          &.selected
            z-index: 1
          
            &:before
              background: #fff
              bottom: -1px

          &:only-child
            display: none


      &__tabContent
        overflow: hidden

        & > div
          animation-duration: $animationDuration
          display: none

          &:only-child,
          &.selected
            display: block
          
  </style>

  <script type=babel>
    this.selectTab = function(e){
      if(!e.target.getAttribute('for') || e.target.classList.contains('selected')) return
      this.deselectAll(() => {
        this[e.target.getAttribute('for')].classList.add('selected');
      });
      e.target.classList.add('selected');
    }

    this.deselectAll = function(callback) {
      this.tabContent.callback = callback;
      this.tabs.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
      this.tabContent.classList.add('fadeOut');
    }

    this.tabContent.addEventListener("animationend", () => { 
      if (this.tabContent.classList.contains('fadeOut')) {
        this.tabContent.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
        if(this.tabContent.callback) this.tabContent.callback();
        this.tabContent.classList.remove('fadeOut');
      }
    });

    this.noneSelected = function(){
      return (!this.tabs.querySelectorAll('.selected').length);
    }

    this.on('mount', () => {
      if(this.noneSelected()){
        this.tabs.querySelector('a').classList.add('selected');
        this.tabContent.querySelector('div').classList.add('selected');
      }
    });
  </script>
  
</tabs>
