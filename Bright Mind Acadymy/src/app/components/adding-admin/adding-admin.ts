import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAdmin } from '../../models/iadmin';
import { AdminService } from '../../services/admin-service';
import { IUser } from '../../models/iuser';


@Component({
  selector: 'app-adding-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './adding-admin.html',
  styleUrl: './adding-admin.css'
})
export class AddingAdmin implements OnInit {
   admins: IAdmin[] = [];
  AdminForm: FormGroup;
  editId: number | null = null;
message: string = '';
successMessage:string=''
errors: Record<string, string[]> = {};
  isSuccess: boolean = false;  selectedUser: IAdmin | null = null;
  AdminDetails : IUser | null=null
  OpenAddAdminSection:boolean=false
  AddButton:boolean=true
  
  constructor(private _adminService: AdminService) {
    this.AdminForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      nationalId: new FormControl('', [Validators.required, Validators.pattern("^[2-3][0-9]{13}$")]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9_]*@gmail\\.com$")]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/) ])
    });

    this.AdminForm.valueChanges.subscribe(() => {
      this.errors = {};
  this.successMessage = '';
  this.isSuccess = false;
  this.message=''
    });
  }

  get firstName() {
    return this.AdminForm.get('firstName');
  }

  get lastName() {
    return this.AdminForm.get('lastName');
  }

   get phoneNumber() {
    return this.AdminForm.get('phoneNumber');
  }

  get nationalId() {
    return this.AdminForm.get('nationalId');
  }

  get email() {
    return this.AdminForm.get('email');
  }

  get password() {
    return this.AdminForm.get('password');
  }

  ngOnInit(): void {
      this.loading();

    }

    loading(): void{
      this._adminService.getAllAdmins().subscribe({
        next: (data) => {
          this.admins = data;
        },
        error: (err) => {
          console.log(err);
        }

        
      })


    }
//! put values of spasific Admin in form to make Update in their information 
    Update(id: number) {

      console.log(id);
      const adminToUpdate = this.admins.find(admin => admin.id === id);
      if (adminToUpdate) {
        this.AdminForm.get('password')?.clearValidators();
        this.AdminForm.get('password')?.updateValueAndValidity();
        this.AdminForm.get('password')?.disable();
        this.AdminForm.patchValue(adminToUpdate);
        this.editId = id;  
      }
    }
//` Delete Admin
    Delete(id: number) {
      // this.instructors = this.instructors.filter(instructor => instructor.id !== id);
      // If the deleted instructor is being edited, reset the form
      console.log(id);

      this._adminService.deleteAdmin(id).subscribe({
            next : (data) => {

              console.log(data);
            },
            error: (err) => {
            console.error("Failed to delete Admin:", err.error.errors)
          }
      });
      this.loading();
      if (this.editId === id) {
        this.AdminForm.reset();
        this.editId = null;
      }
    }
//~ Add or Update Admin
 onSubmit() {
if (this.AdminForm.invalid) {
      this.message = 'Please fill in all required fields.';
      this.errors = {};
      this.isSuccess = false;
      return;
    }

    console.log(this.AdminForm.value);
      if (this.AdminForm.valid) {
        const formData = this.AdminForm.value;

        if (this.editId !== null) {
          console.log(this.editId);


           const { password, ...adminData } = formData;
          const index = this.admins.findIndex(a => a.id === this.editId);
          if (index > -1) {
            this._adminService.updateAdmin(this.editId, adminData as IAdmin).subscribe({
              next: (data:any)=>{
                console.log(data.message);
                        this.isSuccess = true;
                         this.message = data.message; 

          this.AdminForm.reset();
        this.loading()
              },
              error: (err) => {
              
   console.log('Full Error Object:', err);
        if (err.error && err.error.errors) {
          this.message = err.error.message || 'Validation failed';
          this.errors = err.error.errors;
        } else {
          this.message = 'An unexpected error occurred.';
          this.errors = {};
        }
        this.isSuccess = false;

              }
            })
           this.loading();
          }
          this.editId = null; // Exit edit mode
        } else {
          // Add new admin
          console.log(formData);

          this._adminService.addAdmin(formData).subscribe({
            next : (data :any) => {

              console.log(data);
                this.AdminForm.reset();
                this.isSuccess = true;
                this.message = data.message;
              console.log('massage: ${this.message}')

                this.loading()


            },
            error: (err) => {
               console.log('Full Error Object:', err);
        if (err.error && err.error.errors) {
          this.message = err.error.message || 'Validation failed';
          this.errors = err.error.errors;
        } else {
          this.message = 'An unexpected error occurred.';
          this.errors = {};
        }
        this.isSuccess = false;
          }
          })
        }
        this.loading();

        this.AdminForm.reset();
      } else {
        console.log('Form is invalid');
      }
    }
getErrorMessages(value: unknown): string[] {
  return Array.isArray(value) ? value : [];
}
    //@ toggle details section
    toggleDetails(user: IAdmin) {
    if (this.selectedUser && this.selectedUser.id === user.id) {
          this.selectedUser = null;
  } else {
      this.selectedUser = user; 
    }
  }
    toggleAddAdminSection() {
    if (this.OpenAddAdminSection) {
          this.OpenAddAdminSection = false;
          this.AddButton=true
  } else {
      this.OpenAddAdminSection= true; 
      this.AddButton=false
    }
  }
  //# close details section
  closeDetails(){
  this.selectedUser = null; 

  }
  closeAddAdminSection(){
  this.OpenAddAdminSection = false; 
this.AddButton=true
  }

  //// Details 
  Details(id:number){
    this._adminService.getAdminById(id).subscribe({
      next:(data)=>{
        this.AdminDetails=data
      },
      error:(err)=>{
        console.log(err.error)
      }
    })
  }

}
