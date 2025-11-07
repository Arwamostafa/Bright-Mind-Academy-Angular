import { UnitService } from './../../services/unit-service';
import { LessonService } from './../../services/lesson-service';
import { TruncateWordsPipe } from './../../Pips/truncate-words-pipe';
import { InstructorService } from './../../services/instructor-service';
import { SubjectService } from './../../services/subject-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  ISubject } from '../../models/isubject';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiSubjectSrevice } from '../../services/api-subject-srevice';
import { ClassService } from '../../services/class-service';
import { TrackService } from '../../services/track-service';
import { IClass } from '../../models/iclass.ts';
import { ITrack } from '../../models/itrack.ts';
import { Chatbotspesefic } from "../chatbotspesefic/chatbotspesefic";
import { Ilesson } from '../../models/ilesson';
import { IUnit } from '../../models/iunit';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, RouterLink, Chatbotspesefic, TruncateWordsPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  SelectedAcademicYear: number = 0;
  SelectedTrack: number = 0;
  subjects: ISubject[] = [];
  isLogged: boolean = false;
  classes: IClass[] = [];
  tracks: ITrack[] = [];
  selectedClassId: number | null  = null;
  selectedTrackId: number | null = null;
   isPanelOpen = false;
lessons:Ilesson []=[];
units:IUnit []=[];
colorOfBage:string='General'

  togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }



  constructor(private _subjectService: ApiSubjectSrevice, private _classService: ClassService, private _trackService: TrackService , private LessonService: LessonService )
  {

  }

  ngOnInit(){
 
//~ Get Subjects in Home

    this._subjectService.getTopSubjects().subscribe({
        next: (data)=> {
          console.log(data);

          this.subjects = data;
        },
        error : (err) => {
          console.log(err.error.errors);

        }

      })
      
        this._classService.getAllClasses().subscribe({
      next: (next) => {
        console.log("classes");

        console.log(next);
        this.classes = next
      }
    });

    this._trackService.getAllTracks().subscribe({
      next: (data) => {
        console.log("Track");
        console.log(data);

        this.tracks = data ;
        // console.log(this.tracks);
      }
    });




  }


  
  loadData() {

    if(this.selectedTrackId && this.selectedClassId ){
      console.log(this.selectedClassId);
      console.log(this.selectedTrackId);

      this._subjectService.getAllSubjects(this.selectedClassId, this.selectedTrackId).subscribe({
        next: (data)=> {
          console.log(data);

          this.subjects = data;
        },
        error : (err) => {
          console.log(err.error.errors);

        }
      })
    }
  }


  
  


}