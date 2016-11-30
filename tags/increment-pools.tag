
<increment-pools>
  <tabs class=card>
    <yield to=tabs>
      <a each={ parent.queues } for={ label }>{ label }</a>
    </yield>
    <yield to=content>
      <div each={ parent.queues } name={ label }>
        <pool each={ pools } />
      </div>
    </yield>
  </tabs>
  <ul>
    <li riot-tag="pool" each={ incPools }></li>
  </ul>

  <style type=sass>
    @import "sass/vars";

    increment-pools
      position: relative

      tabs
        position: absolute
        top: 0
        right: 0
        left: 0
        bottom: 0

  </style>

  <script type="babel">
    // place holder for incremental pools
    
    this.mixin('inc');

    console.log(this.inc)

    this.inc.queues.island.addPool({name:'Wood', key: 'wood', minimum:0, amount: 2});
    this.inc.queues.island.addPool({name:'String', key: 'string', minimum:0, amount: 2});
    this.inc.queues.island.addPool({name:'Food', key: 'food', minimum:0, amount: 5});

    this.queues = this.inc.queues;
    this.queues = [
      {label: 'Islands', pools: [
        {name: "wood", value: 10},
        {name: "string", value: 5},
        {name: "food", value: 15}
      ]},
      {label: 'Second', pools: [
        {name: "wood", value: 10},
        {name: "string", value: 5},
        {name: "food", value: 15}
      ]}
    ];


  </script>
</increment-pools>
