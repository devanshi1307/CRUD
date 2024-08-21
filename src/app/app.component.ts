import { Component, ElementRef, model, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // title = 'registrationForm';
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: student = new student();
  studentList: student[]=[];

  ngOnInit(): void {
    const localData = localStorage.getItem('angular17crud');
    if(localData!= null){
      this.studentList = JSON.parse(localData);
    }else{

    }
  }

  openModel() {
   
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = "block"
    }
  }

  closeModel() {
    this.studentObj = new student();
    if (this.model != null) {
      this.model.nativeElement.style.display = "none"
    }

  }
  saveModel() {
    //debugger;
    const isLocalPresent = localStorage.getItem('angular17crud');
    if (isLocalPresent != null) {
      const oldArry = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArry.length+1;
      oldArry.push(this.studentObj);
      this.studentList = oldArry;
      localStorage.setItem('angular17crud', JSON.stringify(oldArry))
    } else {
      const newArr = []
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr))
    }
  }

  onEdit(item: student){
    this.studentObj = item;
    this.openModel();

  }
  updateModel(){
    const currentRecord = this.studentList.find(m=> m.id === this.studentObj.id);
    if(currentRecord!= undefined){
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.email = this.studentObj.email;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.pincode = this.studentObj.pincode;
      
    };
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModel();
  }
  onDelete(item : student){
    const isDelete = confirm("Are you sure ! you want to delete it.");
    if(isDelete){
      const currentRecord = this.studentList.findIndex(m=> m.id === this.studentObj.id);
      this.studentList.splice(currentRecord);
    };
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModel();
  }
}

export class student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.mobileNo = "";
    this.email = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.pincode = "";
  }
}