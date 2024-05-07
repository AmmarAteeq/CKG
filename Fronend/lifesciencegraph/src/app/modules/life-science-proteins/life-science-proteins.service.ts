import { Injectable } from '@angular/core';
import { HttpClientService } from 'shared-lib';
import { QueryJson } from './model/query-json';
import { Endpoints, WebserveraddressService } from '../../lifesciencewebserveraddress.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LifeScienceProteinService {

  constructor(private http: HttpClientService, private adresses: WebserveraddressService) {}

  submitQuery(query: string): Observable<any> {
    const queryJson: QueryJson = { queryString: query, queryResult: '' };

    console.log(queryJson);

    try {
      return this.http.postObject({ query: query }, this.adresses.getEndpoint(Endpoints.QUERY));
    } catch (error) {
      console.error('An error occurred while processing the query:', error);
      throw error;
    }
  }

}
