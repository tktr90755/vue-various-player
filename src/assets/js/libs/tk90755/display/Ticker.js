/**
 * requestAnimationFrame
 */
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame){
    window.requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame){
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());

class Ticker {
  constructor(){
    this.renderId = undefined;
    this._interval = 0;
    this._count = 0;
    this.items = {};
  }

  add(item , id, debug){
		if (this.items[id] == undefined)
		{
			this.items[id] = item;
		}
		else
		{
			if(debug === true) console.log("【Ticker Error】" + id + "というインスタンス名は" + this.items[id] + "において使用されています。");
    }
    if(Object.keys(this.items).length !== 0){
      this.renderId = window.requestAnimationFrame(() => {this._render()});
    }
  }

  kill(id , debug){
    if ( this.items[id] )
    {
      delete this.items[id];
    }
    else
    {
      if(debug === true) console.log("【Ticker Error】" + id + "というインスタンスはリストに登録されていません。");
    }
    if(Object.keys(this.items).length === 0){
      window.cancelAnimationFrame(this.renderId);
      this.renderId = undefined;
      this.items = {};
    }
  }

  killAll(){
		for (let i in this.items)
		{
			delete this.items[i];
    }
    this.items = {};

    if(this.renderId != undefined){
      window.cancelAnimationFrame(this.renderId);
      this.renderId = undefined;
    }
  }

	hasItem( id ){
		return this.items[id] != undefined;
  }
  
  get( id ){
    return this.items[id]
  }

  interval(value){
    this._interval = Math.max(0, value);
  }

  _render(){

    this._count++;
    if(this._count > this._interval){
      for (let i in this.items)
      {
        this.items[i]();
      }
      this._count = 0;
    }

    if(Object.keys(this.items).length >= 1){
      window.cancelAnimationFrame(this.renderId);
      this.renderId = window.requestAnimationFrame(() => {
        this._render()
      });
    }
	}
}

export default new Ticker();
