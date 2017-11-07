import { Injectable, Component } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PrimaryLayoutComponent } from 'layout/primary-layout/primary-layout.component';

@Injectable()
export class LayoutResolver implements Resolve<Component> {
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Component> | Promise<Component> | Component {
		const { layout = PrimaryLayoutComponent } = route.data;
		return layout;
	}
}
