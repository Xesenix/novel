export class StoryStage {
	/**
	 * Creates an instance of StoryStage.
	 * @param {number} id             story stage unique id
	 * @param {string} title          story stage descriptive title
	 * @param {string} content        story stage content
	 * @param {string} [chapter=null] story stage chapter id
	 * @memberof StoryStage
	 */
	constructor(public id: number, public title: string, public content: string, public chapter: string = null) {}
}
