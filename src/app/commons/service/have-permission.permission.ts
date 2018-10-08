import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class HavePermission implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // Retornamos true si en el localStorage hay un usuario logueado
            return true;
        }

        // si no hay un usuario logueado lo mandamos al componente de login
        this.router.navigate(['/login'], {});
        return false;
    }
}
