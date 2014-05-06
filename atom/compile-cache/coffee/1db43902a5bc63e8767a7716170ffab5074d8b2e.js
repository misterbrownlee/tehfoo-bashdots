(function() {
  var $, Debug, EditorView, Emitter, MinimapEditorView, ScrollView, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), EditorView = _ref.EditorView, ScrollView = _ref.ScrollView, $ = _ref.$;

  Emitter = require('emissary').Emitter;

  Debug = require('prolix');

  module.exports = MinimapEditorView = (function(_super) {
    __extends(MinimapEditorView, _super);

    Emitter.includeInto(MinimapEditorView);

    Debug('minimap').includeInto(MinimapEditorView);

    MinimapEditorView.content = function() {
      return this.div({
        "class": 'minimap-editor editor editor-colors'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": 'scroll-view',
            outlet: 'scrollView'
          }, function() {
            return _this.div({
              "class": 'lines',
              outlet: 'lines'
            }, function() {
              return _this.div({
                "class": 'lines-wrapper'
              });
            });
          });
        };
      })(this));
    };

    MinimapEditorView.prototype.frameRequested = false;

    function MinimapEditorView() {
      this.update = __bind(this.update, this);
      this.registerBufferChanges = __bind(this.registerBufferChanges, this);
      MinimapEditorView.__super__.constructor.apply(this, arguments);
      this.bufferChanges = [];
    }

    MinimapEditorView.prototype.initialize = function() {
      this.lines.css('line-height', atom.config.get('editor.lineHeight') + 'em');
      return atom.config.observe('editor.lineHeight', (function(_this) {
        return function() {
          return _this.lines.css('line-height', atom.config.get('editor.lineHeight') + 'em');
        };
      })(this));
    };

    MinimapEditorView.prototype.destroy = function() {
      this.unsubscribe();
      return this.editorView = null;
    };

    MinimapEditorView.prototype.setEditorView = function(editorView) {
      this.editorView = editorView;
      this.unsubscribe();
      this.subscribeToBuffer();
      return this.update();
    };

    MinimapEditorView.prototype.subscribeToBuffer = function() {
      var buffer, tokenizedBuffer;
      buffer = this.editorView.getEditor().buffer;
      tokenizedBuffer = this.editorView.getEditor().displayBuffer.tokenizedBuffer;
      this.subscribe(buffer, 'changed', this.registerBufferChanges);
      return this.subscribe(buffer, 'contents-modified', this.update);
    };

    MinimapEditorView.prototype.registerBufferChanges = function(event) {
      return this.bufferChanges.push(event);
    };

    MinimapEditorView.prototype.update = function() {
      if (this.editorView == null) {
        return;
      }
      if (this.frameRequested) {
        return;
      }
      this.frameRequested = true;
      return webkitRequestAnimationFrame((function(_this) {
        return function() {
          _this.frameRequested = false;
          if (_this.bufferChanges.length > 0) {
            _this.updateMinimapWithBufferChanges();
          } else {
            _this.rebuildMinimap();
          }
          return _this.emit('minimap:updated');
        };
      })(this));
    };

    MinimapEditorView.prototype.updateMinimapWithBufferChanges = function() {
      var displayBuffer, newRange, newScreenRange, oldRange, oldScreenRange, _ref1;
      this.startBench();
      displayBuffer = this.editorView.getEditor().displayBuffer;
      while (this.bufferChanges.length > 0) {
        _ref1 = this.bufferChanges.shift(), newRange = _ref1.newRange, oldRange = _ref1.oldRange;
        newScreenRange = displayBuffer.screenRangeForBufferRange(newRange);
        oldScreenRange = displayBuffer.screenRangeForBufferRange(oldRange);
        this.deleteRowsAtRange(oldScreenRange);
        this.createRowsAtRange(newScreenRange);
        this.markIntermediateTime("update buffer change");
      }
      return this.endBench('complete update');
    };

    MinimapEditorView.prototype.deleteRowsAtRange = function(range) {
      var end, line, lines, linesWrapper, start, _i, _len, _results;
      linesWrapper = this.lines[0].childNodes[0];
      start = range.start.row;
      end = range.end.row;
      lines = Array.prototype.slice.call(linesWrapper.childNodes, start, end + 1 || 9e9);
      _results = [];
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        _results.push(linesWrapper.removeChild(line));
      }
      return _results;
    };

    MinimapEditorView.prototype.createRowsAtRange = function(range) {
      var end, i, line, lines, start, _i, _len, _results;
      start = range.start.row;
      end = range.end.row;
      lines = this.editorView.buildLineElementsForScreenRows(start, end);
      _results = [];
      for (i = _i = 0, _len = lines.length; _i < _len; i = ++_i) {
        line = lines[i];
        _results.push(this.insertLineAt(line, start + i));
      }
      return _results;
    };

    MinimapEditorView.prototype.insertLineAt = function(line, at) {
      var linesWrapper, refLine;
      linesWrapper = this.lines[0].childNodes[0];
      refLine = linesWrapper.childNodes[at];
      return linesWrapper.insertBefore(line, refLine);
    };

    MinimapEditorView.prototype.rebuildMinimap = function() {
      var child, lines, numLines, wrapper;
      this.startBench();
      lines = this.lines[0];
      if (lines != null) {
        child = lines.childNodes[0];
        if (child != null) {
          lines.removeChild(child);
        }
      }
      this.lines.css({
        fontSize: "" + (this.editorView.getFontSize()) + "px"
      });
      this.markIntermediateTime('cleaning');
      numLines = this.editorView.getModel().displayBuffer.getLines().length;
      lines = this.editorView.buildLineElementsForScreenRows(0, numLines);
      this.markIntermediateTime('lines building');
      wrapper = $('<div/>');
      wrapper.append(lines);
      this.lines.append(wrapper);
      return this.endBench('minimap update');
    };

    MinimapEditorView.prototype.getClientRect = function() {
      var sv;
      sv = this.scrollView[0];
      return {
        width: sv.scrollWidth,
        height: sv.scrollHeight
      };
    };

    return MinimapEditorView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtFQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBOEIsT0FBQSxDQUFRLE1BQVIsQ0FBOUIsRUFBQyxrQkFBQSxVQUFELEVBQWEsa0JBQUEsVUFBYixFQUF5QixTQUFBLENBQXpCLENBQUE7O0FBQUEsRUFDQyxVQUFXLE9BQUEsQ0FBUSxVQUFSLEVBQVgsT0FERCxDQUFBOztBQUFBLEVBRUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxRQUFSLENBRlIsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSix3Q0FBQSxDQUFBOztBQUFBLElBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsaUJBQXBCLENBQUEsQ0FBQTs7QUFBQSxJQUNBLEtBQUEsQ0FBTSxTQUFOLENBQWdCLENBQUMsV0FBakIsQ0FBNkIsaUJBQTdCLENBREEsQ0FBQTs7QUFBQSxJQUdBLGlCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxxQ0FBUDtPQUFMLEVBQW1ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ2pELEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxhQUFQO0FBQUEsWUFBc0IsTUFBQSxFQUFRLFlBQTlCO1dBQUwsRUFBaUQsU0FBQSxHQUFBO21CQUMvQyxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8sT0FBUDtBQUFBLGNBQWdCLE1BQUEsRUFBUSxPQUF4QjthQUFMLEVBQXNDLFNBQUEsR0FBQTtxQkFDcEMsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGdCQUFBLE9BQUEsRUFBTyxlQUFQO2VBQUwsRUFEb0M7WUFBQSxDQUF0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
//# sourceURL=/Users/brownlee/Documents/code/tools/dotfiles/bash/atom/packages/minimap/lib/minimap-editor-view.coffee