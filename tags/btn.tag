<btn>
  <button onclick={ click }><yield /></button>

  <style type=sass>
    @import 'sass/vars';

    btn
      +button-base
      padding: 0

      button
        background: transparent
        box-shadow: none

  </style>

  <script type="babel">
    this.click = this.opts.click;
  </script>
</btn>
