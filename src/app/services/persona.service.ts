import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private dbPath = '/personas';
  personaObjeto: AngularFirestoreCollection<Persona>;

  constructor(private firestore: AngularFirestore) {
    this.personaObjeto = firestore.collection(this.dbPath);
  }

  postPersona(persona: Persona):any {
    return this.personaObjeto.add({...persona});
  }
  getListPersonas(): AngularFirestoreCollection<Persona>{
    return this.personaObjeto
  }
  getPersona(id: string): Observable<Persona | undefined> {
    return this.personaObjeto.doc(id).valueChanges();
  }
  udPersona(id: string, data:any):Promise<void>{
    return this.personaObjeto.doc(id).update(data);
  }

  delPersona(id: string):Promise<void> {
     return this.personaObjeto.doc(id).delete();
  }

}

