import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'store-alert',
        data: { pageTitle: 'gatewayApp.alertStoreAlert.home.title' },
        loadChildren: () => import('./alert/store-alert/store-alert.module').then(m => m.AlertStoreAlertModule),
      },
      {
        path: 'store',
        data: { pageTitle: 'gatewayApp.storeStore.home.title' },
        loadChildren: () => import('./store/store/store.module').then(m => m.StoreStoreModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
