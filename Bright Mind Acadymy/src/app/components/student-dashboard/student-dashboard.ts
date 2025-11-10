import { IISubject } from '../../models/isubject';
import { IUser } from '../../models/iuser';
import { SubjectService } from '../../services/subject-service';
import { IStudent } from './../../models/istudent';
import { StudentService } from './../../services/student-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ElementRef,HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  providers: [StudentService, SubjectService],
  imports: [CommonModule , FormsModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboard  implements OnInit {
Students:IStudent[]=[];
massage:string="";
SubjectOptions: SelectOption[] = [];
selectedStudent:IUser|null=null;
studenstOfSubejct:IStudent[]|null=null;
AllSubjects:IISubject[]|null=null;
selectedCourse: string = '';
  selectedLevel: string = '';

  // حالة فتح/إغلاق القوائم
  isCourseDropdownOpen: boolean = false;
  isLevelDropdownOpen: boolean = false;

  // النصوص المعروضة
  selectedCourseText: string = 'Choose a course...';
  selectedLevelText: string = 'Choose level...';

constructor(private _StudentService:StudentService , private _subjectService:SubjectService , private elementRef: ElementRef ) {

 }

ngOnInit(): void {
  this._StudentService.getAllStudent().subscribe({
    next:(data)=>{
      this.studenstOfSubejct=data;

      console.log(data);
    },
    error:(err)=>{console.log(err);}
  }) 
  this._subjectService.getAllSubject().subscribe({
    next:(data)=>{
      this.AllSubjects=data;
      this.SubjectOptions = data.map(sub => ({
        value: sub.subjectID!.toString(),
        label: sub.subjectName!
      }));
    },
    error:(err)=>{console.log(err);}
  }) 
}


delete(id:number){
  this._StudentService.deleteStudent(id).subscribe({
    next:(data)=>{
      console.log(data);
      this.massage=data;

    },
    error:(err)=>{console.log(err);}
  })
}

toggleDetails(student: IUser) {
      if (this.selectedStudent && this.selectedStudent.id === student.id) {
            this.selectedStudent = null;
    } else {
        this.selectedStudent = student; 
      }
    }
closeDetails(){
    this.selectedStudent = null;
  }

GetStudentsBtSubjectId(value: any){
  if(value.target.value==="All"){
      this._StudentService.getAllStudent().subscribe({
    next:(data)=>{
      this.studenstOfSubejct=data;
      console.log(data);
    },
    error:(err)=>{console.log(err);}
  })
  }else{
    console.log(value.target.value);
  const subjectId = Number(value.target.value);
this._subjectService.getStudentsBySubjectId(subjectId).subscribe({
  next:(data)=>{
    this.studenstOfSubejct=data;
  },
  error:(err)=>{console.log(err);}
})
  }
  
}


toggleCourseDropdown(): void {
    this.isCourseDropdownOpen = !this.isCourseDropdownOpen;
    this.isLevelDropdownOpen = false;
  }

  // فتح/إغلاق قائمة المستوى
  toggleLevelDropdown(): void {
    this.isLevelDropdownOpen = !this.isLevelDropdownOpen;
    this.isCourseDropdownOpen = false;
  }

  // اختيار دورة
  selectCourse(option: SelectOption): void {
    this.selectedCourse = option.value;
    this.selectedCourseText = option.label;
    this.isCourseDropdownOpen = false;
  }
  getSelectionText(): string {
    if (this.selectedCourse && this.selectedLevel) {
      return `${this.selectedCourseText} - ${this.selectedLevelText}`;
    } else if (this.selectedCourse) {
      return this.selectedCourseText;
    } else if (this.selectedLevel) {
      return this.selectedLevelText;
    }
    return 'None yet';
  }

  // إغلاق القوائم عند الضغط خارجها
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isCourseDropdownOpen = false;
      this.isLevelDropdownOpen = false;
    }
  }

  // التحقق من الخيار المختار
  isSelected(type: 'course' | 'level', value: string): boolean {
    return type === 'course' 
      ? this.selectedCourse === value 
      : this.selectedLevel === value;
  }
}