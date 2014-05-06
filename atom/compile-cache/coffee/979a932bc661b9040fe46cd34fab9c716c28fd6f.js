(function() {
  var $, CONFIGS, Debug, MinimapEditorView, MinimapIndicator, MinimapView, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View;

  MinimapEditorView = require('./minimap-editor-view');

  MinimapIndicator = require('./minimap-indicator');

  Debug = require('prolix');

  CONFIGS = require('./config');

  module.exports = MinimapView = (function(_super) {
    __extends(MinimapView, _super);

    Debug('minimap').includeInto(MinimapView);

    MinimapView.content = function() {
      return this.div({
        "class": 'minimap'
      }, (function(_this) {
        return function() {
          return _this.div({
            outlet: 'miniWrapper',
            "class": "minimap-wrapper"
          }, function() {
            _this.div({
              outlet: 'miniUnderlayer',
              "class": "minimap-underlayer"
            });
            _this.subview('miniEditorView', new MinimapEditorView());
            return _this.div({
              outlet: 'miniOverlayer',
              "class": "minimap-overlayer"
            }, function() {
              return _this.div({
                outlet: 'miniVisibleArea',
                "class": "minimap-visible-area"
              });
            });
          });
        };
      })(this));
    };

    MinimapView.prototype.configs = {};

    MinimapView.prototype.isClicked = false;

    function MinimapView(paneView) {
      this.paneView = paneView;
      this.onDragEnd = __bind(this.onDragEnd, this);
      this.onMove = __bind(this.onMove, this);
      this.onDragStart = __bind(this.onDragStart, this);
      this.onScrollViewResized = __bind(this.onScrollViewResized, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.onMouseWheel = __bind(this.onMouseWheel, this);
      this.onActiveItemChanged = __bind(this.onActiveItemChanged, this);
      this.updateScroll = __bind(this.updateScroll, this);
      this.updateScrollX = __bind(this.updateScrollX, this);
      this.updateScrollY = __bind(this.updateScrollY, this);
      this.updateMinimapView = __bind(this.updateMinimapView, this);
      this.updateMinimapEditorView = __bind(this.updateMinimapEditorView, this);
      MinimapView.__super__.constructor.apply(this, arguments);
      this.scaleX = 0.2;
      this.scaleY = this.scaleX * 0.8;
      this.minimapScale = this.scale(this.scaleX, this.scaleY);
      this.miniScrollView = this.miniEditorView.scrollView;
      this.transform(this.miniWrapper[0], this.minimapScale);
      this.isPressed = false;
      this.offsetLeft = 0;
      this.offsetTop = 0;
      this.indicator = new MinimapIndicator();
    }

    MinimapView.prototype.initialize = function() {
      var themeProp;
      this.on('mousewheel', this.onMouseWheel);
      this.on('mousedown', this.onMouseDown);
      this.on('mousedown', '.minimap-visible-area', this.onDragStart);
      this.subscribe(this.paneView.model.$activeItem, this.onActiveItemChanged);
      this.subscribe(this.miniEditorView, 'minimap:updated', this.updateMinimapView);
      this.subscribe($(window), 'resize:end', this.onScrollViewResized);
      themeProp = 'minimap.theme';
      return this.subscribe(atom.config.observe(themeProp, {
        callNow: true
      }, (function(_this) {
        return function() {
          var _ref1;
          _this.configs.theme = (_ref1 = atom.config.get(themeProp)) != null ? _ref1 : CONFIGS.theme;
          return _this.updateTheme();
        };
      })(this)));
    };

    MinimapView.prototype.destroy = function() {
      this.off();
      this.unsubscribe();
      this.deactivatePaneViewMinimap();
      this.miniEditorView.destroy();
      return this.remove();
    };

    MinimapView.prototype.attachToPaneView = function() {
      return this.paneView.append(this);
    };

    MinimapView.prototype.detachFromPaneView = function() {
      return this.detach();
    };

    MinimapView.prototype.activatePaneViewMinimap = function() {
      this.paneView.addClass('with-minimap');
      return this.attachToPaneView();
    };

    MinimapView.prototype.deactivatePaneViewMinimap = function() {
      this.paneView.removeClass('with-minimap');
      return this.detachFromPaneView();
    };

    MinimapView.prototype.activeViewSupportMinimap = function() {
      return this.getEditor() != null;
    };

    MinimapView.prototype.minimapIsAttached = function() {
      return this.paneView.find('.minimap').length === 1;
    };

    MinimapView.prototype.storeActiveEditor = function() {
      this.editorView = this.getEditorView();
      this.editor = this.editorView.getEditor();
      this.unsubscribeFromEditor();
      this.scrollView = this.editorView.scrollView;
      this.scrollViewLines = this.scrollView.find('.lines');
      return this.subscribeToEditor();
    };

    MinimapView.prototype.unsubscribeFromEditor = function() {
      if (this.editor != null) {
        this.unsubscribe(this.editor, '.minimap');
      }
      if (this.scrollView != null) {
        return this.unsubscribe(this.scrollView, '.minimap');
      }
    };

    MinimapView.prototype.subscribeToEditor = function() {
      this.subscribe(this.editor, 'screen-lines-changed.minimap', this.updateMinimapEditorView);
      this.subscribe(this.editor, 'scroll-top-changed.minimap', this.updateScrollY);
      return this.subscribe(this.scrollView, 'scroll.minimap', this.updateScrollX);
    };

    MinimapView.prototype.getEditorView = function() {
      return this.paneView.viewForItem(this.activeItem);
    };

    MinimapView.prototype.getEditorViewClientRect = function() {
      return this.scrollView[0].getBoundingClientRect();
    };

    MinimapView.prototype.getScrollViewClientRect = function() {
      return this.scrollViewLines[0].getBoundingClientRect();
    };

    MinimapView.prototype.getMinimapClientRect = function() {
      return this[0].getBoundingClientRect();
    };

    MinimapView.prototype.getEditor = function() {
      return this.paneView.model.getActiveEditor();
    };

    MinimapView.prototype.setMinimapEditorView = function() {
      return setImmediate((function(_this) {
        return function() {
          return _this.miniEditorView.setEditorView(_this.editorView);
        };
      })(this));
    };

    MinimapView.prototype.updateTheme = function() {
      return this.attr({
        'data-theme': this.configs.theme
      });
    };

    MinimapView.prototype.updateMinimapEditorView = function() {
      return this.miniEditorView.update();
    };

    MinimapView.prototype.updateMinimapView = function() {
      var editorViewRect, evh, evw, height, miniScrollViewRect, msvh, msvw, width, _ref1;
      if (!this.editorView) {
        return;
      }
      if (!this.indicator) {
        return;
      }
      this.offset({
        top: (this.offsetTop = this.editorView.offset().top)
      });
      _ref1 = this.getMinimapClientRect(), width = _ref1.width, height = _ref1.height;
      editorViewRect = this.getEditorViewClientRect();
      miniScrollViewRect = this.miniEditorView.getClientRect();
      width /= this.scaleX;
      height /= this.scaleY;
      evw = editorViewRect.width;
      evh = editorViewRect.height;
      this.miniWrapper.css({
        width: width
      });
      this.miniVisibleArea.css({
        width: this.indicator.width = width,
        height: this.indicator.height = evh
      });
      msvw = miniScrollViewRect.width || 0;
      msvh = miniScrollViewRect.height || 0;
      this.indicator.setWrapperSize(width, Math.min(height, msvh));
      this.indicator.setScrollerSize(msvw, msvh);
      this.indicator.updateBoundary();
      return setImmediate((function(_this) {
        return function() {
          return _this.updateScroll();
        };
      })(this));
    };

    MinimapView.prototype.updateScrollY = function(top) {
      var overlayY, overlayerOffset, scrollViewOffset;
      if (top != null) {
        overlayY = top;
      } else {
        scrollViewOffset = this.scrollView.offset().top;
        overlayerOffset = this.scrollView.find('.overlayer').offset().top;
        overlayY = -overlayerOffset + scrollViewOffset;
      }
      this.indicator.setY(overlayY);
      return this.updatePositions();
    };

    MinimapView.prototype.updateScrollX = function() {
      this.indicator.setX(this.scrollView[0].scrollLeft);
      return this.updatePositions();
    };

    MinimapView.prototype.updateScroll = function() {
      this.updateScrollX();
      return this.updateScrollY();
    };

    MinimapView.prototype.updatePositions = function() {
      this.transform(this.miniVisibleArea[0], this.translate(this.indicator.x, this.indicator.y));
      return this.transform(this.miniWrapper[0], this.minimapScale + this.translate(this.indicator.scroller.x, this.indicator.scroller.y));
    };

    MinimapView.prototype.onActiveItemChanged = function(item) {
      if (item === this.activeItem) {
        return;
      }
      this.activeItem = item;
      if (this.activeViewSupportMinimap()) {
        this.log('minimap is supported by the current tab');
        if (!this.minimapIsAttached()) {
          this.activatePaneViewMinimap();
        }
        this.storeActiveEditor();
        this.setMinimapEditorView();
        return this.updateMinimapView();
      } else {
        this.deactivatePaneViewMinimap();
        return this.log('minimap is not supported by the current tab');
      }
    };

    MinimapView.prototype.onMouseWheel = function(e) {
      var wheelDeltaX, wheelDeltaY, _ref1;
      if (this.isClicked) {
        return;
      }
      _ref1 = e.originalEvent, wheelDeltaX = _ref1.wheelDeltaX, wheelDeltaY = _ref1.wheelDeltaY;
      if (wheelDeltaX) {
        this.editorView.scrollLeft(this.editorView.scrollLeft() - wheelDeltaX);
      }
      if (wheelDeltaY) {
        return this.editorView.scrollTop(this.editorView.scrollTop() - wheelDeltaY);
      }
    };

    MinimapView.prototype.onMouseDown = function(e) {
      var top, y;
      this.isClicked = true;
      e.preventDefault();
      e.stopPropagation();
      y = e.pageY - this.offsetTop;
      top = this.indicator.computeFromCenterY(y / this.scaleY);
      this.editorView.scrollTop(top);
      return setTimeout((function(_this) {
        return function() {
          return _this.isClicked = false;
        };
      })(this), 377);
    };

    MinimapView.prototype.onScrollViewResized = function() {
      return this.updateMinimapView();
    };

    MinimapView.prototype.onDragStart = function(e) {
      if (e.which !== 1) {
        return;
      }
      this.isPressed = true;
      this.on('mousemove.visible-area', this.onMove);
      return this.on('mouseup.visible-area', this.onDragEnd);
    };

    MinimapView.prototype.onMove = function(e) {
      if (this.isPressed) {
        return this.onMouseDown(e);
      }
    };

    MinimapView.prototype.onDragEnd = function(e) {
      this.isPressed = false;
      return this.off('.visible-area');
    };

    MinimapView.prototype.scale = function(x, y) {
      if (x == null) {
        x = 1;
      }
      if (y == null) {
        y = 1;
      }
      return "scale(" + x + ", " + y + ") ";
    };

    MinimapView.prototype.translate = function(x, y) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      return "translate3d(" + x + "px, " + y + "px, 0)";
    };

    MinimapView.prototype.transform = function(el, transform) {
      return el.style.webkitTransform = el.style.transform = transform;
    };

    return MinimapView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtFQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBWSxPQUFBLENBQVEsTUFBUixDQUFaLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQUFKLENBQUE7O0FBQUEsRUFFQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsdUJBQVIsQ0FGcEIsQ0FBQTs7QUFBQSxFQUdBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSxxQkFBUixDQUhuQixDQUFBOztBQUFBLEVBSUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxRQUFSLENBSlIsQ0FBQTs7QUFBQSxFQU1BLE9BQUEsR0FBVSxPQUFBLENBQVEsVUFBUixDQU5WLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7QUFBQSxJQUFBLEtBQUEsQ0FBTSxTQUFOLENBQWdCLENBQUMsV0FBakIsQ0FBNkIsV0FBN0IsQ0FBQSxDQUFBOztBQUFBLElBRUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sU0FBUDtPQUFMLEVBQXVCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3JCLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE1BQUEsRUFBUSxhQUFSO0FBQUEsWUFBdUIsT0FBQSxFQUFPLGlCQUE5QjtXQUFMLEVBQXNELFNBQUEsR0FBQTtBQUNwRCxZQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE1BQUEsRUFBUSxnQkFBUjtBQUFBLGNBQTBCLE9BQUEsRUFBTyxvQkFBakM7YUFBTCxDQUFBLENBQUE7QUFBQSxZQUNBLEtBQUMsQ0FBQSxPQUFELENBQVMsZ0JBQVQsRUFBK0IsSUFB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
//# sourceURL=/Users/brownlee/Documents/code/tools/dotfiles/bash/atom/packages/minimap/lib/minimap-view.coffee