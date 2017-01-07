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
    this.mixin('storage');
    this.mixin('incPools');

    var groupOrder = ['basic', 'tools', 'buildings'];
    var incStorage = this.storage.get('incStorage');

    // load inc from storage
    if (incStorage) {
      for (let areaK in incStorage) {
        if(!incStorage.hasOwnProperty(areaK)) continue;
        let area = incStorage[areaK];
        this.inc.addQueue(areaK);
        for (let poolK in area) {
          if (!area.hasOwnProperty(poolK)) continue;
          this.inc[areaK].modifyPoolAmount(poolK, area[poolK], this.incPools[poolK], true);
        }
      }
    } 

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
      var storageOb = {};

      for (let areaK in this.inc) {
        if(!this.inc.hasOwnProperty(areaK)) continue;
        let area = this.inc[areaK];
        storageOb[areaK] = {};
        for (let poolK in area.pools) {
          if(!area.pools.hasOwnProperty(poolK)) continue;
          storageOb[areaK][poolK] = area.pools[poolK].amount;
        }
      }

      this.storage.set('incStorage', storageOb);
    });
  </script>
</increment-pools>
