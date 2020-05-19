import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"]
})
export class CourseComponent implements OnInit {
  constructor(private http: HttpClient) {}
  index: number;
  private headers = new Headers({ "Content-Type": "application/json" });
  courses = [];
  get_courses = function() {
    this.http
      .get("http://localhost:3000/api/courses")
      .subscribe((res: any[]) => {
        this.courses = res;
        console.log(res);
      });
  };

  delete_course = function(id) {
    console.log("Delete clicked");
    this.http.delete("http://localhost:3000/api/delete_course/" + id).subscribe(
      result => {
        this.error_message = "Deleted";
        this.courses = [];
        this.get_courses();
      },
      error => {
        this.error_message = "Error occured, check whether Backend is running!";
        console.log(error);
      }
    );
  };

  ngOnInit() {
    this.get_courses();
  }
}
