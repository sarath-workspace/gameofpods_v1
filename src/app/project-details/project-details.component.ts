import {Component, OnInit, Optional} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportService } from "../services/report.service";
import { Project } from "../model/project";
import {ProjectService} from "../services/project.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { Inject } from '@angular/core';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  public projectDetails : FormGroup;

  public project: Project = <Project>{}

  public dialog : MatDialog;

  public updateAction : boolean = false

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data : any, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.dialog = this.data.dialog
    this.project = this.data.project
    this.updateAction = "update" == this.data.action
    this.projectDetails = new FormGroup({
      id: new FormControl(),
      teamname: new FormControl('', [Validators.required]),
      nameabbr: new FormControl('', [Validators.required]),
      nameexp: new FormControl('', [Validators.required]),
      projectid: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
      offrepname: new FormControl(),
      onrepname: new FormControl()
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.projectDetails.controls[controlName].hasError(errorName);
  }

  public processProjectDetails = () => {
    if(this.projectDetails.valid) {
      if(this.updateAction)
        this.updateProject(this.projectDetails.value)
      else
        this.createProject(this.projectDetails.value)
    }
  }

  private updateProject = (projectDetails: Project) => {
    let projectData : Project = {
      id: projectDetails.id,
      teamname: projectDetails.teamname,
      nameabbr: projectDetails.nameabbr,
      nameexp: projectDetails.nameexp,
      projectid: projectDetails.projectid,
      code: projectDetails.code,
      offrepname: projectDetails.offrepname,
      onrepname: projectDetails.onrepname,
      codesmellgatepass: null,
      bugsgatepass: null,
      coveragegatepass: null,
      token: projectDetails.token,
      onboarddate:  null,
      deleteddate: null,
      engineeringBatch : 0,
      bugsBatch : 0,
      coverageBatch : 0,
      devilBatch : 0,
      rating : 0
    }

    this.projectService.update(projectData).subscribe((data) => {
        this.dialog.closeAll()
    }, (error) => {
      alert("Something went wrong. Contact the Administrator.")
    })
  }

  private createProject = (projectDetails) => {
    let projectData : Project = {
      id: null,
      teamname: projectDetails.teamname,
      nameabbr: projectDetails.nameabbr,
      nameexp: projectDetails.nameexp,
      projectid: projectDetails.projectid,
      code: projectDetails.code,
      offrepname: projectDetails.offrepname,
      onrepname: projectDetails.onrepname,
      codesmellgatepass: null,
      bugsgatepass: null,
      coveragegatepass: null,
      token: projectDetails.token,
      onboarddate:  null,
      deleteddate: null,
      engineeringBatch : 0,
      bugsBatch : 0,
      coverageBatch : 0,
      devilBatch : 0,
      rating : 0
    }

    this.projectService.onboard(projectData).subscribe((data) => {
        this.dialog.closeAll()
    }, (error) => {
      alert("Something went wrong. Contact the Administrator.")
    })

  }


}
