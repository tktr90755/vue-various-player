<template>
  <div>
    <SpriteSheetPlayer :jsonPath="jsonPath" :imagePath="imagePath"/>
  </div>
</template>

<script>
import SpriteSheetPlayer from '@/components/SpriteSheetPlayer.vue'

export default {
  props: {
    jsonPath: String,
    imagePath: String
  },
  name: 'app',
  components: {
    SpriteSheetPlayer
  },
  mounted(){
    
  }
}
</script>
<style scoped>
</style>
