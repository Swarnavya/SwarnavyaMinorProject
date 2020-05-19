import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-addcourse",
  templateUrl: "./addcourse.component.html",
  styleUrls: ["./addcourse.component.scss"]
})
export class AddcourseComponent implements OnInit {
  courseModel = {};
  message = "";

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {}
  onSubmit() {
    this._auth.addcourse(this.courseModel).subscribe(
      res => {
        console.log(res);
        this.message = "Congratulation, Course has been added";
      },
      err => console.log(err)
    );
  }
}
