import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { VoluntarioService } from '../services/voluntario.service';
import { Credencial } from '../interfaces/credencial';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioGuard implements CanLoad {
  constructor(private voluntarioService:VoluntarioService, private router:Router){

  }

  credencialesUsuario!:Credencial|null;
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      //Controlamos que si el valor del observable credenciales usuario es nulo, no lo deje pasar y lo redirija al index, de lo contrario lo deja pasar
      this.voluntarioService.getCredencialesVoluntario.pipe(
        take(1)
      ).subscribe({
        next:(res)=> this.credencialesUsuario = res
      });

      if(this.credencialesUsuario == null){
        
        return this.router.createUrlTree(['/index']);
      }
    
    
      return true;
  }
}
