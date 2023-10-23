import { Component, OnInit, inject, EventEmitter } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona.interface';
import { PersonaService } from 'src/app/services/persona.service';
//import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService, ToastrModule, provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})

export class PersonasComponent implements OnInit {

  loading: boolean = false;
  personas?: Persona[];
  uPersona?: Persona; //Observable<any[]>;
  _personaService = inject(PersonaService);
  currentIndex = -1;
  message = '';
  constructor(private toastr: ToastrService) {}
  ngOnInit() {

    this.listarPersonas();
    this.message = '';

  }
  refreshList(): void {
    this.uPersona = undefined;
    this.currentIndex = -1;
    this.listarPersonas();
  }

  listarPersonas(): void {
    this.loading = true;
    setTimeout(() => {
      this._personaService.getListPersonas().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        this.personas = data;
      });
      this.loading = false;
    }, 300)

  }
  setActivePersona(persona: Persona, index: number): void {
    this.uPersona = persona;
    this.currentIndex = index;
  }

  onClickDelete(id: string) {
    this._personaService.delPersona(id)
      .then(() => {
        //console.log("persona eliminada")
        this.listarPersonas()
        this.toastr.warning('La persona ha sido eliminada de la BD', 'Registro eliminado');
      })
  }



}
