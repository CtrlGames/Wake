<tabs>
  <div class=tabs__tabs>
    <a class="tabs__tab">Demo</a>
    <a class="tabs__tab">Demo</a>
  </div>
  <div class=tabs__tabContent>
    I can show you the worrrrrrrrllllld.<br />
    Tab by tab. 
  </div>

  <style type=sass>
    @import 'sass/vars'
    
    tabs
      position: relative
      padding-left: $gutter
      margin-left: $gutter*2
      border-left: solid 2px #000

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
          text-decoration: none
          font-size: .75em
          margin-right: -6px

          &:before
            content: '' /* To generate the box */
            border: .1em solid #aaa
            position: absolute
            top: 0
            right: 0
            bottom: 0 
            left: 0
            z-index: -1
            border-bottom: none
            border-radius: 5px 5px 0 0
            background: #ddd
            box-shadow: 0 2px hsla(0,0%,100%,.5) inset
            transform: perspective(5px) rotateX(3deg)
            transform-origin: bottom 

  </style>
  
</tabs>
