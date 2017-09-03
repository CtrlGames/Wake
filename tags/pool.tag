<pool>
  <div class="pool">
    <label>{ name }</lablel>: 
    <span>{ pool.amount }</span>
    <div class="pool__controls">
      <button class="text" if={ pool.details.refundable } onclick={ refund }>-</button>
      <button class="text" if={ pool.details.purchasable } onclick={ purchase }>+</button>
    </div>
  </div>

  <style type=sass>
    @import "sass/vars";

    .pool
      transition: background-color $animationDuration

      &:hover
        background-color: $shade4

        .pool__controls
          opacity: 1;

      &__controls
        opacity: 0
        float: right
        transition: opacity $animationDuration
  </style>

  <script>
    this.mixin('inc');
    
    this.inc.on('poolModified', () => this.update() );

    this.purchase = function(){
      this.inc.island.modifyPoolAmount(this.pool.key, 1);
    }

    this.refund = function() {
      this.inc.island.refundPoolAmount(this.pool.key, 1);
    }
  </script>
</pool>
