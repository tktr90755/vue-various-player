/**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.media.Player.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
/**
 * @class Player
 */
import Event from '@/assets/js/libs/tk90755/events/Event.js'
import EventDispatcher from '@/assets/js/libs/tk90755/events/EventDispatcher.js'
import Ticker from '@/assets/js/libs/tk90755/display/Ticker.js'
export default class Player extends EventDispatcher{

  constructor() {
    super();
    this._id = new Date().getTime().toString(16)  + Math.floor(1000000 * Math.random()).toString(16);
    this._totalFrames = NaN;
    this._currentFrame = 0;
    this._percent = 0;
    this._speed = 0.1;
    this.currentTarget = this;
  }

  //__________________________________________________________________________________
  // methods 
  load(){
    
  }

  kill(){
    Ticker.kill('play_' + this._id, false)
    this._content = null;
    this._totalFrames = NaN;
    this._currentFrame = NaN;
    this._percent = NaN;
    this._speed = NaN;
    this.currentTarget = null;
  }

  play(){
    this._currentFrame = 0;
    this.setPercent();
    this.renderStartEvent()
    Ticker.add(this._render, 'play_' + this._id, false)
  }

  resume(){
    Ticker.add(this._render, 'play_' + this._id, false)
  }

  pause(){
    Ticker.kill('play_' + this._id, false)
  }

  stop(){
    Ticker.kill('play_' + this._id, false)
    this._currentFrame = 0;
    this.setPercent();
    this.renderCompleteEvent()
  }

  seek(seekTime, autoPlay){
    this._currentFrame = seekTime;
    this.setPercent();
    if(autoPlay === true) this.resume()
  }

  _render=()=>{
    if(
       isNaN(this._totalFrames) === true ||
       isNaN(this._currentFrame) === true ||
       isNaN(this._percent) === true
      ){
      this.stop()
    }else if(this._percent >= 1){
      this.stop()
    }else{
      this.setPercent();
      this.renderingEvent();
      if(this._speed != 0 ) this.currentFrame = this.currentFrame + this._speed;
    }
  }

  setPercent(){
    if( isNaN(this._totalFrames) === false && isNaN(this._currentFrame) === false ){
      this._percent = this._currentFrame / this._totalFrames;
    }
  }

  //__________________________________________________________________________________
  // Event Handler
  renderInitEvent() {
    super.dispatchEvent(new Event(Event.INIT));
  };

  renderStartEvent() {
    super.dispatchEvent(new Event(Event.START));
  };

  renderingEvent() {
    super.dispatchEvent(new Event(Event.RENDER));
  };

  renderCompleteEvent() {
    super.dispatchEvent(new Event(Event.COMPLETE));
  };

  //__________________________________________________________________________________
  // getter / setter
  get id(){
    return this._id;
  }

  get totalFrames(){
    return this._totalFrames;
  }
  set totalFrames(value){
    this._totalFrames = value;
    this.setPercent();
  }

  get currentFrame(){
    return this._currentFrame;
  }
  set currentFrame(value){
    this._currentFrame = value;
    this.setPercent();
  }

  get percent(){
    return this._percent;
  }
  set percent(value){
    value = Math.min(value, 1)
    this._currentFrame = value * this._totalFrames;
    this._percent = value;
    if(value !== 1){
      this.renderingEvent();
    }else{
      this.stop();
    }
  }

  get speed(){
    return this._speed;
  }
  set speed(value){
    this._speed = value;
  }

  get content(){
    return this._content;
  }
}
