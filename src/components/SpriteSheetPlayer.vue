<template>
  <div>
    <div class="cont">
    </div>
  </div>
</template>

<script>
import SpriteSheetPlayer from '@/assets/js/libs/tk90755/media/SpriteSheetPlayer.js'
import Event from '@/assets/js/libs/tk90755/events/Event.js'

export default {
  props: {
    jsonPath: String,
    imagePath: String
  },
  mounted(){
    let container = this.$el;
    let child = this.$el.children[0];
    
    let player = new SpriteSheetPlayer();
    player.addEventListener(Event.INIT, ()=>{
      console.log("Event.INIT")

      child.style.backgroundImage = 'url("' + this.imagePath + '")';
      child.style.backgroundRepeat = 'no-repeat';

      var image = new Image();
      image.src = player.image;//使っているスプライトシートはこれ
      image.id = 'my-image';
      this.$el.append(image);
      
      //再生
      player.play();

      //TweenMaxの場合
      // player.percent = 0;
      // TweenMax.to(player,10.0,{ease:Expo.easeOut,percent:1});
    });
    player.addEventListener(Event.START, ()=>{
      console.log("Event.START")
    });
    player.addEventListener(Event.RENDER, ()=>{
      let x = player.x;
      let y = player.y;
      let w = player.width;
      let h = player.height;
      let paddingTop = player.spriteSourceSizeY;
      let marginLeft = player.spriteSourceSizeX;

      child.style.width = w + "px";
      child.style.height = h + "px";
      child.style.backgroundPosition = -x + 'px ' + -y + 'px';
      container.style.paddingTop = paddingTop + 'px'; 
      child.style.marginLeft = marginLeft + 'px';

      console.log("Event.RENDER: x:" + x + " y:" + y + " w:" + w + " h:" + h )
    });
    player.addEventListener(Event.COMPLETE, ()=>{
      console.log("Event.COMPLETE")
      player.play()
    });
    player.load(this.jsonPath, this.imagePath, false)//第二引数をtrueにすると自動的にplay()する
  }
}
</script>
<style scoped>
</style>
