<btn-group>
  <yield />

  <style type=sass>
    @import 'sass/vars';

    btn-group
      display: inline-block
      box-shadow: $shadow

      btn 
        float: left
        border-right: solid 1px $shade3
        border-radius: 0
        box-shadow: none

        &:first-child
          border-top-left-radius: $radius
          border-bottom-left-radius: $radius
        &:last-child
          border-top-right-radius: $radius
          border-bottom-right-radius: $radius
          border-right: none
  </style>
</btn-group>
