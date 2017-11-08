import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {
	ChangeDetectionStrategy,
	Component,
	ComponentFactoryResolver,
	Input,
	OnDestroy,
	AfterContentInit,
	OnInit,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';

import { pickAndDropObservable } from 'app/list/pick-and-drop';
import { SortableListItem } from 'app/reducers/list';
import { hash } from 'app/utils/hash';
import { StageFormComponent } from 'story/component/stage-form/stage-form.component';
import { StoryStage } from 'story/model/story-stage';
import { selectFeatureStagesSortableList, StoryModuleState } from 'story/reducers';
import { StagesService } from 'story/service/stages.service';
import { map, filter } from 'rxjs/operators';

@Component({
	selector: 'xes-stage-list',
	templateUrl: './stage-list.component.html',
	styleUrls: ['./stage-list.component.scss'],
	providers: [DragulaService],
	animations: [trigger('listState', [transition(':enter', [style({ transform: 'scale(1.0)', opacity: 1, backgroundColor: '#8f8' }), animate(500)])])],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageListComponent implements OnInit, AfterContentInit, OnDestroy {
	@ViewChild('addForm') addForm: StageFormComponent;

	@ViewChild('titleBar') titleBar: TemplateRef<any>;
	@ViewChild('sideBar') sideBar: TemplateRef<any>;
	@ViewChild('content') content: TemplateRef<any>;

	// @ViewChild('container') container: ViewContainerRef;

	@Input() list: Observable<SortableListItem<StoryStage>[]>;

	subscriptionDragAndDrop: Subscription;

	undo: any[] = [];

	layout: any = null;

	constructor(
		private store: Store<StoryModuleState>,
		private dragulaService: DragulaService,
		public stagesService: StagesService,
		private route: ActivatedRoute,
		private componentFactoryResolver: ComponentFactoryResolver,
		private container: ViewContainerRef
	) {}

	ngOnInit() {
		this.list = this.store.select(selectFeatureStagesSortableList).share();

		this.dragulaService.setOptions('stages', {
			moves: (el, container, handle) => handle.className.split(' ').indexOf('handle') >= 0,
		});

		this.subscriptionDragAndDrop = pickAndDropObservable(this.dragulaService, 'stages').subscribe(({ from, to }) => this.stagesService.move(from, to));
	}

	ngAfterContentInit() {
		this.route.data.pipe(map(({ layout = null }) => layout), filter(layout => layout !== null)).subscribe(layout => {
			console.log('layout', layout);
			const factory = this.componentFactoryResolver.resolveComponentFactory(layout);

			const titleBar = this.titleBar.createEmbeddedView(this);
			titleBar.detectChanges();
			const sideBar = this.sideBar.createEmbeddedView(this);
			sideBar.detectChanges();
			const content = this.content.createEmbeddedView(this);
			content.detectChanges();

			this.container.createComponent(factory, 0, this.container.injector, [
				// titleBar.rootNodes,
				sideBar.rootNodes,
				content.rootNodes,
			]);
			// this.layout = factory.create(this.self.);
		});
	}

	listItemIdentity(index: number, item: SortableListItem<StoryStage>) {
		return `index:${index}:${hash(item.data)}`;
	}

	add() {
		this.stagesService.add(this.addForm.valueChange.getValue());
	}

	ngOnDestroy() {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}
