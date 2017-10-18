import { AppComponent as BaseAppComponent } from './../app/app.component';
import { Component } from '@angular/core';

@Component({
	selector: 'xes-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseAppComponent {
}
