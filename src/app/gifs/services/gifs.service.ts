import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private _apiKey: string = 'NpIQpVa6oTJo3gZEQAJRIvKKuRoGe5yl';
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs'

  public resutados: Gif[] = [];
  
  get historial(){
    
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')! ) ;
      this.resutados = JSON.parse(localStorage.getItem('resultados')! ) ;
    }

    
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
    
      //Guarda la informacion en el localstorage de google
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }
    
    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);
      
    //console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search?`, { params})
      .subscribe( (resp) => {
        this.resutados = resp.data;

        localStorage.setItem('resultados', JSON.stringify(this.resutados));
      });
  }



}
