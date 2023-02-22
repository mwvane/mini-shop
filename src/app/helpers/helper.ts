import { CartItem } from "../Model/cartItem";

export class Helper {
  static getItemById(id: number, array: any) {
    for (let item of array) {
      if (item.id === id) {
        return item;
      }
    }
    return null;
  }
  static getItemIndexById(id: number, array:any){
    if(array){
        for(let [index, item] of array.entries()){
            if(item.id === id){
                return index
            }
        }
        return -1
    }
  }
}
