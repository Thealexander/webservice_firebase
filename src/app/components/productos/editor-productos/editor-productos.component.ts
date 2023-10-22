import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-editor-productos',
  templateUrl: './editor-productos.component.html',
  styleUrls: ['./editor-productos.component.scss']
})
export class EditorProductosComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      saldo: ['', Validators.required],
   //   dCategoria: ['', Validators.maxLength(10)]
    })
  }
  ngOnInit(): void {
  }
  addProduct() {
    const product: Persona = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      saldo: this.form.value.saldo,
      //dCategoria: this.form.value.dCategoria,

    }
    console.log(product)
  }
}
