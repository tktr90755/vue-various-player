 /**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.events.EventDispatcher.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
var Event = tktr90755.events.Event;
var EventDispatcher = tktr90755.events.EventDispatcher;

var dispatcher = new EventDispatcher();
dispatcher.currentTarget = window;
dispatcher.name="dispatcher";

dispatcher.addEventListener('say1', function (event) {
    alert(event.type);
});
dispatcher.dispatchEvent(new Event('say1', window, true));

var testObject = function () {
    this.someVar = 1;
    this.dispatcher = new EventDispatcher(this, dispatcher);
};

var test = new testObject();
test.name="test";
test.dispatcher.addEventListener('say2', function (event) {
    alert(event.currentTarget.name + ":" + test.dispatcher.hasEventListener('say2'));
});

test.dispatcher.dispatchEvent(new Event('say2'));
test.dispatcher.queueEventDispatch('say2', new Event('say2', window));
test.dispatcher.deferEventDispatch(new Event('say2', window), 4000);
*/

export default class EventDispatcher {
  constructor() {
    this.queuedEvents = {};
    this.deferedEvents = [];
    this.listeners = {};
  }

  dispatchQueuedEvents(type) {
    if (this.queuedEvents.hasOwnProperty(type)) {
      if (this.queuedEvents.hasOwnProperty(type)) {
        let event;
        let eventsToDispatch = this.queuedEvents[type].slice(0);
        delete this.queuedEvents[type];
        while ((event = eventsToDispatch.pop())) {
          this.dispatchEvent(event);
        }
      }
    }
  };

  addEventListener(type, listener) {
    if(type === undefined){
      throw new Error("Event Class is not found.");
    }
    if (!this.listeners.hasOwnProperty(type)) {
      this.listeners[type] = [];
    }
    if (typeof(listener) == 'function') {
      this.listeners[type].push(listener);
    } else {
      throw new Error("Listener is not a function.");
    }
  };

  cancelDeferredEvents() {
    let deferedEvent;
    while ((deferedEvent = this.deferedEvents.pop())) {
      clearTimeout(deferedEvent);
    }
  };

  cancelQueuedEvents() {
    for (let evtName in this.queuedEvents) {
      if (this.queuedEvents.hasOwnProperty(evtName)) {
        delete this.queuedEvents[evtName];
      }
    }
  };

  deferEventDispatch(event, iMillis) {
    let index = this.deferedEvents.length;
    this.deferedEvents.push(setTimeout(()=> {
      this.dispatchEvent(event);
      this.deferedEvents.slice(index, 1);
    }, iMillis || 1000));
  };

  dispatchEvent(event) {
    event.currentTarget = this._currentTarget;
    if (this.listeners.hasOwnProperty(event.type)) {
      let lItr;
      let lCount;
      let listeners = this.listeners[event.type];
      let listener;
      for (lItr = 0, lCount = listeners.length; lItr < lCount; ++lItr){
        listener = listeners[lItr];
        listener(event);
      }
    }
    
    this.dispatchQueuedEvents(event.type);

    if (this.target !== null && event.bubbles === true && event.canPropagate === true) {
      this.target.dispatchEvent(event);
    }
  };

  getEventListeners(type) {
    if (this.hasEventListener(type)) {
      return this.listeners[type];
    }
    return [];
  };

  hasEventListener(type) {
    if (this.listeners.hasOwnProperty(type)) {
      if (this.listeners[type].length > 0) {
        return true;
      }
    }
    return false;
  };

  queueEventDispatch(trigger, event) {
    if (!this.queuedEvents.hasOwnProperty(trigger)) {
      this.queuedEvents[trigger] = [];
    }
    this.queuedEvents[trigger].push(event);
  };

  removeEventListener(type, listener) {
    if (this.listeners.hasOwnProperty(type)) {
      let lItr;
      let lCount;
      let listeners = this.listeners[type];
      for (lItr = 0, lCount = this.listeners.length; lItr < lCount; ++lItr) {
        if (listeners[lItr] === listener) {
          this.listeners[type].splice(lItr, 1);
          break;
        }
      }
    }
  };

  get currentTarget(){
    return this._currentTarget;
  }
  set currentTarget(value){
    this._currentTarget = (value) ? value : null;
  }
}