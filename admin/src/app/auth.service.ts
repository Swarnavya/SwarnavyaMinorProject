import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _addcourseUrl = "http://localhost:3000/api/addcourse";

  constructor(private http: HttpClient, private _router: Router) {}

  addcourse(course) {
    return this.http.post<any>(this._addcourseUrl, course);
  }
}
