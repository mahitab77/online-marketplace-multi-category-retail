import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
 
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent  {
  
      showCategoriesHeader: boolean = true; 
    
      constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map(route => {
            while (route.firstChild) route = route.firstChild;
            return route;
          }),
          filter(route => route.outlet === 'primary'),
          mergeMap(route => route.data)
        ).subscribe(data => {
          this.showCategoriesHeader = !data['hideCategoriesHeader'];
        });
      }
    }
    