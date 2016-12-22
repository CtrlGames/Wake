<btn>
  <button onclick={ click }>
    <yield />
    <span name="pb" class="progressBackground"></span>
  </button>

  <style type=sass>
    @import 'sass/vars';

    @keyframes timeout
        from 
          width: 100%
        to 
          width: 0

    btn
      +button-base
      padding: 0

      button
        position: relative
        background: transparent
        box-shadow: none

        span
          position: absolute
          right: 0
          top: 0
          width: 0
          height: 100%
          background: linear-gradient(to left, rgba(#fff,0.7), rgba(#fff,0.7) 90%, rgba(#fff,0));
          animation-timing-function: cubic-bezier(0.40, 0, 1, 0.60)
  </style>

  <script type="babel">
    this.mixin('tba');
    this.click = this.opts.click;

    if (this.opts.timerName){
      this.tba.on(`btnTimer-${this.opts.timerName}`, (timeout=3000) => {
        this.pb.style.animationDuration = `${timeout}ms`;
        this.pb.style.animationName = 'timeout';
      });
    }

    this.pb.addEventListener("animationend", () => { 
      this.pb.style.animationName = 'none';
    }, false);

    this.on('unmount', () => {
      this.tba.off(`btnTimer-${this.opts.timerName}`);
    })
  </script>
</btn>
