<game-controls>
  <tabs class=card>
    <yield to=tabs>
      <a for=tools>Tools</a>
      <a for=buildings>Buildings</a>
    </yield>
    <yield to=content>
      <div name=tools>
        <h1>tools</h1>
      </div>
      <div name=buildings>
        <h1>buildings</h1>
      </div>
    </yield>
  </tabs>

  <style type=sass>
    game-controls
      display: block
      position: relative

      tabs
        position: absolute
        top: 0
        right: 0
        left: 0
        bottom: 0
  </style>

  <script type="babel">
  </script>
</game-controls>
