<game-controls>
  <div class="controls__locationControls">
    <btn each={ actions }>{ text }</btn>
  </div>
  <div class="controls__incrementBase">
    <ul>
      <li riot-tag="increment-pool" each={ incPoolsOne }></li>
    </ul>
  </div>

  <style type=sass>
    game-controls
      display: block
  </style>

  <script type="babel">

    // location specific actions place holder
    this.actions = [
      {text: "Get stuff"},
      {text: "Get things"},
      {text: "do stuff"},
      {text: "do things"}
    ];
    // place holder for incremental pools
    this.incPoolsOne = [
      {name: "wood", value: 10},
      {name: "seed", value: 5},
      {name: "food", value: 15}
    ]
  </script>
</game-controls>
