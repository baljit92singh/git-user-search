import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class CommonService {
    constructor(private newHttp: HttpClient, ) {
    }
    getSearchResults(searchTerm): Observable<any> {
        return this.newHttp.get('https://api.github.com/search/users?q=' + searchTerm)
    }
}
