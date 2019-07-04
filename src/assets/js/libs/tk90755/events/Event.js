 /**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.events.Event.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*


*/
export default class Event {

	constructor(type, origin, bubbles, cancelable) {
		if (type === null || type === undefined) {
			throw new Error("Have to set Event Type.");
		}
		this._type = type;
		this._origin = (origin) ? origin : null;
		this._bubbles = (typeof(bubbles) === 'boolean') ? bubbles : false;
    this._cancelable = (typeof(cancelable) === 'boolean') ? cancelable : false;
    this._currentTarget;

    this.flags;
    this.preventDefaults;
  }
  
  setFlag(flag){
    this.flags |= flag;
  };

  clearFlag(flag){
    if (hasFlag(flag)) {
      this.flags ^= flag;
    }
  };

  hasFlag(flag){
    return (this.flags & flag) == flag;
  };

  resetFlags(){
    this.flags = 0x00;
  };

  isDefaultPrevented() {
    return this.hasFlag(this.preventDefaults);
  };

  preventDefault() {
    if (_cancelable) {
      p.setFlag(this.preventDefaults);
    }
  };

  stopPropagation() {
    this.setFlag(_stopPropagation);
  };
    
  //__________________________________________________________________________________
  // getter & setter
  get currentTarget(){
    return this._currentTarget;
  }

  set currentTarget(currentTarget){
    this._currentTarget = currentTarget;
  }

  //__________________________________________________________________________________
  // getter
  get canPropagate(){
    return !this.hasFlag(_stopPropagation);
  }

  get bubbles(){
    return this._bubbles;
  }

  get cancelable(){
    return this._cancelable;
  }

  get origin(){
    return this._origin;
  }
  
  get type(){
    return this._type;
  }

	//event types
	static INIT(){ return "init" };
  static START(){ return "start" };
  static UPDATE(){ return "update" };
  static COMPLETE(){ return "complete" };

	static ERROR(){ return "error" };
	static IO_ERROR(){ return "ioError" };
  static SECURITY_ERROR(){ return "securityError" };
  
	static CHANGE(){ return "change" };
	static CANCEL(){ return "cancel" };
	static RENDER(){ return "render" };

	static RESIZE(){ return "resize" };
	static ENTER_FRAME(){ return "enterFrame" };
}