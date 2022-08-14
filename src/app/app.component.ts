import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DilogComponent } from './Component/dilog/dilog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'Anglure13Crud';
  displayedColumns: string[] = ['productName', 'category','date', 'frshness','price', 'comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog, private api: ApiService){}
  ngOnInit(): void {
    this.getAllProduct();
  }
  openDialog() {
    this.dialog.open(DilogComponent, {
      width:'30%'
    });
  }
  getAllProduct(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while fetching the Record")
      }
    })
  }
  editProduct(row: any){
    this.dialog.open(DilogComponent,{
      width: '30%',
      data: row
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
