import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'modal/modal.module';
import { RestoreComponent } from 'storage/container/restore/restore.component';
import { StoreComponent } from 'storage/container/store/store.component';
import { StorageRoutingModule } from 'storage/routing/storage-routing.module';

@NgModule({
	imports: [CommonModule, StorageRoutingModule, ModalModule],
	declarations: [StoreComponent, RestoreComponent],
})
export class StorageModule {}
