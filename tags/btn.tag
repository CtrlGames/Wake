<btn>
  <button onclick={ do }><yield /></button>

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
    this.mixin('tba');

    this.do = function(){
      this.tba.input(this.text);
    }
  </script>
</btn>
