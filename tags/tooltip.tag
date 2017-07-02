<tooltip class="card">
  <div>
    <yield />
  </div>

  <style type=sass>
    @import 'sass/vars';

    *:hover > tooltip.card
      display: block !important

    tooltip.card
      position: absolute
      display: none
      bottom: calc(100% + #{$gutter/2})
      left: 50%
      margin: 0
      background: $shade1
      color: $shade5
      white-space: nowrap
      transform: translateX(-50%)
      pointer-events: none
      animation-delay: .75s

      ::after
        content: "";
        position: absolute;
        display: block;
        top: 100%;
        left: 50%;
        height: 0px;
        width: 0px;
        border: solid transparent 7px;
        border-top-color: $shade1
        transform: translateX(-50%);

  </style>
</tooltip>
