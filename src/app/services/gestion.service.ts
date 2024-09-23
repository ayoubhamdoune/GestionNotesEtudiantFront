import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Etudiant } from '../model/etudiant.model';
import { Matiere } from '../model/matiere.model';
import {catchError, map, mergeMap} from "rxjs/operators";
import {Observable, forkJoin, throwError} from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class GestionService {
  public host: string = "http://localhost:8080";



  constructor(private httpClient: HttpClient) { }

  public getEtudiant(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(this.host + "/etudiants?page=" + page + "&size=" + size);
  }



  getEtudiants1(): Observable<Etudiant[]> {
    return this.httpClient.get<Etudiant[]>(`${this.host}/etudiant/listEtudiants`).pipe(
      catchError(this.handleError)
    );
  }

  getMatieresByEtudiantId(etudiantId: number): Observable<Matiere[]> {
    return this.httpClient.get<Matiere[]>(`${this.host}/matieres/search/findByEtudiantId?id=${etudiantId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }

  public getMatiere(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(this.host + "/matieres?page=" + page + "&size=" + size);
  }


  public getAllEtudiants(): Observable<Etudiant[]> {
    return this.httpClient.get<any>(`${this.host}/etudiants`).pipe(
      map(data => data._embedded.etudiants)
    );
  }

  public getAllMatieres(): Observable<Matiere[]> {
    return this.httpClient.get<any>(`${this.host}/matieres`).pipe(
      map(data => data._embedded.matieres)
    );
  }

  public getAllMatieresWithEtudiant(): Observable<Matiere[]> {
    return forkJoin({
      matieres: this.getAllMatieres(),
      etudiants: this.getAllEtudiants()
    }).pipe(
      map(({ matieres, etudiants }) => {
        return matieres.map(matiere => {
          // @ts-ignore
          const etudiant = etudiants.find(e => e.id === matiere.etudiant.id);
          return { ...matiere, etudiant };
        });
      })
    );
  }

  public getAdmin(username: string, password: string): Observable<any> {
    return this.httpClient.get<any>(this.host + "/admins/search/findByUsernameAndPassword?username=" + username + "&password=" + password);
  }

  public getUser(username: string, password: string): Observable<any> {
    return this.httpClient.get<any>(this.host + "/etudiants/search/findByUsernameAndPassword?username=" + username + "&password=" + password);
  }

  public getEtudiantsByKeyword(mc: string, page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(this.host + "/etudiants/search/byFirstNamePage?mc=" + mc + "&page=" + page + "&size=" + size);
  }



  public deleteResource(url: any): Observable<any> {
    return this.httpClient.delete<any>(url);
  }
  public deleteResource1(url: any): Observable<Matiere> {
    return this.httpClient.delete<Matiere>(url);
  }

  public saveResource(data: any): Observable<any> {
    return this.httpClient.post<any>(this.host + "/etudiants", data);
  }
  /*public saveResource1(data: Matiere): Observable<Matiere> {
    return this.httpClient.post<Matiere>(this.host + "/matieres", data);
  }*/



  public getEtudiantById(id: number): Observable<Etudiant> {
    return this.httpClient.get<Etudiant>(`${this.host}/etudiants/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public saveResource1(data: Matiere): Observable<Matiere> {
    return this.httpClient.post<Matiere>(this.host + "/matiere/listMatieres", data).pipe(
      catchError(this.handleError)
    );
  }










  public getResource(url: string): Observable<any> {
    if (!url) {
      throw new Error('URL is undefined');
    }
    return this.httpClient.get<any>(url);
  }

  public updateResource(url: string, data: any): Observable<any> {
    if (!url) {
      throw new Error('URL is undefined');
    }
    return this.httpClient.put<any>(url, data);
  }


}
