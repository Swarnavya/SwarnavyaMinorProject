import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddcourseComponent } from "./addcourse/addcourse.component";
import { CourseComponent } from "./course/course.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { HomeComponent } from "./home/home.component";
import { EditcourseComponent } from "./editcourse/editcourse.component";
import { MentorprofileComponent } from "./mentorprofile/mentorprofile.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "addcourse", component: AddcourseComponent },
  { path: "course", component: CourseComponent },
  { path: "userprofile", component: UserProfileComponent },
  { path: "home", component: HomeComponent },
  {
    path: "update_course/:id",
    component: EditcourseComponent,
    pathMatch: "full"
  },
  { path: "mentorprofile", component: MentorprofileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
