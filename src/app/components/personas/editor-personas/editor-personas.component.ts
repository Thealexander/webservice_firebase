import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/interfaces/persona.interface';
import { PersonaService } from 'src/app/services/persona.service';

import { ToastrService, ToastrModule, provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor-personas',
  templateUrl: './editor-personas.component.html',
  styleUrls: ['./editor-personas.component.scss']
})
export class EditorPersonasComponent implements OnInit {

  form: FormGroup;
  _personaService = inject(PersonaService);
  loading: boolean = false;
  id: string;
  operacion: string = 'Agregar';
  resultado: string = 'Crear';

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      saldo: ['', Validators.required],
      //   dCategoria: ['', Validators.maxLength(10)]
    })
    this.id = aRouter.snapshot.paramMap.get('id') ?? '';
  }
  ngOnInit(): void {

    if (this.id != '') {
      this.operacion = 'Editar';
      this.resultado = 'Editar';
      this.getPersona(this.id);

    }
  }
  getPersona(id: string) {
    this.loading = true;
    this._personaService.getPersona(id).subscribe((data: Persona | undefined) => {
      //console.log(data)
      this.loading = false;
      this.form.setValue({
        name: data?.name,
        apellido: data?.apellido,
        email: data?.email,
        saldo: data?.saldo
      })
    })
  }

  addPersona() {
    const persona: Persona = {
      name: this.form.value.name,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      saldo: this.form.value.saldo,
      //dCategoria: this.form.value.dCategoria,
    }
    this.loading = true;
    if (this.id != '') {
      persona.id = this.id
      this._personaService.udPersona(this.id, persona)
      this.loading = false;
      this.router.navigate(['/']);
      this.toastr.success(`${persona.name} Actualizado`, 'Persona Actualizada');
    } else {
      this._personaService.postPersona(persona);
      this.loading = false;
      this.router.navigate(['/']);
      this.toastr.success('Registro Agregado', 'Persona Agregada');
    }

  }
}
