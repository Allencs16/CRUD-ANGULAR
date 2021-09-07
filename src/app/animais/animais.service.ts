import { environment } from './../../environments/environment';
import { Animais, Animal } from './animais';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mapTo } from 'rxjs/operators';

const API = environment.apiURl;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private http: HttpClient
  ) { }

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais>{
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscaPorId(id: number): Observable<Animal>{
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal>{
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtirAnimal(id: number): Observable<boolean>{
    return this.http.post(`${API}/photos/${id}/like`, {}, {observe: 'response'}).pipe(mapTo(true), catchError((error) => {
      return error.status === NOT_MODIFIED ? of(false) : throwError(error);
    }));
  }
}
