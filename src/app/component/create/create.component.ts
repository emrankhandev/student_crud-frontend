import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  student: Student = new Student();
  constructor(private router: Router, private studentService: StudentService, private formBuilder: FormBuilder) { }
  studentForm!: FormGroup;

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(120)]),
      gender: new FormControl('', [Validators.required]),
      bloodGroup: new FormControl('', [Validators.required]),
      education: new FormControl('',[Validators.required,]),
    })
  }

  get f() {
    return this.studentForm.controls;
  }

  addStudent() {
    console.log(this.studentForm.value);
    this.studentService.saveStudent(this.studentForm.value).subscribe(data => {
      alert("Successfully saved!")
      this.studentList();
    }, () => alert("Something went wrong"))
  }

  studentList() {
    this.router.navigate(['/'])
  }

}
