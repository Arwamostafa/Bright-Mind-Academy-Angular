import { Component, OnInit , HostListener  } from '@angular/core';
import { RouterLink , Router ,NavigationEnd } from '@angular/router';
import { UserAuthentication } from '../../services/user-authentication';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  isNavbarFixed: boolean = false;
 isHomePage:boolean=false
  
  // isAdminLogged: boolean = false;
  // isInstructorLogged: boolean = false;
  // isStudentLogged: boolean = false;

  constructor(public _authSer: UserAuthentication , private router: Router) {


      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // هنا بنتأكد إن المسار هو / أو /home
        this.isHomePage = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home';
                this.isNavbarFixed = false;

      });

  //   this.isAdminLogged = false;
  // this.isInstructorLogged= false;
  // this.isStudentLogged = false;
  }

  ngOnInit(): void {
    // this._authSer.getAdminAuthenticationService().subscribe({
    //   next: (status) => {this.isAdminLogged = status},
    //   error: (er) => {console.log(er)}

    // });
console.log(this.isNavbarFixed)

    // this._authSer.getInstructorAuthenticationService().subscribe({
    //   next: (status) => {this.isInstructorLogged = status},
    //   error: (er) => {console.log(er)}

    // });

    // this._authSer.getStudentAuthenticationService().subscribe({
    //   next: (status) => {this.isStudentLogged = status},
    //   error: (er) => {console.log(er)}

    // });


  }
//
  logout():void {
    this._authSer.logout();
  }

@HostListener('window:scroll', [])
onWindowScroll() {
    
    const triggerPoint = 400; 
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    this.isNavbarFixed = scrollY > triggerPoint;
    
  }



}
