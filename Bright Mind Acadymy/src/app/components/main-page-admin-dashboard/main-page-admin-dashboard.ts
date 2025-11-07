import { CommonModule } from '@angular/common';
import { InstructorService } from './../../services/instructor-service';
import { StudentService } from './../../services/student-service';
import { AdminService } from './../../services/admin-service';
import { ApiSubjectSrevice } from './../../services/api-subject-srevice';
import { Component, OnInit  } from '@angular/core';
import { IUser } from '../../models/iuser';
@Component({
  selector: 'app-main-page-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './main-page-admin-dashboard.html',
  styleUrl: './main-page-admin-dashboard.css'
})
export class MainPageAdminDashboard implements OnInit{
numberOfSubjects:number=0
  numberOfUsers:number=0
  numberOfInstructors:number=0
  numberOfStudents:number=0
  Users:IUser[]=[]
  selectedUser: IUser | null = null;
constructor(private _ApiSubjectSrevice:ApiSubjectSrevice , private _AdminService :AdminService , private StudentService : StudentService , private InstructorService:InstructorService){
}
ngOnInit(){
  //` get numbers of subjects
 this._ApiSubjectSrevice.getCountOfSubjects().subscribe({
  next:(data)=>
  this.numberOfSubjects=  data
 })
 this._AdminService.getAllUsers().subscribe({
  next:(data)=>{  this.numberOfUsers=  data}
 ,
        error: (err) => {
          console.log(err);}
 })
this.InstructorService.getNumbersOfInstructor().subscribe({
   next:(data)=>{
 this.numberOfInstructors=data
 },error:(err)=>{
 console.log(err)
 }
 
})
this.StudentService.getNumberOfStudents().subscribe({
  next:(data)=>{
    this.numberOfStudents=data
  },error:(err)=>{
    console.log(err)
  }
})

this._AdminService.getDetailsOfAllUsers().subscribe({
  next:(data)=>{
    this.Users=data
  },error:(err)=>{
    console.log(err)
  }
})
      }
  toggleDetails(user: IUser) {
    if (this.selectedUser && this.selectedUser.id === user.id) {
          this.selectedUser = null;
  } else {
      this.selectedUser = user; 
    }
  }
  closeDetails(){
  this.selectedUser = null; 
  }

}
