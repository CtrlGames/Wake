
<increment-pools>
  <tabs>
    <yield to=tabs>
      <a each={ area, queue in parent.inc } for={ area }>{ area }</a>
    </yield>
    <yield to=content>
      <div each={ area, queue in parent.inc } name={ area }>
        <pool each={ name, pool in queue.pools } />
      </div>
    </yield>
  </tabs>

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
        padding: 5px 10px 6px 10px

  </style>

  <script type="babel">
    this.mixin('inc');

    this.inc.on('poolModified', () => this.update());
  </script>
</increment-pools>
