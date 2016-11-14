
<increment-pools>
  <ul>
    <li riot-tag="pool" each={ incPools }></li>
  </ul>

  <script type="babel">
    // place holder for incremental pools
    this.incPools = [
      {name: "wood", value: 10},
      {name: "seed", value: 5},
      {name: "food", value: 15}
    ]
  </script>
</increment-pools>
