import { Injectable, NgZone, ApplicationRef, ComponentRef, ViewContainerRef, ReflectiveInjector } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { LevelUpComponent } from './level-up.component';

@Injectable()
export class LevelUpManager {
	public component: ComponentRef<any>;
	private _rootViewContainerRef: ViewContainerRef;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private ngZone: NgZone, private appRef: ApplicationRef) {}

	setRootViewContainerRef(vRef: ViewContainerRef) {
		this._rootViewContainerRef = vRef;
	}

	show(level: number): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!this.component) {
				if (!this._rootViewContainerRef) {
					try {
						this._rootViewContainerRef = this.appRef['_rootComponents'][0]['_hostElement'].vcRef;
					} catch (e) {
						reject(new Error('Please set root ViewContainerRef using setRootViewContainerRef(vRef: ViewContainerRef) method.'));
					}
				}

				const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LevelUpComponent);
				const childInjector = ReflectiveInjector.fromResolvedProviders([], this._rootViewContainerRef.parentInjector);
				this.component = this._rootViewContainerRef.createComponent(componentFactory, this._rootViewContainerRef.length, childInjector);

				/*this.component.instance.onExit().subscribe(() => {
					this.dispose();
				});*/
			}

			this.component.instance.open(level);
		});
	}

	dispose() {
		if (this.component) {
			this.component.destroy();
			this.component = null;
		}
	}
}
