<increment-pools>
  <tabs>
    <yield to=tabs>
      <a each={ area, queue in parent.inc } for={ area }>{ area }</a>
    </yield>
    <yield to=content>
      <div each={ area, queue in parent.inc } name={ area }>
        <div class=group each={ parent.parent.group(queue) }>
          <pool each={ name, pool in pools } />
        </div>
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

      .group
        padding-bottom: $gutter/1.3

  </style>

  <script type="babel">
    this.mixin('inc');

    var groupOrder = ['basic', 'tools', 'buildings'];

    this.group = (queue) => {
      var ret = [];
      var groupMap = {};
      for (let k in queue.pools) {
        if (!queue.pools.hasOwnProperty(k)) continue;
        let g = queue.pools[k].details.group || 'basic';
        if (groupMap[g] === undefined) groupMap[g] = ret.push({
          pools: {},
          position: groupOrder.indexOf(g) || 0
        })-1;
        ret[groupMap[g]].pools[k] = queue.pools[k];
      }
      return ret.sort((a,b) => a.position-b.position);
    };

    this.inc.on('poolModified', () => {
      this.update();
    });
  </script>
</increment-pools>
