import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddcourseComponent } from "./addcourse/addcourse.component";
import { AuthService } from "./auth.service";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { EditcourseComponent } from './editcourse/editcourse.component';
import { MentorprofileComponent } from './mentorprofile/mentorprofile.component';

@NgModule({
  declarations: [AppComponent, AddcourseComponent, UserProfileComponent, CourseComponent, HomeComponent, EditcourseComponent, MentorprofileComponent, ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
