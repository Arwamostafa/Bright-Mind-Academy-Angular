import { Component, OnInit } from '@angular/core';
import { IClass } from '../../models/iclass.ts';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClassService } from '../../services/class-service.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-class',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-class.html',
  styleUrl: './add-class.css'
})
export class AddClass implements OnInit {
 editClassId: number | null = null;
  classes!: IClass[] ;
  ClassForm:FormGroup;
OpenAddClassSection:boolean=false
AddButton:boolean=true
  constructor(private _classService: ClassService,){
     this.ClassForm= new FormGroup({
      className: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

get className(){return this.ClassForm.get('className')}

  ngOnInit(){
    
this.loading();
  }

//FUNCTION load Classes
   loading(){
       this._classService.getAllClasses().subscribe({
      next: (next) => {

        this.classes = next
      }
    });
  }
//FUNCTION - Add or Updatw class
  addClass() {
    if (this.ClassForm.valid) {
      const formData = this.ClassForm.value;
//NOTE - Edit class
      if (this.editClassId !== null) {
        //NOTE- Update existing class
        const index = this.classes.findIndex(i => i.classID === this.editClassId);
        if (index > -1) {
          console.log(formData);
          this._classService.updateClass(this.editClassId, formData).subscribe({
            next: (data)=>{
              console.log(data);

            },
            error: (err) => {
              console.error("Failed to uodate class:", err)
            }
          })
          this.loading();
          // this.classes[index] = { id: this.editClassId, ...formData };
        }
        this.editClassId = null; // Exit edit mode
      } else {
        // Add new class
        // const newId = this.classes.length > 0 ? Math.max(...this.classes.map(i => i.classID)) + 1 : 1;
        // this.classes.push({ id: newId, ...formData });
//NOTE - Add class
        this._classService.addClass(formData).subscribe({
          next : (data) => {

            console.log(data);
          },
          error: (err) => {
          console.error("Failed to add class:", err)
        }
        })
        this.loading();
        this.ClassForm.reset()
      }
    }
  }
//FUNCTION - Track
  classByIndex(index: number): number {
    return index;
  }
//FUNCTION - Delete class
  DeleteClass(id: number) {
    // this.classes = this.classes.filter(classes => classes.classID !== id);
    // If the deleted unit is being edited, reset the form
    this._classService.deleteClass(id).subscribe({
          next : (data) => {

            console.log(data);
          },
          error: (err) => {
          console.error("Failed to delete class:", err)
        }
    });
    this.loading();
    if (this.editClassId === id) {
      this.ClassForm.reset();
      this.editClassId = null;
    }
  }
//FUNCTION - PUt data in form for update
  UpdateClass(id: number) {
    const classToUpdate = this.classes.find(classes=> classes.classID === id);
    if (classToUpdate) {
      this.ClassForm.patchValue(classToUpdate);
      this.editClassId = id;  // Set edit mode
      this.OpenAddClassSection=true
      this.AddButton=false
    }
  }
  //FUNCTION - Show add Class section
 toggleAddClassSection() {
    if (this.OpenAddClassSection) {
          this.OpenAddClassSection = false;
          this.AddButton=true
          
  } else {
      this.OpenAddClassSection= true; 
      this.AddButton=false
    }
  }
  //FUNCTION  close add Instructor section
 closeAddClassSection(){
  this.OpenAddClassSection = false; 
this.AddButton=true
  }
}
