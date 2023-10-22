import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/interfaces/product.interface';
import { PersonaService } from 'src/app/services/product.service';
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personas',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})

export class PersonasComponent implements OnInit {

  listPersonas: Persona[] = []

  constructor(private _personaService: PersonaService) {

  }
  ngOnInit(): void {
    this.getListPersonas()
  }

  getListPersonas() {
    this._personaService.getListPersonas().subscribe((data) => {
      this.listPersonas = data;
    })
  }
}
