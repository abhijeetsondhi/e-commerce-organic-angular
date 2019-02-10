import { Router, ActivatedRoute } from '@angular/router';
import { ProductServiceService } from './../../product-service.service';
import { CategoriesService } from './../../categories.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  id;
  category$;
  product={};
  constructor(public tes:CategoriesService,private pr:ProductServiceService,private router:Router,private act:ActivatedRoute) {
    this.id  = this.act.snapshot.paramMap.get('id');
    if(this.id)
    {
      this.pr.retrieve(this.id).take(1).subscribe(p => this.product = p.payload.val());
      console.log(this.product);
      console.log(this.id);
    }
   }

   ngOnInit() {
    this.category$ = this.tes.temp();
  }
   save(product)
   {
     if(this.id) 
     {
       this.pr.update(this.id,product);
     }
     else
     {
     this.pr.createProd(product);
     }
     this.router.navigate(['/admin/products']);
   }





}
