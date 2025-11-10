


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IClass } from '../../models/iclass.ts';
import { ITrack } from '../../models/itrack.ts';
import { TrackService } from '../../services/track-service.js';

@Component({
  selector: 'app-adding-class-track',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './adding-class-track.html',
  styleUrl: './adding-class-track.css'
})
export class AddingClassTrack implements OnInit {

 editClassId: number | null = null;
  classes!: IClass[] ;

  ClassForm:FormGroup;

  // track
  editTrackId: number | null = null;
  tracks!: ITrack[] ;
  TrackForm:FormGroup;
  OpenAddTrackSection:boolean=false
AddButton:boolean=true
  constructor( private _trackService: TrackService){
    this.ClassForm= new FormGroup({
      className: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.TrackForm= new FormGroup({
      trackName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }


  ngOnInit(){
    this.loading();
  }

  loading(){

    this._trackService.getAllTracks().subscribe({
      next: (data) => {

        this.tracks = data ;
        // console.log(this.tracks);
      }
    })
  }

  


// track

  get trackName(){return this.TrackForm.get('trackName')}
addTrack() {
    if (this.TrackForm.valid) {
      const formData = this.TrackForm.value;

      if (this.editTrackId !== null) {
        // Update existing track
        const index = this.tracks.findIndex(i => i.trackID === this.editTrackId);
        if (index > -1) {
          // this.tracks[index] = { id: this.editTrackId, ...formData };
          this._trackService.updateTrack(this.editTrackId, formData).subscribe({
            next: (data)=>{
              console.log(data);
                           this.ngOnInit();

            },
            error: (err) => {
              console.error("Failed to update track:", err)
            }

          })
         this.loading();

          this.ngOnInit();
           this.TrackForm.reset()
           this.OpenAddTrackSection=false;
            this.AddButton=true

        }
        this.editTrackId = null; // Exit edit mode
      } else {
        // Add new track
        // const newId = this.trackes.length > 0 ? Math.max(...this.trackes.map(i => i.id)) + 1 : 1;
        // this.trackes.push({ id: newId, ...formData });

        this._trackService.addTrack(formData).subscribe({
          next : (data) => {

            console.log(data);
                    this.loading();

          },
          error: (err) => {
          console.error("Failed to add track:", err)
        }
        })
        this.ngOnInit();
this.OpenAddTrackSection=false;
            this.AddButton=true
        this.TrackForm.reset()
      }
    }
  }
  trackByIndex(index: number): number {
    return index;
  }
  DeleteTrack(id: number) {
    // this.trackes = this.trackes.filter(track => track.id !== id);
    // If the deleted unit is being edited, reset the form
    this._trackService.deleteTrack(id).subscribe({
          next : (data) => {

            console.log(data);
          },
          error: (err) => {
          console.error("Failed to delete track:", err)
        }
    });
    this.ngOnInit();
    if (this.editTrackId === id) {
      this.TrackForm.reset();
      this.editTrackId = null;
    }
  }
  UpdateTrack(id: number) {
    console.log(id);

    const trackToUpdate = this.tracks.find(track => track.trackID === id);
    if (trackToUpdate) {
      this.TrackForm.patchValue(trackToUpdate);
      this.editTrackId = id;  // Set edit mode
      this.OpenAddTrackSection=true;
      this.AddButton=false
    }
  }
   toggleAddClassSection() {
    if (this.OpenAddTrackSection) {
          this.OpenAddTrackSection = false;
          this.AddButton=true
  } else {
      this.OpenAddTrackSection= true; 
      this.AddButton=false
    }
  }
  //FUNCTION  close add Instructor section
 closeAddClassSection(){
  this.OpenAddTrackSection = false; 
this.AddButton=true
  }
}
