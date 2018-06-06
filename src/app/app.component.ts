import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './service/common.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  allRepro: Object;
  totalValue: any;
  @ViewChild('searchInput') searchInput: ElementRef;
  allUsers = [];
  searchCtrl: FormControl;
  searchResults: any = [];
  // allRepro = [];
  showAllItems;
  hideSearchBar: boolean = true;
  title = 'app';
  nextPage = 1;
  lastPage = 0;
  sortByList = [{ value: 'login', viewValue: 'Name (Ascending)' },
  { value: '-login', viewValue: 'Name (Descending)' },
  { value: 'score', viewValue: 'Rank (Ascending)' },
  { value: '-score', viewValue: 'Rank (Descending)' }];
  sortBy: FormControl = new FormControl();
  sortElementBy: Array<any>
  constructor(
    private newHttp: HttpClient,
    public commonService: CommonService
  ) {
    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges.subscribe(res => {
      this.allUsers = [];
      this.commonService.getSearchResults(res)
        .subscribe(a => {
          this.allUsers = a.items;
          this.totalValue = a.total_count;
          this.allUsers.forEach(a => a.mode = 'C');
        })
    })
  }
  SortBy(formValues) {
    this.sortElementBy = [];
    formValues.value ? this.sortElementBy = formValues.value : null;
  }
  viewDetails(item) {
    if (item.mode == 'C') {
      item.mode = 'D'
      this.allRepro = [];
      this.newHttp.get('https://api.github.com/users/' + item.login + '/repos').subscribe(res => {
        this.allRepro = res;
      })
    } else {
      item.mode = 'C'
    }
  }
}

