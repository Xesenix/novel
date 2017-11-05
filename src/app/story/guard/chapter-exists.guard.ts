import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { StoryChapter } from 'story/model/story-chapter';
import { StoryModuleState, selectFeatureChapters } from 'story/reducers';

@Injectable()
export class ChapterExistsGuard implements CanActivate {
	constructor(private store: Store<StoryModuleState>, private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const id = next.params.id;
		if (typeof id === 'undefined') {
			// tslint:disable
			console.debug('ChapterExistsGuard:redirect', next.url);
			this.router.navigate([next.data.redirectTo]);
			return false;
		}
		return this.store.select(selectFeatureChapters).pipe(
			map((chapters: StoryChapter[]) => chapters.reduce<boolean>((accumulated, chapter: StoryChapter) => accumulated || chapter.id === id, false)),
			tap(value => {
				if (!value) {
					// tslint:disable
					console.debug('ChapterExistsGuard:redirect', next.url);
					this.router.navigate([next.data.redirectTo]);
				}
			})
		);
	}
}
