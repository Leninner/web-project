import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isVisibleComponent = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleComponent.asObservable();

  constructor(private authService: AuthService) {
    const isLogged = this.authService.isLogged();
    this.isVisibleComponent.next(isLogged);
  }

  // También puedes controlar visibilidad manualmente
  toggleVisibility() {
    const currentValue = this.isVisibleComponent.value;
    this.isVisibleComponent.next(!currentValue);
  }

  setVisibility(visible: boolean) {
    this.isVisibleComponent.next(visible);
  }
}
