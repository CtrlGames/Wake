<game-controls>
  <tabs>
    <yield to=tabs>
      <a each={ buttons, group in parent.availableControls } for={ group }>{ group }</a>
    </yield>
    <yield to=content>
      <div each={ buttons, group in parent.availableControls } name={ group }>
        <btn each={ buttons } clickhandle={ parent.parent.parent.clickHandle.bind(this, name) } disable={ parent.parent.parent.checkRequirements(name) } tooltip={ parent.parent.parent.getTooltip(name) }>{ name }</btn>
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

  <script>
    this.mixin('inc');
    this.mixin('tba');
    this.mixin('controls');
    this.mixin('storage');
    this.mixin('utils');
    this.availableControls = {};

    var active = false;
    const foundButtons = this.storage.get('foundButtons') || [];

    this.clickHandle = (name) => this.tba.input(`make ${name}`);

    this.getTooltip = this.utils.getRequirementsList;

    this.checkRequirements = name => {
      return this.inc.island.checkPoolRequirements(name).success;
    };

    var isButtonFound = (name) => {
      return !!~foundButtons.indexOf(name);
    };

    var updateAvailableControls = () => {
      var possibleControls = {};
      var previouslyFound = foundButtons.length;

      for (let groupKey in this.controls) {
        possibleControls[groupKey] = this.controls[groupKey].filter((e) => {
          if (!isButtonFound(e.name) && this.checkRequirements(e.name)) foundButtons.push(e.name);
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
    this.inc.on('poolModified', updateAvailableControls);
  </script>
</game-controls>
