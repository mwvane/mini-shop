import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../Model/item';
import { faCartShopping, faPen, faRemove, faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item: any;
  @Input() role: string = 'user'
  @Output() addToCart = new EventEmitter();
  @Output() editItem = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<number>();
  @Output() addItem = new EventEmitter<number>();
  cartIcon = faCartShopping;
  editIcon = faPen
  removeIcon = faRemove
  addIcon = faPlus
  onAddToCart(e:any) {
    e.stopPropagation();
      e.preventDefault();
    if(this.item.quantity){
      this.addToCart.emit();
    }
    else{
      alert("პროდუქტის მარაგი ამოიწურა")
    }
  }
  onRemove(e:any){
    e.stopPropagation();
    e.preventDefault();
    if(this.role === 'admin'){
      this.removeItem.emit(this.item.id)
    }
  }
  onEdit(){
    if(this.role === 'admin'){
      this.editItem.emit(this.item.id)
    }
  }
}
