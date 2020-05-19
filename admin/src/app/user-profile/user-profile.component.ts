import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  constructor(private http: HttpClient) {}
  id: number;
  private headers = new Headers({ "Content-Type": "application/json" });
  userprofile = [];
  get_profile = function() {
    this.http
      .get("http://localhost:3000/api/userprofile")
      .subscribe((res: any[]) => {
        this.userprofile = res;
        console.log(res);
      });
  };
  delete_profile = function(id) {
    console.log("Delete clicked");
    this.http.delete("http://localhost:3000/api/delete_user/" + id).subscribe(
      result => {
        this.error_message = "Deleted";
        this.userprofile = [];
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
