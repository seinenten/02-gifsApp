import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(){
    
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    //trim borra espacios adelante y atras
    query = query.trim().toLowerCase();

    // PREGUTA SI NO ES IGUAL A ALGUN ELEMENTO DEL ARREGLO
    if(!this._historial.includes(query) ){

      // METE EL ELEMENTO AL ARREGLO PRIVADO
      this._historial.unshift(query);


      // ACORTA EL ARREGLO DE 0 A 10 ELEMENTOS
      this._historial = this._historial.splice(0,10);
    }
    
    

    console.log(this._historial);
  }

}
