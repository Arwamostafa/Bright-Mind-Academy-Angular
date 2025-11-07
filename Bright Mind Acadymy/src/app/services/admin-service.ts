import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdmin } from '../models/iadmin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserAuthentication } from './user-authentication';
import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private _httpClient: HttpClient, private _authUser: UserAuthentication){}

  getAllAdmins(): Observable<IAdmin[]>{
    let token: string | null = this._authUser.getToken();

    return this._httpClient.get<IAdmin[]>(`${environment.baseUrl}/admin`,{
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      })
    });
  }

  getAdminById(id: number): Observable<IUser> {
    let token: string | null = this._authUser.getToken();
    return this._httpClient.get<IUser>(`${environment.baseUrl}/admin/id/${id}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      })
    });
  }

 getAllUsers(): Observable<number> {
  const token = this._authUser.getToken();
    console.log('Token from service:', token);

  console.log(this._authUser.getRole());
 return this._httpClient.get<number>(`${environment.baseUrl}/Admin/count`, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    })
  });
}

getDetailsOfAllUsers():Observable<IUser[]>{
    const token = this._authUser.getToken();

  return this._httpClient.get<IUser[]>(`${environment.baseUrl}/Admin/GetAllUsersWithRoles`,{
    headers: new HttpHeaders({
 'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    })
  })
}
  addAdmin(_admin: IAdmin): Observable<IAdmin> {
    let token: string | null = this._authUser.getToken();

    return this._httpClient.post<IAdmin> (`${environment.baseUrl}/admin/addingAdmin`, _admin,{
      headers: new HttpHeaders({
        'content-type': "application/json",
        'authorization': `Bearer ${token}`
      })
    });
  }

  updateAdmin(id: number, _admin: IAdmin): Observable<string> {
    let token: string | null = this._authUser.getToken();
    return this._httpClient.put<string>(`${environment.baseUrl}/admin/${id}`, _admin,{
      headers: new HttpHeaders({
        'content-type': "application/json",
        'authorization': `Bearer ${token}`
      })
    });
  }

  deleteAdmin(id: number): Observable<string> {
    let token: string | null = this._authUser.getToken();
    return this._httpClient.delete<string>(`${environment.baseUrl}/admin/${id}`,{
      headers: new HttpHeaders({
        'content-type': "application/json",
        'authorization': `Bearer ${token}`
      })
  });
}
}
