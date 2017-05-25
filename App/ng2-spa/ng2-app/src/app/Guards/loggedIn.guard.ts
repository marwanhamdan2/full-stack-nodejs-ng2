import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../Services/Auth/auth.service';


/**
 * 
 */
@Injectable()
export class LoggedInGuard implements CanActivate{

    /**
     * 
     * @param AuthService is defined as a provided so it 
     * can be used with dep. injection
     */
    constructor(private AuthService: AuthService){
    }

    canActivate(): boolean{
        return this.AuthService.isLoggedIn();
    }
}