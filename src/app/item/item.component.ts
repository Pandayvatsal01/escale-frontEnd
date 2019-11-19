import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ItemService } from '../item.service';
import { Item } from '../item';

declare var M: any;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ItemService]
})
export class ItemComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.resetForm();
    this.getItemList();
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
    this.itemService.selectedItem = {
      _id:"",
      item_name:"",
      description:"",
      image_url:""
    }
  }

  onSubmit(form:NgForm){
    if(form.value._id==""){
    this.itemService.postItem(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.getItemList();
      M.toast({ html: 'saved successfully', classes: 'rounded'});
    });
  }
  else{
    this.itemService.putItem(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.getItemList();
      M.toast({ html: 'Updated successfully', classes: 'rounded'});
    });
  }
  }

getItemList(){
  this.itemService.getItems().subscribe((res)=>{
    this.itemService.items=res as Item[];
  });
}

onEdit(item: Item){
  this.itemService.selectedItem=item;
}

onDelete(_id: string, form: NgForm){
  if(confirm('Are you sure want to delete')==true){
    this.itemService.deleteItem(_id).subscribe((res)=>{
      this.getItemList();
      this.resetForm();
      M.toast({ html: 'Deleted successfully', classes: 'rounded'});
    })
  }
}

}
