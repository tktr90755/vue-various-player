 /**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.net.Loader.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
/**
 * @class Loader
 */
import Event from '@/assets/js/libs/tk90755/events/Event.js'
import EventDispatcher from '@/assets/js/libs/tk90755/events/EventDispatcher.js'
export default class Loader extends EventDispatcher {

  constructor() {
    super();
    this._request;
    this._total = NaN;
    this._loaded = NaN;
    this._percent = NaN;
    this._request;
    this._content;
    this._callback = null;
    this.currentTarget = this;
  }

  //__________________________________________________________________________________
  // methods 
  load(){
    
  }

  kill(){

  }

  cancel(){

  }

  //__________________________________________________________________________________
  // Event Handler
  loaderInitHandler() {
    super.dispatchEvent(new Event(Event.INIT));
  };

  loaderProgressHandler() {
    super.dispatchEvent(new Event(Event.RENDER));
  };

  loaderCompleteHandler() {
    if(this._callback !== undefined || this._callback !== null){
      this._callback();
      this._callback = undefined;
    } 
    super.dispatchEvent(new Event(Event.COMPLETE));
  };

  loadIOErrorHandler() {
    super.dispatchEvent(new Event(Event.IO_ERROR));
  };

  loadSecurityHandler() {
    super.dispatchEvent(new Event(Event.SECURITY_ERROR));
  };

  //__________________________________________________________________________________
  // getter
  get request(){
    return this._request;
  }

  get total(){
    return this._total;
  }

  get loaded(){
    return this._loaded;
  }

  get percent(){
    return this._percent;
  }

  get content(){
    return this._content;
  }

  get callback(){
    return this._callback;
  }
  set callback(value){
    if(String(typeof(value)) === 'function'){
      this._callback = value;
    }else{
      console.log(value + ' is not function');
    }
  }
}
