import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import{ MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dilog',
  templateUrl: './dilog.component.html',
  styleUrls: ['./dilog.component.scss']
})
export class DilogComponent implements OnInit {
  freshnessList=["Brand New","Second Hand","Refurbished"]
  productFrom!: FormGroup;
  actionBtn: string ="save"
  constructor(private frombuilder: FormBuilder,
     @Inject(MAT_DIALOG_DATA) public editData : any,
    private api: ApiService, private dialogref: MatDialogRef<DilogComponent> ) { }
  
  ngOnInit(): void {
    this.productFrom = this.frombuilder.group({
      productName:['', Validators.required],
      category: ['', Validators.required],
      frshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    })
    if(this.editData){
      this.actionBtn = "Update";
      this.productFrom.controls['productName'].setValue(this.editData.productName);
      this.productFrom.controls['category'].setValue(this.editData.category);
      this.productFrom.controls['frshness'].setValue(this.editData.frshness);
      this.productFrom.controls['price'].setValue(this.editData.price);
      this.productFrom.controls['comment'].setValue(this.editData.comment);
      this.productFrom.controls['date'].setValue(this.editData.date);
    }
  }
  addProduct(){
    if(!this.editData){
      if(this.productFrom.valid){
        this.api.postProduct(this.productFrom.value)
        .subscribe({next:(res)=>{
          alert("Product added successfully");
          this.productFrom.reset();
          this.dialogref.close('save');
        },
        error:()=>{
          alert("Error while adding the product")
        }
        
      })
       }

    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productFrom.value,this.editData.id)
    .subscribe({
      next: (res)=>{
        alert("Product Update Successfully")
        this.productFrom.reset();
        this.dialogref.close();
      },
      error:()=>{
        alert("Product Not Update");
      }
    })
  }
}
