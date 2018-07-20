import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Output() clickBreadCrumb = new EventEmitter<String>();
  @Input()
  breadcrumbs: Array<String>;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.route)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        console.log('Breadcrumbs: ', event);
        this.breadcrumbs = event["breadcrumbs"]
      });
  }

  navigateBreadCrumb(breadcrumb: String){
    this.clickBreadCrumb.emit(breadcrumb);
  }

  buildBreadCrumbs(route: ActivatedRoute): Array<String> {
    var breadcrumbs: Array<String>
    if (route.routeConfig.data){
      breadcrumbs = route.routeConfig.data[ 'breadcrumbs' ];
    }
    else{
      breadcrumbs = route.firstChild.routeConfig.data[ 'breadcrumbs' ];
    }
    return (breadcrumbs);
  }

}
