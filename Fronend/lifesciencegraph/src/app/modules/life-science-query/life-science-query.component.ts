
import { Component } from '@angular/core';
import { LifeScienceQueryService } from './life-science-query.service';

@Component({
  selector: 'app-life-science-query',
  templateUrl: './life-science-query.component.html',
  styleUrls: ['./life-science-query.component.scss'],
})
export class LifeScienceQueryComponent {
  constructor(private queryService: LifeScienceQueryService) { }

  queryValue: any;
  queryResult: any[] = [];
  tableColumns: string[] = []

  submit() {
    console.log("submitting a query: " + this.queryValue);

    this.queryService.submitQuery(this.queryValue).subscribe(
      (result) => {
        this.queryResult = result.queryResult;

        const { queryResult } = this
        const allKeys = queryResult.map(object => Object.keys(object));
        const _columns = getUnitArray(allKeys.flat())
        this.tableColumns = _columns
        this.queryResult = this.queryResult.map(_item => ({
          ..._item,
          synonyms: _item.hasOwnProperty('synonyms') && _item.synonyms ? JSON.parse(_item.synonyms).join(', ') : ''
        }))
        console.log("Query Result:", this.queryResult);
        console.log('_columns:', _columns)

      },
      (error) => {
        console.error('An error occurred while processing the query:', error);

      }
    );
  }

  getItemValue(_key, _item) {
    try {
      return _item[_key]
    } catch {
      return 'N/A'
    }
  }
}


export const getUnitArray = (_array: any[]) =>
  _array.filter((_item, _index, _arr) => _arr.indexOf(_item) === _index)