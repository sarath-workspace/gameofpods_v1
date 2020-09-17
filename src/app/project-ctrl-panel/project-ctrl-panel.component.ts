import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { ReportService } from "../services/report.service";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { ProjectDetailsComponent } from "../project-details/project-details.component";
import { Project } from "../model/project";
import { ProjectService } from "../services/project.service";

@Component({
  selector: 'app-project-ctrl-panel',
  templateUrl: './project-ctrl-panel.component.html',
  styleUrls: ['./project-ctrl-panel.component.css']
})

export class ProjectCtrlPanelComponent implements OnInit {
  projectList: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'projectid', 'code', 'offrepname', 'onrefname', 'onboarddate', 'edit', 'delete'];

  constructor(private reportService: ReportService,
              private dialog : MatDialog,
              private projectService : ProjectService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((projectList) => {
      this.projectList = new MatTableDataSource(projectList);
      this.projectList.sort = this.sort;
    })
  }

  addProject(): void {
    this.dialog.open(ProjectDetailsComponent,
      {
        disableClose: true,
        data: {
          dialog: this.dialog,
          project: {},
          action: "add"
        }
      })
  }

  updateProject(dataVal:any) : void {
    this.dialog.open(ProjectDetailsComponent,
      {
        data: {
          dialog: this.dialog,
          project: dataVal,
          action: "update"
        }
      })
  }

  deleteProject(id:string) : void {
    var response = confirm("Are you sure you need to delete the project -> "+ id);
    if(response)
      this.projectService.delete(id)
  }

}
