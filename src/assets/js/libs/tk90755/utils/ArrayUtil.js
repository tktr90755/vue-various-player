class ArrayUtil {
  constructor(){
    
  }

  copy($v){
		let arr = [];
		let l = $v.length;
		for (let i = 0; i < l; i++){
			arr[i] = $v[i];
		}
		return arr;
	};
}

export default new ArrayUtil();
