import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-mentorprofile",
  templateUrl: "./mentorprofile.component.html",
  styleUrls: ["./mentorprofile.component.scss"]
})
export class MentorprofileComponent implements OnInit {
  constructor(private http: HttpClient) {}
  id: number;
  private headers = new Headers({ "Content-Type": "application/json" });
  mentorprofile = [];
  get_profile = function() {
    this.http
      .get("http://localhost:3000/api/mentorprofile")
      .subscribe((res: any[]) => {
        this.mentorprofile = res;
        console.log(res);
      });
  };
  delete_profile = function(id) {
    console.log("Delete clicked");
    this.http.delete("http://localhost:3000/api/delete_mentor/" + id).subscribe(
      result => {
        this.error_message = "Deleted";
        this.mentorprofile = [];
        this.get_profile();
      },
      error => {
        this.error_message = "Error occured, check whether Backend is running!";
        console.log(error);
      }
    );
  };

  ngOnInit() {
    this.get_profile();
  }
}
