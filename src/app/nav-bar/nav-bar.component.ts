import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {  MatToolbarModule  } from '@angular/material/toolbar';
import {  MatIconModule  } from '@angular/material/icon';
import {  MatButtonModule  } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit,OnDestroy {
  isLoggedIn: boolean = false;
  private destroySubject = new Subject();
  constructor(private authService:AuthService){
     authService.authStatus.pipe(takeUntil(this.destroySubject)).subscribe(
      result => this.isLoggedIn = result
    );
  }
  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

}
