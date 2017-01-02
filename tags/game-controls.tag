<game-controls>
  <tabs>
    <yield to=tabs>
      <a each={ group, buttons in parent.availableControls } for={ group }>{ group }</a>
    </yield>
    <yield to=content>
      <div each={ group, buttons in parent.availableControls } name={ group }>
        <btn each={ buttons } click={ parent.parent.parent.clickHandle.bind(this, method) } disable={ parent.parent.parent.checkRequirements(requirements) }>{ name }</btn>
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
    this.mixin('inc');
    this.mixin('controls');
    this.mixin('storage');
    this.availableControls = {};

    var active = false;
    const foundButtons = this.storage.get('foundButtons') || [];

    this.clickHandle = function(method){
      if (method) method();
      this.update();
    };

    this.checkRequirements = reqs => {
      var ret = true;
      for (let key in reqs) {
        if(this.inc.island.getPoolAmount(key) < reqs[key]) {
          ret = false;
          break;
        }
      }
      return ret;
    };

    var isButtonFound = (name) => {
      return !!~foundButtons.indexOf(name);
    };

    var updateAvailableControls = () => {
      var possibleControls = {};
      var previouslyFound = foundButtons.length;

      for (let groupKey in this.controls) {
        possibleControls[groupKey] = this.controls[groupKey].filter((e) => {
          if (!isButtonFound(e.name) && this.checkRequirements(e.requirements)) foundButtons.push(e.name);
          return isButtonFound(e.name);
        });
        if (!possibleControls[groupKey].length) delete possibleControls[groupKey];
      }

      this.availableControls = possibleControls;
      this.update();
      if (foundButtons.length && !active) {
        active = true;
        this.inc.trigger('cardActivate', 'game-controls');
      }
      if(foundButtons.length !== previouslyFound) this.storage.set('foundButtons', foundButtons);
    };

    updateAvailableControls();
    document.addEventListener('tick', updateAvailableControls);
  </script>
</game-controls>
