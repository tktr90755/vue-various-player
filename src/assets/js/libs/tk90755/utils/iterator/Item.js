/*
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 */

//__________________________________________________________________________________
// How to use
/*


*/

export default class Item {
  constructor(content,name) {
    this._content = content;
		this._name = name;
  }

  //__________________________________________________________________________________
  // getter
  get content() { return this._content; };
  get name() { return this._name; };
}