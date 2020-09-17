import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private BASE_URL:string = window["gameofpodsBaseURL"]+"/report"

  constructor(private http: HttpClient) { }

  getLiveReport() : Observable<any> {
    const url = this.BASE_URL+"/compare"
    return this.http.get(url)
  }

  getOldReport(reportName: string) : Observable<any> {
    const url = this.BASE_URL+"/compare"
    const args = {"newreport" : reportName}
    return this.http.get(url, {params : args})
  }

  getComparedReport(baseReport:string, newReport : string) : Observable<any> {
    const url = this.BASE_URL+"/compare"
    const args = {"newreport" : newReport,
    "oldreport" : baseReport}
    return this.http.get(url, {params : args})
  }

  takeReport(token : string) : Observable<any> {
    const url = this.BASE_URL+"/create"
    return this.http.get(url)
  }

  listReports() : Observable<any> {
    const url = this.BASE_URL+"/list"
    return this.http.get(url);
  }

  compareReports(report:string) : Observable<any> {
    const url = this.BASE_URL+"/list"
    return this.http.get(url);
  }

}
