import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {StaffDetailsComponent} from "../staff-details/staff-details.component";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  allProjectDetails:Array<any> = [];
  EditForm : FormGroup;
  allProjectsForAutoComplter:Array<any> =[];
  @ViewChild('EditPopup') public EditPopup:ModalDirective;
  @ViewChild('viewProjectDetails') public viewProjectDetails:ModalDirective;
  @ViewChild('EditProjectDetails') public EditProjectDetails:ModalDirective;
  @ViewChild('DeleteProjectDetails') public DeleteProjectDetails:ModalDirective;
  private value: any = {};
  private _disabledV = '0';
  public SelectedValue;
  private disabled = false;
  public projectName;  public projectDescription;  public projectStartDate;  public projectEndDate;
  public projectStatus; public projectId;
  constructor(private fb: FormBuilder,public _StaffDetailsComponent:StaffDetailsComponent) {
    this.EditForm = this.fb.group({
      'projectName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectStartDate' : ['', Validators.required,],
      'projectEndDate' : ['', Validators.required],
      'projectStatus' : ['', Validators.required]
    });
  }

  ngOnInit() {
    this.allProjectDetails = JSON.parse(localStorage.getItem('allProjectDetails'));
    if(this.allProjectDetails.length>0){
    this.allProjectDetails.forEach((eachRecord)=>{
      this.allProjectsForAutoComplter.push(eachRecord.projectName);
    })}
  }

  ViewProjectdata = (data):void =>{
    this.projectName = data.projectName;
    this.projectDescription = data.projectDescription;
    this.projectStartDate = data.projectStartDate;
    this.projectEndDate = data.projectEndDate;
    this.projectStatus = data.projectStatus;
    this.projectId = data.projectId;
    this.viewProjectDetails.show();
  };
  public hideViewProjectDetails = ():void =>{
    this.viewProjectDetails.hide();
  };
  EditProjectData = (Data):void =>{
    this.projectName = Data.projectName;
    this.projectDescription = Data.projectDescription;
    this.projectStartDate = Data.projectStartDate;
    this.projectEndDate = Data.projectEndDate;
    this.projectStatus = Data.projectStatus;
    this.projectId = Data.projectId;
    this.EditForm = this.fb.group({
      'projectName' : [Data.projectName, Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : [Data.projectDescription, Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectStartDate' : [Data.projectStartDate, Validators.required,],
      'projectEndDate' : [Data.projectEndDate, Validators.required],
      'projectStatus' : [Data.projectStatus, Validators.required]
    });
    this.EditPopup.show();
  };
  public hideEditProjectDetails = ():void =>{
    this.EditProjectDetails.hide();
  };
  public getTheProjectDataFromTheForm = ():void =>{

    this.allProjectDetails.forEach((eachRecord)=>{
      if(eachRecord.projectId === this.projectId){
        eachRecord.projectName = this.projectName;
        eachRecord.projectDescription = this.projectDescription;
        eachRecord.projectStartDate = this.projectStartDate;
        eachRecord.projectEndDate = this.projectEndDate;
        eachRecord.projectStatus = this.projectStatus;
      }
    });
    localStorage.setItem('allProjectDetails',JSON.stringify(this.allProjectDetails));
    this.EditProjectDetails.hide();
  };

  AddProjectDetails = (value):void =>{
    this.allProjectDetails.forEach((eachRecord)=>{
      if(eachRecord.projectId === this.projectId){
        eachRecord.projectName = value.projectName;
        eachRecord.projectDescription = value.projectDescription;
        eachRecord.projectStartDate = value.projectStartDate;
        eachRecord.projectEndDate = value.projectEndDate;
        eachRecord.projectStatus = value.projectStatus;
      }
    });
    this.EditPopup.hide();
    localStorage.setItem('allProjectDetails',JSON.stringify(this.allProjectDetails));
    this._StaffDetailsComponent.UpdatetheTableIfValueisEdited(this.projectName,value.projectName);
  };


  DeleteProjectData = (Data):void =>{
    this.projectId = Data.projectId;
    this.projectName = Data.projectName;
    this.DeleteProjectDetails.show();
  };
  public hideDeleteProjectDetails = ():void =>{
    this.DeleteProjectDetails.hide();
  };

  public DeleteTheRecordFormTheArray = ():void =>{
    this.allProjectDetails = JSON.parse(localStorage.getItem('allProjectDetails'));
    this.allProjectDetails.forEach((eachElement,index)=>{
      if(eachElement.projectName === this.projectName){
        this.allProjectDetails.splice(index, 1);
      }
    });
    this.allProjectsForAutoComplter = [];
    this.allProjectDetails.forEach((eachRecord)=>{
      this.allProjectsForAutoComplter.push(eachRecord.projectName);
    });
    localStorage.setItem('allProjectDetails',JSON.stringify(this.allProjectDetails));
    this.hideDeleteProjectDetails();

    this._StaffDetailsComponent.UpdatethestaffIfProjectIsDeleted(this.projectId,this.projectName);
  };


  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  // Get The Selected Product and returns the Product Id using Event Emitter
  public selected(value: any): void {
    /*console.log('from Selected '+value.id);*/
    this.UpdateDataTable(value.id);
  }

  public removed(value: any): void {
    /*console.log('Removed value is: ', value);*/

  }

  public typed(value: any): void {
    /*console.log('from Typed '+value)*/
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  UpdateDataTable = (value):void =>{
    this.SelectedValue = value;
    let temp = JSON.parse(localStorage.getItem('allProjectDetails'));
    this.allProjectDetails = [];
    temp.forEach((eachRecord)=>{
      if(eachRecord.projectName === this.SelectedValue){
        this.allProjectDetails.push(eachRecord);
      }
    })
  }
}
