<game-controls>
  <tabs>
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
        padding: 5px 10px 6px 10px

  </style>

  <script type="babel">
  </script>
</game-controls>
