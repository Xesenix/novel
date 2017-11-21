import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from 'storage/container/store/store.component';
import { RestoreComponent } from 'storage/container/restore/restore.component';

export const routes: Routes = [{ path: 'save', outlet: 'modal', component: StoreComponent }, { path: 'load', outlet: 'modal', component: RestoreComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StorageRoutingModule {}
