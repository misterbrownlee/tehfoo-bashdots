(function() {
  var Debug, Emitter, Minimap, PluginManagement, ViewManagement;

  Emitter = require('emissary').Emitter;

  Debug = require('prolix');

  ViewManagement = require('./mixins/view-management');

  PluginManagement = require('./mixins/plugin-management');

  require('../vendor/resizeend');

  Minimap = (function() {
    function Minimap() {}

    Emitter.includeInto(Minimap);

    Debug('minimap').includeInto(Minimap);

    ViewManagement.includeInto(Minimap);

    PluginManagement.includeInto(Minimap);

    Minimap.prototype.configDefaults = {
      plugins: {},
      autoToggle: false
    };

    Minimap.prototype.active = false;

    Minimap.prototype.activate = function() {
      atom.workspaceView.command('minimap:toggle', (function(_this) {
        return function() {
          return _this.toggleNoDebug();
        };
      })(this));
      atom.workspaceView.command('minimap:toggle-debug', (function(_this) {
        return function() {
          return _this.toggleDebug();
        };
      })(this));
      if (atom.config.get('minimap.autoToggle')) {
        return this.toggleNoDebug();
      }
    };

    Minimap.prototype.deactivate = function() {
      this.destroyViews();
      return this.emit('deactivated');
    };

    Minimap.prototype.toggleDebug = function() {
      this.getChannel().activate();
      return this.toggle();
    };

    Minimap.prototype.toggleNoDebug = function() {
      this.getChannel().deactivate();
      return this.toggle();
    };

    Minimap.prototype.getCharWidthRatio = function() {
      return 0.72;
    };

    Minimap.prototype.toggle = function() {
      if (this.active) {
        this.active = false;
        return this.deactivate();
      } else {
        this.createViews();
        this.active = true;
        return this.emit('activated');
      }
    };

    return Minimap;

  })();

  module.exports = new Minimap();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlEQUFBOztBQUFBLEVBQUMsVUFBVyxPQUFBLENBQVEsVUFBUixFQUFYLE9BQUQsQ0FBQTs7QUFBQSxFQUNBLEtBQUEsR0FBUSxPQUFBLENBQVEsUUFBUixDQURSLENBQUE7O0FBQUEsRUFHQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSwwQkFBUixDQUhqQixDQUFBOztBQUFBLEVBSUEsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLDRCQUFSLENBSm5CLENBQUE7O0FBQUEsRUFNQSxPQUFBLENBQVEscUJBQVIsQ0FOQSxDQUFBOztBQUFBLEVBMkVNO3lCQUNKOztBQUFBLElBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsT0FBcEIsQ0FBQSxDQUFBOztBQUFBLElBQ0EsS0FBQSxDQUFNLFNBQU4sQ0FBZ0IsQ0FBQyxXQUFqQixDQUE2QixPQUE3QixDQURBLENBQUE7O0FBQUEsSUFFQSxjQUFjLENBQUMsV0FBZixDQUEyQixPQUEzQixDQUZBLENBQUE7O0FBQUEsSUFHQSxnQkFBZ0IsQ0FBQyxXQUFqQixDQUE2QixPQUE3QixDQUhBLENBQUE7O0FBQUEsc0JBTUEsY0FBQSxHQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVMsRUFBVDtBQUFBLE1BQ0EsVUFBQSxFQUFZLEtBRFo7S0FQRixDQUFBOztBQUFBLHNCQVdBLE1BQUEsR0FBUSxLQVhSLENBQUE7O0FBQUEsc0JBY0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixnQkFBM0IsRUFBNkMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsYUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE3QyxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsc0JBQTNCLEVBQW1ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLFdBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkQsQ0FEQSxDQUFBO0FBRUEsTUFBQSxJQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0JBQWhCLENBQXBCO2VBQUEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxFQUFBO09BSFE7SUFBQSxDQWRWLENBQUE7O0FBQUEsc0JBb0JBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxZQUFELENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxhQUFOLEVBRlU7SUFBQSxDQXBCWixDQUFBOztBQUFBLHNCQXlCQSxXQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsVUFBRCxDQUFBLENBQWEsQ0FBQyxRQUFkLENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUZXO0lBQUEsQ0F6QmIsQ0FBQTs7QUFBQSxzQkE4QkEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLE1BQUEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFhLENBQUMsVUFBZCxDQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFGYTtJQUFBLENBOUJmLENBQUE7O0FBQUEsc0JBcUNBLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTthQUFHLEtBQUg7SUFBQSxDQXJDbkIsQ0FBQTs7QUFBQSxzQkF3Q0EsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBRyxJQUFDLENBQUEsTUFBSjtBQUNFLFFBQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxLQUFWLENBQUE7ZUFDQSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBRkY7T0FBQSxNQUFBO0FBSUUsUUFBQSxJQUFDLENBQUEsV0FBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQURWLENBQUE7ZUFFQSxJQUFDLENBQUEsSUFBRCxDQUFNLFdBQU4sRUFORjtPQURNO0lBQUEsQ0F4Q1IsQ0FBQTs7bUJBQUE7O01BNUVGLENBQUE7O0FBQUEsRUE4SEEsTUFBTSxDQUFDLE9BQVAsR0FBcUIsSUFBQSxPQUFBLENBQUEsQ0E5SHJCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/brownlee/Documents/code/tools/dotfiles/bash/atom/packages/minimap/lib/minimap.coffee