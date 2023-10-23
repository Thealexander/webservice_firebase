import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { EditorPersonasComponent } from './components/personas/editor-personas/editor-personas.component';
import { PersonasComponent } from './components/personas/personas/personas.component';
const routes: Routes = [
  {path: '', component: PersonasComponent},
  {path:'add', component: EditorPersonasComponent},
  {path:'edit/:id', component:EditorPersonasComponent},
  {path:'**', redirectTo:'', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
