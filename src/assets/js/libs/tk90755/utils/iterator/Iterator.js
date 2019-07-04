 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 */

//__________________________________________________________________________________
// How to use
/*
import Item from '@/assets/js/libs/tk90755/utils/iterator/Item.js'
import Iterator from '@/assets/js/libs/tk90755/utils/iterator/Iterator.js'

var iIterator = new Iterator();
iIterator.addItem(new Item(function() { console.log("mc0"); }, "mc0"));
iIterator.addItem(new Item(function() { console.log("mc1"); }, "mc1"));
iIterator.addItem(new Item(function() { console.log("mc2"); }, "mc2"));
iIterator.addItem(new Item(function() { console.log("mc3"); }, "mc3"));
iIterator.addItem(new Item(function() { console.log("mc4"); }, "mc4"));
iIterator.addItem(new Item(function() { console.log("mc5"); }, "mc5"));
console.log("fastName:"+iIterator.fast().name());
console.log("lastName:"+iIterator.last().name());
setInterval(function(){
	// console.log("random:"+iIterator.random().name());
	console.log("shuffle:"+iIterator.shuffle().name());
}, 100);
*/

import ArrayUtil from '@/assets/js/libs/tk90755/utils/ArrayUtil.js'

export default class Iterator {
  constructor() {
    this._list= [];
    this._index = 0;
    this.shuffleList = undefined;
    this.shuffleCount = NaN;
  }

  //__________________________________________________________________________________
  //  hasNext 次のItem存在するかどうか
  hasNext(){
    let judge = this._index >= this._list.length - 1;
    return !judge;
  }

  //__________________________________________________________________________________
  //  hasPrev 一つ前のItem存在するかどうか
  hasPrev(){
    let judge = this._index < 1;
    return !judge;
  }

  //__________________________________________________________________________________
  //  hasFast 最初のItem存在するかどうか
  hasFast(){
    let judge = this._list[0] == undefined;
    return !judge;
  }

  //__________________________________________________________________________________
  //  hasLast 最後のItem存在するかどうか
  hasLast(){
    let judge = this._list[this._list.length - 1] == undefined;
    return !judge;
  }

  //__________________________________________________________________________________
  //  hasPickup  チョイスしたItemが存在するかどうか
  /**
   * @param	index 		存在を確認したいItemの番号
   */
  hasPickup(index){
    let judge = this._index[index] == undefined;
    return !judge;
  }
  
  //__________________________________________________________________________________
  //  next 次へ進む
  next(){
    this._index++;
    return this.getItemAt(this._index);
  }
  
  //__________________________________________________________________________________
  //  prev 前へ進む
  prev(){
    this._index--;
    return this.getItemAt(this._index);
  }

  //__________________________________________________________________________________
  //  pickup
  /**
   * @param	index 		取り出したいItemの番号
   */
  pickup(index){
    this._index = index;
    return this.getItemAt(index);
  }
  
  //__________________________________________________________________________________
  //  fast 最初のItemを取得
  fast(){ 
    this._index = 0;
    return this._list[0]; 
  };

  //__________________________________________________________________________________
  //  last 最後のItemを取得
  last(){ 
    this._index = this._list.length - 1;
    return this.pickup(this._list.length - 1); 
  };
  
  //__________________________________________________________________________________
  //  random	shuffleとの違いは連続して同じ物が出る事があるということ(0->2->2->3とかね)
  random(){ 
    let r = Math.random() * this._list.length;
    return this.pickup(Math.floor(r)); 
  };

  //__________________________________________________________________________________
  //  shuffle	randomとの違いは連続して同じ物が出ないということ
  /**
   * @param	init 		シャッフル開始時のコールバック
   * @param	update 		シャッフル中のコールバック
   * @param	complete 	シャッフル終了時のコールバック
   */
  shuffle(init, update, complete){
    let i;
    let l;
    let clone;
    
    if (this.shuffleList === undefined){
      if (init !== undefined && typeof(init) === 'function') init();
      this.shuffleCount = 0;
      this.shuffleList = [];
      clone = ArrayUtil.copy(this._list);
      l = clone.length;
      for (i = 0; i < l; i++){
        let r = Math.random() * clone.length;
        this.shuffleList[i] = clone[Math.floor(r)];
        clone.splice(r, 1);
      }
    }

    let targetItem = this.shuffleList[this.shuffleCount];
    if (update !== undefined && typeof(update) === 'function') update(targetItem);
    if (this.shuffleCount >= this.length - 1){
      if (complete !== undefined && typeof(complete) === 'function') complete();
      this.shuffleCount = -1;
      this.shuffleList = undefined;
    }
    this.shuffleCount++;
    let currentCount = 0;
    l = this._list.length;
    for (i = 0; i < l; i++){
      if (targetItem === this._list[i]){
        currentCount = i;
      }
    }
    return this.pickup(currentCount);
  }
  
  killShuffle(){
    this.shuffleList = undefined;
  }
  
  //__________________________________________________________________________________
  // アイテムを追加
  /**
   * @param	item 		追加したいItem
   */
  addItem(item){
    this.killShuffle();//追加したらシャッフルメソッドを初期化
    this._list[this._list.length] = item;
  }
  
  //__________________________________________________________________________________
  // アイテムを削除
  /**
   * @param	item 		削除したいItem
   */
  killItem(name){
    let l = this._list.length;
    let isKilled = false;
    for (let i = 0; i < l; i++) 
    {
      if (!isKilled)
      {
        let tmpItem = this._list[i];
        if (tmpItem.name() == name)
        {
          isKilled = true;
          console.log("listからID[ " + tmpItem.name() + " ]の要素を削除しました。");
          this._list.splice(i, 1);
          //killしたらカウントは初期値に戻る
          this._index = 0;
          this.killShuffle();//削除したらシャッフルメソッドを初期化
        }
      }
    }
    if (!isKilled) console.log("指定したID[ " + name + " ]はlistに存在しませんでした。" );
  }

  //__________________________________________________________________________________
  // アイテムを全削除
  allKillItem(){
    this._list = [];
    //killしたらカウントは初期値に戻る
    this._index = 0;
    this.killShuffle();//削除したらシャッフルメソッドを初期化
  }
    
  //__________________________________________________________________________________
  // アイテムを取得するだけ
  /**
   * @param	index 
   */
  getItemAt(index) { return this._list[index]; };
  
  //__________________________________________________________________________________
  // 現在のアイテムを取得
  currentItem() { return this._list[this._index]; };
    
  //__________________________________________________________________________________
  // 
  // 格納しているリストの長さ
  get length() { return this._list.length; };
  
  //__________________________________________________________________________________
  // 格納しているリストそのもの
  get list() { return this._list; };
  
  //__________________________________________________________________________________
  // 現在のインデックス
  get index() { return this._index; };
}