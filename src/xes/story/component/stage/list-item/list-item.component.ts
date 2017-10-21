import { Component } from '@angular/core';
import { component, ListItemComponent as BaseComponent } from '@core/story/component/stage/list-item/list-item.component';

@Component({
	...component,
	templateUrl: './list-item.component.html', // it has to be overridden because when it comes here its already loaded into template
	styleUrls: ['./list-item.component.scss'] // same as above
})
export class ListItemComponent extends BaseComponent {
}
