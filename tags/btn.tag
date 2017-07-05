<btn>
  <button onclick={ clickHandle } disabled={ opts.disable === false }>
    <yield />
    <span ref="pb" class="progressBackground"></span>
  </button>
  <tooltip if={ showTooltip }><raw output={ parent.opts.tooltip } /></tooltip>

  <style type=sass>
    @import 'sass/vars';

    @keyframes timeout
      from 
        width: 100%
      to 
        width: 0

    btn
      +button-base
      position: relative
      overflow: visible
      padding: 0

      &:hover > tooltip.card
        display: block !important

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

  <script>
    this.mixin('tba');
    this.clickHandle = opts.clickhandle;
    this.showTooltip = opts.tooltip && !!opts.tooltip.length;

    console.log(this.showTooltip)

    if (this.opts.timerName){
      this.tba.on(`btnTimer-${this.opts.timerName}`, (timeout=3000) => {
        this.refs.pb.style.animationDuration = `${timeout}ms`;
        this.refs.pb.style.animationName = 'timeout';
      });
    }


    this.on('mount', () => {
      this.refs.pb.addEventListener("animationend", () => { 
        this.refs.pb.style.animationName = 'none';
      }, false);
    });

    this.on('unmount', () => {
      this.tba.off(`btnTimer-${this.opts.timerName}`);
    });
  </script>
</btn>
