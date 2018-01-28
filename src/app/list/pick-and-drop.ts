import { Observable } from 'rxjs/Rx';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';
import { zip } from 'rxjs/operators/zip';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

export function pickAndDropObservable(
	dragulaService: DragulaService,
	selector: string
): Observable<{
	pick: { index: number; length: number; itemId: string; containerId: string };
	drop: { index: number; length: number; beforeItemId: string; afterItemId: string; containerId: string };
	from: string;
	to: string;
}> {
	const dragStart = dragulaService.drag.pipe(
		filter(([container]) => container === selector),
		map(([container, dragElement, source]) => ({
			index: Array.prototype.indexOf.call(source.children, dragElement), // DOM index
			length: source.children.length,
			itemId: dragElement.getAttribute('data-item-id'),
			containerId: source.getAttribute('data-container-id'),
		})) // get index of picked up element
		// tap(v => console.log('pick item', v))
	);

	const dragCancel = dragulaService.cancel.pipe(
		filter(([container]) => container === selector),
		mapTo(null)
		// tap(v => console.log('cancel drag'))
	);

	const dragDrop = dragulaService.drop.pipe(
		filter(([container]) => container === selector),
		map(([container, dropElement, target, source]) => {
			const index = Array.prototype.indexOf.call(target.children, dropElement);
			const before = target.children[index - 1];
			const after = target.children[index + 1];
			return {
				index,
				length: target.children.length,
				beforeItemId: before ? before.getAttribute('data-item-id') : null,
				afterItemId: after ? after.getAttribute('data-item-id') : null,
				containerId: target.getAttribute('data-container-id'),
			};
		}) // get index of drop
		// tap(v => console.log('drop item', v))
	);

	const dragEnd = Observable.merge(dragCancel, dragDrop);

	return dragStart.pipe(
		zip(dragEnd),
		filter(
			(
				[pick, drop]: [
					{ index: number; itemId: string; containerId: string },
					null | { index: number; beforeItemId: string; afterItemId: string; containerId: string }
				]
			) => drop !== null
		),
		map(
			(
				[pick, drop]: [
					{ index: number; length: number; itemId: string; containerId: string },
					{ index: number; length: number; beforeItemId: string; afterItemId: string; containerId: string }
				]
			) => ({ pick, drop })
		),
		map(
			({
				pick,
				drop,
			}: {
				pick: { index: number; length: number; itemId: string; containerId: string };
				drop: { index: number; length: number; beforeItemId: string; afterItemId: string; containerId: string };
			}) => ({
				pick,
				drop,
				from: pick.itemId,
				to: pick.containerId === drop.containerId ? drop.beforeItemId : drop.afterItemId,
			})
		)
	);
}
