import { Observable } from 'rxjs/Rx';
import { filter, map, mapTo, tap, zip } from 'rxjs/operators';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

export function pickAndDropObservable(dragulaService: DragulaService, selector: string) {
	const dragStart = dragulaService.drag.pipe(
		filter(([container]) => container === selector),
		map(([container, dragElement, source]) => ({
			index: Array.prototype.indexOf.call(source.children, dragElement), // DOM index
			itemId: +dragElement.getAttribute('data-item-id'),
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
				beforeItemId: before ? +before.getAttribute('data-item-id') : null,
				afterItemId: after ? +after.getAttribute('data-item-id') : null,
			};
		}) // get index of drop
		// tap(v => console.log('drop item', v))
	);

	const dragEnd = Observable.merge(dragCancel, dragDrop);

	return dragStart.pipe(
		zip(dragEnd),
		filter(([pick, drop]: [{ index: number; itemId: number }, null | { index: number; beforeItemId: number; afterItemId: number }]) => drop !== null),
		map(([pick, drop]: [{ index: number; itemId: number }, { index: number; beforeItemId: number; afterItemId: number }]) => ({ pick, drop })),
		map(({ pick, drop }) => ({
			pick,
			drop,
			from: pick.itemId,
			to: pick.index < drop.index ? drop.beforeItemId : drop.afterItemId,
		}))
	);
}
