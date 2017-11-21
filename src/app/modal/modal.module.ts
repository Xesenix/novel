import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupComponent } from 'modal/component/popup/popup.component';

@NgModule({
	imports: [CommonModule],
	declarations: [PopupComponent],
	exports: [PopupComponent],
})
export class ModalModule {}
