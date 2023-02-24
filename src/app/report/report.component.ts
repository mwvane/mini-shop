import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Constants } from '../constants/constants';
import { AuthService } from '../service/auth.service';
import { ItemService } from '../service/product.service';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  selectedDate: Date;
  @ViewChild('dt1') table;
  constructor(
    private productService: ItemService,
    private filterService: FilterService
  ) {}
  
  ngOnInit(): void {
    this.loadData()
    this.addCustomFilters();
  }
  data: any = [];

  formatDate(date: Date, format = 'LLL') {
    return moment(date).format(format);
  }

  loadData(){
    this.data = this.productService
    .getAllOrders()
    .subscribe((data) => {
      if (data.res) {
        this.data = data.res;
      }
    });
  }

  addCustomFilters() {
    this.filterService.register('filterDate', (value, filter) => {
      if(!filter){
        return true
      }
      if(this.formatDate(value,"L") === this.formatDate(filter,"L") ){
        return true
      }
      return false
    });
  }

  onDateFilterClear(e:any,table:any){
    e.inputFieldValue = ""
    table.clear()
  }
  
}
