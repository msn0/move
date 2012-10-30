(function(){

  if (!Object.create) {
    Object.create = function (o) {
      if (arguments.length > 1) {
          throw new Error('Object.create implementation only accepts the first parameter.');
      }
      function F() {}
      F.prototype = o;
      return new F();
    };
  }

  var MovableElement = {

    init: function(elementToMove, handlerElement){
      this.elementToMove = elementToMove;
      this.handlerElement = handlerElement || elementToMove;
      this.x = 0;
      this.y = 0;
      this.movedX = 0;
      this.movedY = 0;
      this.addEvent(this.handlerElement, 'mousedown', this.bind(this, this.mouseDown), true);
      return this;
    },

    bind: function(scope, fn) {
      return function () {
        fn.apply(scope, arguments);
      };
    },

    getEvent: function(e){
      return e || window.event;
    },

    calculatePosition: function(e){
      if (e.pageY){
        this.x = e.pageX;
        this.y = e.pageY;
      }
      else {
        this.x = e.clientX;
        this.y = e.clientY;
      }
      return this;
    },

    setPosition: function(e){
      var diffX, diffY;
      this.movedX = e.pageX || e.clientX;
      this.movedY = e.pageY || e.clientY;
      diffX = this.x - this.movedX;
      diffY = this.y - this.movedY;
      this.calculatePosition(e);
      this.elementToMove.style.top = this.elementToMove.offsetTop - diffY + "px";
      this.elementToMove.style.left = this.elementToMove.offsetLeft - diffX + "px";
      return this;
    },

    addEvent: function(obj, eventType, eventHandler, useCapture) {
      useCapture || (useCapture = false);
      if (obj.addEventListener) {
        obj.addEventListener(eventType, eventHandler, true);
      } else if (obj.attachEvent) {
        obj.attachEvent('on' + eventType, eventHandler);
      }
    },

    getMouseUpHandler: function(){
      return this.mU;
    },
    
    getMouseMoveHandler: function(){
      return this.mM;
    },
    
    addDragEvents: function(){
      this.mU = this.bind(this, this.mouseUp);
      this.mM = this.bind(this, this.mouseMove);
      this.addEvent(document, "mouseup", this.mU, false);
      this.addEvent(document, "mousemove", this.mM, false);
      return this;
    },
    
    removeDragEvents: function(){
      this.removeEvent(document, "mouseup", this.getMouseUpHandler(), false);
      this.removeEvent(document, "mousemove", this.getMouseMoveHandler(), false);
      return this;
    },

    mouseDown: function(e){
      e = this.getEvent(e);
      e.preventDefault();
      this.handlerElement.style.cursor = "move";
      this.removeDragEvents();
      this.addDragEvents().calculatePosition(e);
      return false;
    },

    mouseUp: function(e){
      e = this.getEvent(e);
      this.handlerElement.style.cursor = "default";
      this.removeDragEvents();
      return false;
    },

    mouseMove: function(e){
      e = this.getEvent(e);
      this.setPosition(e);
      return false;
    },

    removeEvent: function(obj, eventType, eventHandler, useCapture) {
      useCapture || (useCapture = false);
      if (obj.removeEventListener) {
        obj.removeEventListener(eventType, eventHandler, true);
      } else if (obj.attachEvent) {
        obj.attachEvent('on' + eventType, eventHandler);
      }
    }
  };

  MovableElement.setMovableElement = function(elementToMove, handlerElement){
    return Object.create(MovableElement).init(elementToMove, handlerElement);
  };

  window.MovableElement = MovableElement;

})();