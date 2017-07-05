<tabs>
  <div ref=tabs class=tabs__tabs onclick={ selectTab }>
    <yield from=tabs />
  </div>
  <div ref=tabContent class="tabs__tabContent animated fadeIn">
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

        & > div
          animation-duration: $animationDuration
          display: none

          &:only-child,
          &.selected
            display: block
          
  </style>

  <script>

    this.selectTab = function(e){
      if(!e.target.getAttribute('for') || e.target.classList.contains('selected')) return;
      this.deselectAll(() => {
        this.refs.tabContent.querySelector(`[name=${e.target.getAttribute('for')}]`).classList.add('selected');
      });
      e.target.classList.add('selected');
    };

    this.deselectAll = function(callback) {
      this.refs.tabContent.callback = callback;
      Array.prototype.forEach.call(this.refs.tabs.querySelectorAll('.selected'), e => e.classList.remove('selected'));
      this.refs.tabContent.classList.add('fadeOut');
    };

    this.noneSelected = function(){
      return (!this.refs.tabs.querySelectorAll('.selected').length);
    };

    this.on('mount', () => {
      if(this.refs.tabs.children.length && this.noneSelected()){
        this.refs.tabs.querySelector('a').classList.add('selected');
        this.refs.tabContent.querySelector('div').classList.add('selected');
      }

      this.refs.tabContent.addEventListener("animationend", () => { 
        if (this.refs.tabContent.classList.contains('fadeOut')) {
          Array.prototype.forEach.call(this.refs.tabContent.querySelectorAll('.selected'), e => e.classList.remove('selected'));
          if(this.refs.tabContent.callback) this.refs.tabContent.callback();
          this.refs.tabContent.classList.remove('fadeOut');
        }
      });
    });
  </script>
  
</tabs>
