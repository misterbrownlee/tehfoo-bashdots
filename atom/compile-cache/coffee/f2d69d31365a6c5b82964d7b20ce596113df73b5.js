(function() {
  var MinimapView, Mixin, ViewManagement,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mixin = require('mixto');

  MinimapView = require('../minimap-view');

  module.exports = ViewManagement = (function(_super) {
    __extends(ViewManagement, _super);

    function ViewManagement() {
      return ViewManagement.__super__.constructor.apply(this, arguments);
    }

    ViewManagement.prototype.minimapViews = {};

    ViewManagement.prototype.updateAllViews = function() {
      var id, view, _ref, _results;
      _ref = this.minimapViews;
      _results = [];
      for (id in _ref) {
        view = _ref[id];
        _results.push(view.onScrollViewResized());
      }
      return _results;
    };

    ViewManagement.prototype.minimapForEditorView = function(editorView) {
      return this.minimapForPaneView(editorView != null ? editorView.getPane() : void 0);
    };

    ViewManagement.prototype.minimapForPaneView = function(paneView) {
      return this.minimapForPane(paneView != null ? paneView.model : void 0);
    };

    ViewManagement.prototype.minimapForPane = function(pane) {
      if (pane != null) {
        return this.minimapViews[pane.id];
      }
    };

    ViewManagement.prototype.destroyViews = function() {
      var id, view, _ref, _ref1;
      _ref = this.minimapViews;
      for (id in _ref) {
        view = _ref[id];
        view.destroy();
      }
      if ((_ref1 = this.eachPaneViewSubscription) != null) {
        _ref1.off();
      }
      return this.minimapViews = {};
    };

    ViewManagement.prototype.createViews = function() {
      return this.eachPaneViewSubscription = atom.workspaceView.eachPaneView((function(_this) {
        return function(paneView) {
          var paneId, view;
          paneId = paneView.model.id;
          view = new MinimapView(paneView);
          view.onActiveItemChanged(paneView.getActiveItem());
          _this.updateAllViews();
          _this.minimapViews[paneId] = view;
          _this.emit('minimap-view:created', {
            view: view
          });
          return paneView.model.on('destroyed', function() {
            view = _this.minimapViews[paneId];
            if (view != null) {
              _this.emit('minimap-view:will-be-destroyed', {
                view: view
              });
              view.destroy();
              delete _this.minimapViews[paneId];
              _this.emit('minimap-view:destroyed', {
                view: view
              });
              return _this.updateAllViews();
            }
          });
        };
      })(this));
    };

    return ViewManagement;

  })(Mixin);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FBUixDQUFBOztBQUFBLEVBQ0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxpQkFBUixDQURkLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUoscUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLDZCQUFBLFlBQUEsR0FBYyxFQUFkLENBQUE7O0FBQUEsNkJBR0EsY0FBQSxHQUFnQixTQUFBLEdBQUE7QUFDZCxVQUFBLHdCQUFBO0FBQUE7QUFBQTtXQUFBLFVBQUE7d0JBQUE7QUFBQSxzQkFBQSxJQUFJLENBQUMsbUJBQUwsQ0FBQSxFQUFBLENBQUE7QUFBQTtzQkFEYztJQUFBLENBSGhCLENBQUE7O0FBQUEsNkJBYUEsb0JBQUEsR0FBc0IsU0FBQyxVQUFELEdBQUE7YUFDcEIsSUFBQyxDQUFBLGtCQUFELHNCQUFvQixVQUFVLENBQUUsT0FBWixDQUFBLFVBQXBCLEVBRG9CO0lBQUEsQ0FidEIsQ0FBQTs7QUFBQSw2QkF1QkEsa0JBQUEsR0FBb0IsU0FBQyxRQUFELEdBQUE7YUFBYyxJQUFDLENBQUEsY0FBRCxvQkFBZ0IsUUFBUSxDQUFFLGNBQTFCLEVBQWQ7SUFBQSxDQXZCcEIsQ0FBQTs7QUFBQSw2QkFnQ0EsY0FBQSxHQUFnQixTQUFDLElBQUQsR0FBQTtBQUFVLE1BQUEsSUFBMEIsWUFBMUI7ZUFBQSxJQUFDLENBQUEsWUFBYSxDQUFBLElBQUksQ0FBQyxFQUFMLEVBQWQ7T0FBVjtJQUFBLENBaENoQixDQUFBOztBQUFBLDZCQW1DQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ1osVUFBQSxxQkFBQTtBQUFBO0FBQUEsV0FBQSxVQUFBO3dCQUFBO0FBQUEsUUFBQSxJQUFJLENBQUMsT0FBTCxDQUFBLENBQUEsQ0FBQTtBQUFBLE9BQUE7O2FBQ3lCLENBQUUsR0FBM0IsQ0FBQTtPQURBO2FBRUEsSUFBQyxDQUFBLFlBQUQsR0FBZ0IsR0FISjtJQUFBLENBbkNkLENBQUE7O0FBQUEsNkJBMENBLFdBQUEsR0FBYSxTQUFBLEdBQUE7YUFLWCxJQUFDLENBQUEsd0JBQUQsR0FBNEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFuQixDQUFnQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxRQUFELEdBQUE7QUFDMUQsY0FBQSxZQUFBO0FBQUEsVUFBQSxNQUFBLEdBQVMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUFBO0FBQUEsVUFDQSxJQUFBLEdBQVcsSUFBQSxXQUFBLENBQVksUUFBWixDQURYLENBQUE7QUFBQSxVQUVBLElBQUksQ0FBQyxtQkFBTCxDQUF5QixRQUFRLENBQUMsYUFBVCxDQUFBLENBQXpCLENBRkEsQ0FBQTtBQUFBLFVBR0EsS0FBQyxDQUFBLGNBQUQsQ0FBQSxDQUhBLENBQUE7QUFBQSxVQUtBLEtBQUMsQ0FBQSxZQUFhLENBQUEsTUFBQSxDQUFkLEdBQXdCLElBTHhCLENBQUE7QUFBQSxVQU1BLEtBQUMsQ0FBQSxJQUFELENBQU0sc0JBQU4sRUFBOEI7QUFBQSxZQUFDLE1BQUEsSUFBRDtXQUE5QixDQU5BLENBQUE7aUJBUUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFmLENBQWtCLFdBQWxCLEVBQStCLFNBQUEsR0FBQTtBQUM3QixZQUFBLElBQUEsR0FBTyxLQUFDLENBQUEsWUFBYSxDQUFBLE1BQUEsQ0FBckIsQ0FBQTtBQUVBLFlBQUEsSUFBRyxZQUFIO0FBQ0UsY0FBQSxLQUFDLENBQUEsSUFBRCxDQUFNLGdDQUFOLEVBQXdDO0FBQUEsZ0JBQUMsTUFBQSxJQUFEO2VBQXhDLENBQUEsQ0FBQTtBQUFBLGNBRUEsSUFBSSxDQUFDLE9BQUwsQ0FBQSxDQUZBLENBQUE7QUFBQSxjQUdBLE1BQUEsQ0FBQSxLQUFRLENBQUEsWUFBYSxDQUFBLE1BQUEsQ0FIckIsQ0FBQTtBQUFBLGNBSUEsS0FBQyxDQUFBLElBQUQsQ0FBTSx3QkFBTixFQUFnQztBQUFBLGdCQUFDLE1BQUEsSUFBRDtlQUFoQyxDQUpBLENBQUE7cUJBS0EsS0FBQyxDQUFBLGNBQUQsQ0FBQSxFQU5GO2FBSDZCO1VBQUEsQ0FBL0IsRUFUMEQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQyxFQUxqQjtJQUFBLENBMUNiLENBQUE7OzBCQUFBOztLQUYyQixNQUw3QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/brownlee/Documents/code/tools/dotfiles/bash/atom/packages/minimap/lib/mixins/view-management.coffee