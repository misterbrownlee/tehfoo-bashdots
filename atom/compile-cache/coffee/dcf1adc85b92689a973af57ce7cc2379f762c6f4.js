(function() {
  var $, Emitter, MinimapFindAndReplaceBinding, MinimapFindResultsView, PLUGIN_NAME, Subscriber, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore-plus');

  $ = require('atom').$;

  _ref = require('emissary'), Subscriber = _ref.Subscriber, Emitter = _ref.Emitter;

  MinimapFindResultsView = null;

  PLUGIN_NAME = 'find-and-replace';

  module.exports = MinimapFindAndReplaceBinding = (function() {
    Subscriber.includeInto(MinimapFindAndReplaceBinding);

    Emitter.includeInto(MinimapFindAndReplaceBinding);

    MinimapFindAndReplaceBinding.prototype.active = false;

    MinimapFindAndReplaceBinding.prototype.isActive = function() {
      return this.active;
    };

    function MinimapFindAndReplaceBinding(findAndReplacePackage, minimapPackage) {
      this.findAndReplacePackage = findAndReplacePackage;
      this.minimapPackage = minimapPackage;
      this.markersUpdated = __bind(this.markersUpdated, this);
      this.deactivate = __bind(this.deactivate, this);
      this.activate = __bind(this.activate, this);
      this.minimap = require(this.minimapPackage.path);
      this.findAndReplace = require(this.findAndReplacePackage.path);
      MinimapFindResultsView = require('./minimap-find-results-view')();
      this.minimap.registerPlugin(PLUGIN_NAME, this);
    }

    MinimapFindAndReplaceBinding.prototype.activatePlugin = function() {
      $(document).on('find-and-replace:show', this.activate);
      atom.workspaceView.on('core:cancel core:close', this.deactivate);
      this.subscribe(this.minimap, 'activated.minimap', this.activate);
      this.subscribe(this.minimap, 'deactivated.minimap', this.deactivate);
      if (this.findViewIsVisible() && this.minimapIsActive()) {
        return this.activate();
      }
    };

    MinimapFindAndReplaceBinding.prototype.deactivatePlugin = function() {
      $(document).off('find-and-replace:show');
      atom.workspaceView.off('core:cancel core:close');
      this.unsubscribe();
      return this.deactivate();
    };

    MinimapFindAndReplaceBinding.prototype.activate = function() {
      if (!(this.findViewIsVisible() && this.minimapIsActive())) {
        return this.deactivate();
      }
      if (this.active) {
        return;
      }
      this.active = true;
      this.findView = this.findAndReplace.findView;
      this.findModel = this.findView.findModel;
      this.findResultsView = new MinimapFindResultsView(this.findModel);
      this.subscribe(this.findModel, 'updated', this.markersUpdated);
      return setImmediate((function(_this) {
        return function() {
          return _this.findModel.emit('updated', _.clone(_this.findModel.markers));
        };
      })(this));
    };

    MinimapFindAndReplaceBinding.prototype.deactivate = function() {
      if (!this.active) {
        return;
      }
      this.active = false;
      this.findResultsView.detach();
      return this.unsubscribe(this.findModel, 'updated');
    };

    MinimapFindAndReplaceBinding.prototype.destroy = function() {
      this.deactivate();
      this.findAndReplacePackage = null;
      this.findAndReplace = null;
      this.minimapPackage = null;
      return this.minimap = null;
    };

    MinimapFindAndReplaceBinding.prototype.findViewIsVisible = function() {
      return (this.findAndReplace.findView != null) && this.findAndReplace.findView.parent().length === 1;
    };

    MinimapFindAndReplaceBinding.prototype.minimapIsActive = function() {
      return this.minimap.active;
    };

    MinimapFindAndReplaceBinding.prototype.markersUpdated = function() {
      this.findResultsView.detach();
      return this.findResultsView.attach();
    };

    return MinimapFindAndReplaceBinding;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtHQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNDLElBQUssT0FBQSxDQUFRLE1BQVIsRUFBTCxDQURELENBQUE7O0FBQUEsRUFFQSxPQUF3QixPQUFBLENBQVEsVUFBUixDQUF4QixFQUFDLGtCQUFBLFVBQUQsRUFBYSxlQUFBLE9BRmIsQ0FBQTs7QUFBQSxFQUdBLHNCQUFBLEdBQXlCLElBSHpCLENBQUE7O0FBQUEsRUFLQSxXQUFBLEdBQWMsa0JBTGQsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixJQUFBLFVBQVUsQ0FBQyxXQUFYLENBQXVCLDRCQUF2QixDQUFBLENBQUE7O0FBQUEsSUFDQSxPQUFPLENBQUMsV0FBUixDQUFvQiw0QkFBcEIsQ0FEQSxDQUFBOztBQUFBLDJDQUdBLE1BQUEsR0FBUSxLQUhSLENBQUE7O0FBQUEsMkNBSUEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxPQUFKO0lBQUEsQ0FKVixDQUFBOztBQU1hLElBQUEsc0NBQUUscUJBQUYsRUFBMEIsY0FBMUIsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLHdCQUFBLHFCQUNiLENBQUE7QUFBQSxNQURvQyxJQUFDLENBQUEsaUJBQUEsY0FDckMsQ0FBQTtBQUFBLDZEQUFBLENBQUE7QUFBQSxxREFBQSxDQUFBO0FBQUEsaURBQUEsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxPQUFBLENBQVEsSUFBQyxDQUFBLGNBQWMsQ0FBQyxJQUF4QixDQUFYLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxjQUFELEdBQWtCLE9BQUEsQ0FBUSxJQUFDLENBQUEscUJBQXFCLENB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
//# sourceURL=/Users/brownlee/Documents/code/tools/dotfiles/bash/atom/packages/minimap-find-and-replace/lib/minimap-find-and-replace-binding.coffee