import { DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../../models/product';
import { Router } from '@angular/router';
import { ProductServiceService } from './../../product-service.service';
import { CategoriesService } from './../../categories.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{
  productList : any[];
  productTemp:Product[] = [];
  subscription: Subscription;
  tableResource:DataTableResource<Product>;
  temp:Product;
  items: Product[] = [];
  itemCount: number; 

  constructor(private service:ProductServiceService,private router:Router) { 

    this.subscription = this.service.getAll().subscribe(products => 
      {
        this.productList = products;
        this.productList.filter(p => 
          {
            this.productTemp.push(p.payload.val());
            this.temp = this.productTemp.find(i => i.title === p.payload.val().title);
            this.temp.key = p.key;
          });
        this.initializeTable(this.productTemp);
      });

     
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }

  ngOnInit(){
 
  }



  delete(prodId)
  {
    if(confirm("Are you sure you want to delete?"))
    {
    this.service.delete(prodId);
    }
    this.router.navigate(['/admin/products']);
  }

  //this method will first take the string 'query',then with the help of filter method, iterate over product list
  //for each entry, it will check if that string is included in the query string,if yes then inserted into filtered
  filter(query:string)
  {
      let filteredProduct = (query) ?
      this.productTemp.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
       this.productTemp;

       this.initializeTable(filteredProduct);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
