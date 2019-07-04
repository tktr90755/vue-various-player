 /**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.media.SvgPlayer.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
let svgPlayer = new SvgPlayer();
svgPlayer.speed = 1;
svgPlayer.dispatcher.addEventListener(Event.INIT, ()=>{
  console.log("Event.INIT")
  svgPlayer.play()
});
svgPlayer.dispatcher.addEventListener(Event.START, ()=>{
  console.log("Event.START")
});
svgPlayer.dispatcher.addEventListener(Event.RENDER, ()=>{
  console.log("Event.RENDER")
  this.$el.style.left = svgPlayer.point.x + "px";
  this.$el.style.top = svgPlayer.point.y + "px";
  this.$el.style.transform = 'rotate(' + svgPlayer.rotation + 'deg)';
});
svgPlayer.dispatcher.addEventListener(Event.COMPLETE, ()=>{
  console.log("Event.COMPLETE")
});
svgPlayer.load('test.svg', false)//第二引数をtrueにすると自動的にplay()する
*/
import SvgLoader from '@/assets/js/libs/tk90755/net/SvgLoader.js'
import Event from '@/assets/js/libs/tk90755/events/Event.js'
import Player from '@/assets/js/libs/tk90755/media/Player.js'
export default class SvgPlayer extends Player {

  constructor() {
    super();
    this._loader;
    this._svg;
    this._path;
    this._point;
    this.dispatcher.addEventListener(Event.RENDER, this.renderHandler);
  }

  //__________________________________________________________________________________
  // methods
  load(path, autoPlay){
    let callback=()=>{
      this.createSvg();
      this.renderInitEvent();
      if(autoPlay !== false) this.play();
    }
    this._loader = new SvgLoader(callback);
    this._loader.load(path);
  }

  kill(){
    this.dispatcher.removeEventListener(Event.RENDER, this.renderHandler);

    this.stop()
    super.kill()

    this._loader = null;
    this._svg = null;
    this._path = null;
    this._point = null;
    this._rotation = 0;
  }

  play(){
    super.play()
  }

  resume(){
    super.resume()
  }

  pause(){
    super.pause()
  }

  stop(){
    super.stop()
  }

  seek(seekTime){
    super.seek(seekTime)
  }
  
  //__________________________________________________________________________________
  // svg
  createSvg(){
    let i;
    let targets = String(this._loader.content).split('\n');
    let viewBoxTexts = '';
    let pathTexts = '';
    
    for(i in targets){
      let viewBoxPosition = String(targets[i].search('viewBox='));
      if(viewBoxTexts === '' && viewBoxPosition != -1){
        viewBoxTexts = String(targets[i]).substr(viewBoxPosition, String(targets[i]).length);
      }
    }
    if(viewBoxTexts != ''){
      viewBoxTexts = viewBoxTexts.split('viewBox=').join('');
      viewBoxTexts = viewBoxTexts.split('"').join('');
    }

    for(i in targets){
      if(pathTexts === '' && String(targets[i].search('<path'))!=-1){
        pathTexts = targets[i];
      }
    }

    if(pathTexts == '') return;
    pathTexts = pathTexts.split('<path ').join('');
    pathTexts = pathTexts.split('/>').join('');
    pathTexts = String(pathTexts).split(' ');

    let o = {};
    for(i in pathTexts){
      let data = String(pathTexts[i]).split('=');
      o[data[0]] = data[1].split('"').join('');
    }

    let xmlns = "http://www.w3.org/2000/svg";
    this._svg = document.createElementNS (xmlns, "svg");
    this._svg.setAttributeNS (null, "version", 1.1);
    this._svg.setAttributeNS (null, "id", "svg" + this.id);
    this._svg.setAttributeNS (null, "x", "0px");
    this._svg.setAttributeNS (null, "y", "0px");
    this._svg.setAttributeNS (null, "viewBox", viewBoxTexts);

    this._path = document.createElementNS(xmlns,"path");  
    this._path.setAttribute("id", "path" + this.id);
    if(o['fill'] !== undefined) this._path.setAttribute("fill", o['fill']);
    if(o['stroke'] !== undefined) this._path.setAttribute("stroke", o['stroke']);  
    if(o['stroke-miterlimit'] !== undefined) this._path.setAttribute("stroke-miterlimit", o['stroke-miterlimit']); 
    if(o['d'] !== undefined) this._path.setAttribute("d", o['d']);

    this._svg.appendChild(this._path);

    this.totalFrames = this._path.getTotalLength();
    this.currentFrame = 0;
  }
  //__________________________________________________________________________________
  // Event Handler
  renderHandler=()=>{
    this._point = this._path.getPointAtLength(this.currentFrame);
    let point2 = this._path.getPointAtLength((this.currentFrame == 0)?0:this.currentFrame-1);
    this._rotation = this._radian(this._point.x, this._point.y, point2.x, point2.y);
  }

  _radian($ax, $ay, $bx, $by){
    let dx = $ax - $bx;
    let dy = $ay - $by;
    let radian = Math.atan2(dy, dx);
    return radian * 180 / Math.PI;
  };

  //__________________________________________________________________________________
  // getter
  get loader(){
    return this._loader;
  }

  get svg(){
    return this._svg;
  }

  get path(){
    return this._path;
  }

  get point(){
    return this._point;
  }

  get rotation(){
    return this._rotation;
  }

}
