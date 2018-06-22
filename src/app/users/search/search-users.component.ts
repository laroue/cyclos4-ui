import { Component, ChangeDetectionStrategy, Injector, ViewChild } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'app/shared/base.component';
import { TableDataSource } from 'app/shared/table-datasource';
import { ApiHelper } from 'app/shared/api-helper';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { UsersService } from 'app/api/services';
import { UserDataForSearch } from 'app/api/models';
import { UserResult } from 'app/api/models/user-result';
import { ResultType } from 'app/shared/result-type';
import { UsersResultsComponent } from 'app/users/search/users-results.component';

/**
 * Search for users
 */
@Component({
  selector: 'search-users',
  templateUrl: 'search-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchUsersComponent extends BaseComponent {

  // Export enum to the template
  ResultType = ResultType;

  data: UserDataForSearch;

  form: FormGroup;
  resultType: FormControl;

  query: any;
  dataSource = new TableDataSource<UserResult>();
  loaded = new BehaviorSubject(false);

  @ViewChild('results') results: UsersResultsComponent;

  constructor(
    injector: Injector,
    private usersService: UsersService,
    formBuilder: FormBuilder
  ) {
    super(injector);
    this.form = formBuilder.group({
      resultType: ResultType.TILES,
      keywords: null,
      customValues: null
    });
    this.resultType = formBuilder.control(ResultType.TILES);
    this.form.setControl('resultType', this.resultType);

    this.stateManager.manage(this.form);
    this.subscriptions.push(this.form.valueChanges.pipe(
      debounceTime(ApiHelper.DEBOUNCE_TIME)
    ).subscribe(value => {
      this.update(value);
    }));
  }

  ngOnInit() {
    super.ngOnInit();

    // Get the data for user search
    this.stateManager.cache('data',
      this.usersService.getUserDataForSearch())
      .subscribe(data => {
        this.data = data;

        // Initialize the query
        this.query = this.stateManager.get('query', () => {
          return data.query;
        });

        // Perform the search
        this.update();
      });
  }

  update(value?: any) {
    if (value == null) {
      value = this.form.value;
    }
    if (value) {
      // Update the query from the current form value
      this.query.keywords = value.keywords;
    }

    // Update the results
    const results = this.usersService.searchUsersResponse(this.query).pipe(
      tap(() => {
        this.loaded.next(true);
      }));
    this.dataSource.subscribe(results);
  }
}
