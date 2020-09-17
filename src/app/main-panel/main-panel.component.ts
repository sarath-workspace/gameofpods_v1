import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormDataServiceService} from "../services/form-data-service.service";
import { ReportService } from "../services/report.service";
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ProjectCtrlPanelComponent} from "../project-ctrl-panel/project-ctrl-panel.component";
import { AuthenticateComponent } from "../authenticate/authenticate.component";
import { AuthenticateService } from "../services/authenticate.service";
import {MessageComponent} from "../message/message.component";

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {

  reports: string[]
  cmp_reports: string[]
  dataSource : MatTableDataSource<any>
  displayedColumns: string[] = ['id','teamName', 'projectName', 'reportDateTime', 'linesOfCode', 'currentBugs', 'currentCodeSmell', 'currentCoverage', 'previousBugs', 'previousCodeSmell', 'previousCoverage', 'bugsDifference', 'codesmellDifference', 'coverageDifference', 'rating'];
  live_data = true
  selectedReport: string
  comparedReport: string
  dialogRef: MatDialogRef<MessageComponent, any>

  constructor(private formDataService : FormDataServiceService,
              private reportService : ReportService,
              private dialog : MatDialog,
              private authenticationService : AuthenticateService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.getReportList();
    this.getReport();
  }

  getReportList() {
    this.reportService.listReports().subscribe((reportList) => {
      this.reports = reportList
      this.cmp_reports = reportList
      this.comparedReport = this.cmp_reports[0]
    })
  }
// live
  getReport() {
    this.reportService.getLiveReport().subscribe((report) => {
      this.dataSource = new MatTableDataSource(report);
      this.dataSource.sort = this.sort;
      this.selectedReport = 'live'
      this.live_data = true
      this.getReportList()
    })
  }

  projectBrowser() {
    this.dialog.open(ProjectCtrlPanelComponent, { disableClose: true })
  }

  loadReport(selectedReport : string) {
    this.reportService.compareReports(selectedReport).subscribe((report) => {
      this.cmp_reports = report
      this.comparedReport = this.cmp_reports[0]
    })
    this.reportService.getOldReport(selectedReport).subscribe((report) => {
      this.dataSource = new MatTableDataSource(report);
      this.dataSource.sort = this.sort;
      this.live_data = false
    })

  }

  compareReports(comparedReport : string) {
    this.reportService.getComparedReport(comparedReport, this.selectedReport).subscribe((report) => {
      this.dataSource = new MatTableDataSource(report);
      this.dataSource.sort = this.sort;
      this.live_data = false
    })
  }

  takeReport() {
    alert("this service is not supported");
    return;
    this.authenticationService.authenticate((authorised : boolean, token: string) => {
      if (authorised) {
        this.dialogRef = this.dialog.open(MessageComponent, {
          disableClose: true,
          data: {
            message: "Report has been initiated"
          }
        })
        setInterval(() => {
          this.dialogRef.close()
        }, 5000)

        this.reportService.takeReport(token).subscribe((data) => {
          this.dialogRef = this.dialog.open(MessageComponent, {
            disableClose: true,
            data: {
              message: "Report "+ data.reportName +" has been successfully generated"
            }
          })
          setInterval(() => {
            this.dialogRef.close()
          }, 5000)
        }, (data) => {
          this.dialogRef = this.dialog.open(MessageComponent, {
            disableClose: true,
            data: {
              message: "Something went wrong... "+ data.toString()
            }
          })
          setInterval(() => {
            this.dialogRef.close()
          }, 5000)
        })
      } else {
        this.dialogRef = this.dialog.open(MessageComponent, {
          disableClose: true,
          data: {
            message: "UnAuthorised to take a report."
          }
        })
        setInterval(() => {
          this.dialogRef.close()
        }, 5000)
      }
    });
  }
}
