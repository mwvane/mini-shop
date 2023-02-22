import { CartItem } from "../Model/cartItem";

export class Helper {
  public static getItemById(id: number, array: any) {
    for (let item of array) {
      if (item.id === id) {
        return item;
      }
    }
    return null;
  }
  public static getItemIndexById(id: number, array:any){
    if(array){
        for(let [index, item] of array.entries()){
            if(item.id === id){
                return index
            }
        }
        return -1
    }
  }
  public static  getDateAfter(days: number) {
    let dateNow = new Date();
    let newdate = new Date();
    newdate.setDate(dateNow.getDate() + days);
    return newdate;
  }
}
