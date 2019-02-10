import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private dat:AngularFireDatabase) { 
    
  }
  temp()
  {
    return this.dat.list('/categories').snapshotChanges();
  }

 

}
