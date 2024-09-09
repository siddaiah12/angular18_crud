import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './Model/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular18-crud';

  employeeForm:FormGroup= new FormGroup({})
  employeeObj:EmployeeModel=new EmployeeModel();
  employeeList:EmployeeModel[]=[]
  constructor(){
    debugger;
    this.createForm();
    const oldData=localStorage.getItem('empData');
    if(oldData !=null){
      const parseData=JSON.parse(oldData);
      this.employeeList=parseData;
    }
  }
  reset(){
    this.employeeObj=new EmployeeModel;
    this.createForm();
  }
  createForm(){
    this.employeeForm=new FormGroup({
      empId:new FormControl(this.employeeObj.empId),
      name:new FormControl(this.employeeObj.name,[Validators.required]),
      city:new FormControl(this.employeeObj.city),
      mobileNo:new FormControl(this.employeeObj.mobileNo),
      state:new FormControl(this.employeeObj.state),
      emailId:new FormControl(this.employeeObj.emailId,[Validators.required,Validators.email]),
      pinCode:new FormControl(this.employeeObj.pinCode,[Validators.required,Validators.minLength(6)]),
      address:new FormControl(this.employeeObj.address),
    })
  }
  onSave(){
    debugger;
    const oldData=localStorage.getItem('empData');
    if(oldData !=null){
      const parseData=JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length+1);
      this.employeeList.unshift(this.employeeForm.value)
    }else{
      this.employeeList.unshift(this.employeeForm.value)
    }
    localStorage.setItem('empData',JSON.stringify(this.employeeList));
    this.reset();
  }
  editEmployee(item:EmployeeModel){
  this.employeeObj=item;
  this.createForm();
  }
  onUpdate(){
    const record=this.employeeList.find(m=>m.empId==this.employeeForm.controls['empId'].value);
    if(record !=undefined){
      record.address=this.employeeForm.controls['address'].value;
      record.city=this.employeeForm.controls['city'].value;
      record.name=this.employeeForm.controls['name'].value;
      record.state=this.employeeForm.controls['state'].value;
      // record.emailId=this.employeeForm.controls['emailId'].value;
      record.mobileNo=this.employeeForm.controls['mobileNo'].value;
      record.pinCode=this.employeeForm.controls['pinCode'].value;
    }
    localStorage.setItem('empData',JSON.stringify(this.employeeList));
    this.reset();
  }
  deleteEmployee(id:number){
  const isDelete= confirm("Are you sure to delete..!")
  if(isDelete){
    const index=this.employeeList.findIndex(m=>m.empId==id);
    this.employeeList.splice(index,1);
    localStorage.setItem('empData',JSON.stringify(this.employeeList));
  }
  }
}
