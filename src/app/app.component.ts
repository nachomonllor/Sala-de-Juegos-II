import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
declare function app_init();
declare function sidebar_init();
declare function init_plugins();
declare function app_switcher();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(private router: Router) {
    this.router.events.subscribe((e : RouterEvent) => {
       this.navigationInterceptor(e);
     });
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.initScripts();
    }
    if (event instanceof NavigationEnd) {
      this.initScripts();
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {}
    if (event instanceof NavigationError) {}
  }
  private initScripts() {
    app_init();
    app_switcher();
    init_plugins();
    sidebar_init();
  }

}
