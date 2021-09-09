import { switchMap, tap } from 'rxjs/operators';
import { ComentariosService } from './comentarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Comentarios } from './comentarios';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input() id!: number;
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private comentarioService: ComentariosService
  ) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentarioService.buscarComentario(this.id);
    this.buildForm();
  }

  buildForm(){
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.maxLength(300)]
    });
  }

  gravar(): void{
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentarioService.incluiComentario(this.id, comentario).pipe(switchMap(() => {
      return this.comentarioService.buscarComentario(this.id);
    }), tap(() => {
      this.comentarioForm.reset();
      alert('Comentario Salvo');
    }));
  }

}
