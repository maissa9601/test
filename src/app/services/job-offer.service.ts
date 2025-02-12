import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  constructor(private http: HttpClient) { }

  // ✅ Méthode correcte pour créer une offre
  createOffer(offer: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/offer`, offer);
  }

  // ✅ Correction de la méthode getAllOffers()

  getAllOffers(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/offers`);
  }

  getJobOfferById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/offers/${id}`);
  }




  updateJobOffer(id: number, jobOffer: any): Observable<any> {
    return this.http.put(`${BASIC_URL}/api/offers/${id}`, jobOffer);
  }
  deleteJobOffer(id: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}/api/offers/${id}`);
  }


}
