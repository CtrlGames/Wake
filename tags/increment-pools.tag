
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
