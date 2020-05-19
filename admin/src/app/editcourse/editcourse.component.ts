import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss']
})
export class EditcourseComponent implements OnInit {
  courseModel = {};
  id:string
  course_name: String
  mentor_name: String
  mentor_experience: String
  traning_completed: Number
  rating: String
  time: String
  course_duration: String
  course_price: String
  message:string
  constructor(private _auth: AuthService,private route: ActivatedRoute, private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.http.get("http://localhost:3000/api/course/"+this.id).subscribe(
      (result) => {
         this.course_name = result['course_name'];
        this.mentor_name = result['mentor_name'];
        this.mentor_experience = result['mentor_experience'];
        this.traning_completed = result['traning_completed'];
        this.rating = result['mentor_name'];
        this.time = result['time'];
        this.course_duration = result['course_duration'];
        this.course_price= result['course_price'];
        //this.error_message = "Deleted"
        // this.users = [];
         console.log('testing')
         console.log(this.course_name)
        // console.log(this.email_id)
        // console.log(this.pass_word)
        // this.get_user_list()
      },
      (error) => {
        //this.error_message = "Error occured, check whether Backend is running!";
        console.log(error)
      }
    )
  }
  onSubmit(){
    console.log("course_name : " + this.course_name);
    console.log("mentor_name : " + this.mentor_name);
    console.log("mentor_experience : " + this.mentor_experience);
    console.log("traning_completed: " + this.traning_completed);
    console.log("rating : " + this.rating);
    console.log("time : " + this.time);
    console.log("course_duration : " + this.course_duration);
    console.log("course_price : " + this.course_price);

    var body = "course_name=" + this.course_name
        + "&mentor_name=" + this.mentor_name
        + "&mentor_experience=" + this.mentor_experience
        + "&traning_completed=" + this.traning_completed
        + "&rating=" + this.rating
        + "&time=" + this.time
        + "&course_duration=" + this.course_duration
        + "&course_price=" + this. course_price;
	
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    this.http.put("http://localhost:3000/api/course/"+this.id, body, 
                  {headers: headers, responseType:'text'}).subscribe(
      (result) => {
        console.log(result)
        this.message = "Congratulations, You had successfully Updated"
      },
      (error) => {
        console.log(error)
        this.message = "Error : Backend is running? or any other error";
      }
    )
  }
  

}
