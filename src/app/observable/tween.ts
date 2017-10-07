import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { TeardownLogic } from 'rxjs/Subscription';
import { IScheduler, Scheduler } from 'rxjs/Scheduler';
import { Observable, Subscriber } from 'rxjs/Rx';

/**
 * Emits values between 0 and 1 over duration of time.
 *
 * @export
 * @class TweenObservable
 * @extends {Observable<number>}
 */
export class TweenObservable extends Observable<number> {
	static create(duration: number, start: number = 0, end: number = 1) {
		return new TweenObservable(duration).map((v) => start + (end - start) * v);
	}

	static dispatch(state: any) {
		const { duration, startTime, subscriber } = state;

		if (subscriber.closed) {
			return;
		}

		const delta = Date.now() - startTime;

		if (delta > duration) {
			subscriber.complete();
		}

		subscriber.next(delta / duration);

		(<any> this).schedule(state);
	}

	constructor(protected duration: number, private scheduler: IScheduler = animationFrame) {
		super();

	}

	protected _subscribe(subscriber: Subscriber<number>): TeardownLogic {
		return this.scheduler.schedule(TweenObservable.dispatch, 0, {
			startTime: Date.now(),
			duration: this.duration,
			subscriber,
		});
	}
}
