import { Component, Input, OnInit } from '@angular/core';

import { StoryChapter } from 'story/model/story-chapter';

@Component({
	selector: 'xes-chapter-menu',
	templateUrl: './chapter-menu.component.html',
	styleUrls: ['./chapter-menu.component.scss'],
})
export class ChapterMenuComponent {
	@Input() chapters: StoryChapter[];
}
