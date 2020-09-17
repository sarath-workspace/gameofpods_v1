import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private BASE_URL:string = window["gameofpodsBaseURL"]+"/projects"

  constructor(private http : HttpClient) { }

  getProjects() : Observable<any> {
    const url = this.BASE_URL+"/list"
    return this.http.get(url)
  }

  onboard(data: any): Observable<any>{
    const url= this.BASE_URL+"/onboard"
    return this.http.post(url, data)
  }

  update(data:Project): Observable<any> {
    const url= this.BASE_URL+"/update"
    return this.http.post(url, data);
  }

  delete(id:string) : Observable<any> {
    const url = this.BASE_URL+"/delete"
    return this.http.delete(url)
  }

}
