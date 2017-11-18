export class StoryChapter {
	/**
	 * Creates an instance of StoryChapter.
	 * @param {string}   id     story chapter id
	 * @param {string}   title  story chapter title
	 * @param {number[]} stages story chapter stages ids
	 * @memberof StoryChapter
	 */
	constructor(public id: string, public title: string, public stages: number[]) {}
}
