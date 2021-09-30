import { NovoAnimalComponent } from './novo-animal/novo-animal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { ListaAnimaisResolver } from './lista-animais/lista-animais.resolver';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';

const routes: Routes = [
  {
    path: '',
    component: ListaAnimaisComponent,
    resolve: {
      animais: ListaAnimaisResolver
    }
  },
  {
    path: ':animalId',
    component: DetalheAnimalComponent
  },
  {
    path: 'novo',
    component: NovoAnimalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimaisRoutingModule {}
