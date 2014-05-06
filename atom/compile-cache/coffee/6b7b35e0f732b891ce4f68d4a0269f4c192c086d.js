(function() {
  var $, EditorView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, EditorView = _ref.EditorView;

  module.exports = function() {
    var FindResultsView, MinimapFindResultsView, findAndReplace, minimap, minimapInstance;
    findAndReplace = atom.packages.getLoadedPackage('find-and-replace');
    minimap = atom.packages.getLoadedPackage('minimap');
    minimapInstance = require(minimap.path);
    FindResultsView = require(findAndReplace.path + '/lib/find-results-view');
    return MinimapFindResultsView = (function(_super) {
      __extends(MinimapFindResultsView, _super);

      function MinimapFindResultsView() {
        return MinimapFindResultsView.__super__.constructor.apply(this, arguments);
      }

      MinimapFindResultsView.prototype.attach = function() {
        minimap = this.getMinimap();
        if (minimap != null) {
          minimap.miniOverlayer.append(this);
          return this.adjustResults();
        }
      };

      MinimapFindResultsView.prototype.adjustResults = function() {
        if (this.adjusted) {
          return;
        }
        this.css('-webkit-transform', "scale3d(" + (minimapInstance.getCharWidthRatio()) + ",1,1)");
        return this.adjusted = true;
      };

      MinimapFindResultsView.prototype.getMinimap = function() {
        var editorView;
        editorView = this.getEditor();
        if (editorView instanceof EditorView) {
          return minimapInstance.minimapForEditorView(editorView);
        }
      };

      MinimapFindResultsView.prototype.markersUpdated = function(markers) {
        var k, marker, _ref1, _results;
        MinimapFindResultsView.__super__.markersUpdated.call(this, markers);
        _ref1 = this.markerViews;
        _results = [];
        for (k in _ref1) {
          marker = _ref1[k];
          _results.push(marker.intersectsRenderedScreenRows = function() {
            return true;
          });
        }
        return _results;
      };

      return MinimapFindResultsView;

    })(FindResultsView);
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1CQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFrQixPQUFBLENBQVEsTUFBUixDQUFsQixFQUFDLFNBQUEsQ0FBRCxFQUFJLGtCQUFBLFVBQUosQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUEsR0FBQTtBQUNmLFFBQUEsaUZBQUE7QUFBQSxJQUFBLGNBQUEsR0FBaUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixrQkFBL0IsQ0FBakIsQ0FBQTtBQUFBLElBQ0EsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsU0FBL0IsQ0FEVixDQUFBO0FBQUEsSUFHQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUyxPQUFPLENBQUMsSUFBakIsQ0FIbEIsQ0FBQTtBQUFBLElBSUEsZUFBQSxHQUFrQixPQUFBLENBQVMsY0FBYyxDQUFDLElBQWYsR0FBc0Isd0JBQS9CLENBSmxCLENBQUE7V0FNTTtBQUNKLCtDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSx1Q0FBQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sUUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFWLENBQUE7QUFFQSxRQUFBLElBQUcsZUFBSDtBQUNFLFVBQUEsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUF0QixDQUE2QixJQUE3QixDQUFBLENBQUE7aUJBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBQSxFQUZGO1NBSE07TUFBQSxDQUFSLENBQUE7O0FBQUEsdUNBYUEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLFFBQUEsSUFBVSxJQUFDLENBQUEsUUFBWDtBQUFBLGdCQUFBLENBQUE7U0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLEdBQUQsQ0FBSyxtQkFBTCxFQUEyQixVQUFBLEdBQVMsQ0FBQSxlQUFlLENBQUMsaUJBQWhCLENBQUEsQ0FBQSxDQUFULEdBQThDLE9BQXpFLENBREEsQ0FBQTtlQUVBLElBQUMsQ0FBQSxRQUFELEdBQVksS0FIQztNQUFBLENBYmYsQ0FBQTs7QUFBQSx1Q0FrQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLFlBQUEsVUFBQTtBQUFBLFFBQUEsVUFBQSxHQUFhLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBYixDQUFBO0FBQ0EsUUFBQSxJQUFHLFVBQUEsWUFBc0IsVUFBekI7QUFDRSxpQkFBTyxlQUFlLENBQUMsb0JBQWhCLENBQXFDLFVBQXJDLENBQVAsQ0FERjtTQUZVO01BQUEsQ0FsQlosQ0FBQTs7QUFBQSx1Q0EyQkEsY0FBQSxHQUFnQixTQUFDLE9BQUQsR0FBQTtBQUNkLFlBQUEsMEJBQUE7QUFBQSxRQUFBLDJEQUFNLE9BQU4sQ0FBQSxDQUFBO0FBQ0E7QUFBQTthQUFBLFVBQUE7NEJBQUE7QUFDRSx3QkFBQSxNQUFNLENBQUMsNEJBQVAsR0FBc0MsU0FBQSxHQUFBO21CQUFHLEtBQUg7VUFBQSxFQUF0QyxDQURGO0FBQUE7d0JBRmM7TUFBQSxDQTNCaEIsQ0FBQTs7b0NBQUE7O09BRG1DLGlCQVB0QjtFQUFBLENBUGpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/brownlee/Documents/code/tools/dotfiles/bash/atom/packages/minimap-find-and-replace/lib/minimap-find-results-view.coffee