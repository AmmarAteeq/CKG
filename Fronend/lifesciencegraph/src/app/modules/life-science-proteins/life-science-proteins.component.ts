import { Component, OnInit, QueryList } from '@angular/core';
import { LifeScienceProteinService } from './life-science-proteins.service';
import { LifeScienceProteinFileUploadService } from './life-science-proteins-upload.service';
import { getUnitArray } from '../life-science-query/life-science-query.component';


@Component({
  selector: 'app-life-science-proteins',
  templateUrl: './life-science-proteins.component.html',
  styleUrls: ['./life-science-proteins.component.scss']
})
export class LifeScienceProteinsComponent implements OnInit {

  constructor(
    private queryService: LifeScienceProteinService,
    private LifeScienceProteinFileUploadService: LifeScienceProteinFileUploadService
  ) { }


  queryResult: any;
  queryValue: string[] = [];
  databaseQuery = ''
  selectedValue: string = "";
  accessionNumbers: string[] = [];
  selectedAccession: string = "";
  tableColumns: string[] = []
  nodeValue = ''

  relationShipMst: DropDowns[] = [
    // Disease Start
    { title: 'HAS PARENT', code: "HAS_PARENT", type: 'DISEASE' },
    { title: 'ASSOCIATED WITH', code: "ASSOCIATED_WITH", type: 'DISEASE' },
    { title: 'MENTIONED IN PUBLICATION', code: "MENTIONED_IN_PUBLICATION", type: 'DISEASE' },
    { title: 'MAPS TO', code: "MAPS_TO", type: 'DISEASE' },
    { title: 'IS BIOMARKER OF DISEASE', code: "IS_BIOMARKER_OF_DISEASE", type: 'DISEASE' },
    { title: 'STUDIES DISEASE', code: "STUDIES_DISEASE", type: 'DISEASE' },
    { title: 'DETECTED IN PATHOLOGY SAMPLE', code: "DETECTED_IN_PATHOLOGY_SAMPLE", type: 'DISEASE' },
    // Disease End

    // COMPLEX Start
    { title: 'ASSOCIATED WITH', code: "ASSOCIATED_WITH", type: 'COMPLEX' },
    { title: 'IS SUBUNIT OF', code: "IS_SUBUNIT_OF", type: 'COMPLEX' },
    // COMPLEX END

    // PROTEIN START
    { code: "BELONGS_TO_PROTEIN", title: "BELONGS TO PROTEIN", type: 'PROTEIN' },
    { code: "TRANSLATED_INTO", title: "TRANSLATED INTO", type: 'PROTEIN' },
    { code: "VARIANT_FOUND_IN_PROTEIN", title: "VARIANT FOUND IN PROTEIN", type: 'PROTEIN' },
    { code: "DETECTED_IN_PATHOLOGY_SAMPLE", title: "DETECTED IN PATHOLOGY SAMPLE", type: 'PROTEIN' },
    { code: "HAS_STRUCTURE", title: "HAS STRUCTURE", type: 'PROTEIN' },
    { code: "CURATED_INTERACTS_WITH", title: "CURATED INTERACTS WITH", type: 'PROTEIN' },
    { code: "ASSOCIATED_WITH", title: "ASSOCIATED WITH", type: 'PROTEIN' },
    { code: "FOUND_IN_PROTEIN", title: "FOUND IN PROTEIN", type: 'PROTEIN' },
    { code: "ANNOTATED_IN_PATHWAY", title: "ANNOTATED IN PATHWAY", type: 'PROTEIN' },
    { code: "ASSOCIATED_WITH_INTEGRATED", title: "ASSOCIATED WITH INTEGRATED", type: 'PROTEIN' },
    { code: "IS_SUBUNIT_OF", title: "IS SUBUNIT OF", type: 'PROTEIN' },
    { code: "COMPILED_INTERACTS_WITH", title: "COMPILED INTERACTS WITH", type: 'PROTEIN' },
    { code: "ACTS_ON", title: "ACTS ON", type: 'PROTEIN' },
    { code: "MENTIONED_IN_PUBLICATION", title: "MENTIONED IN PUBLICATION", type: 'PROTEIN' },
    { code: "HAS_SEQUENCE", title: "HAS SEQUENCE", type: 'PROTEIN' },
    { code: "HAS_MODIFIED_SITE", title: "HAS MODIFIED SITE", type: 'PROTEIN' },
    { code: "CURATED_AFFECTS_INTERACTION_WITH", title: "CURATED AFFECTS INTERACTION WITH", type: 'PROTEIN' },
    { code: "IS_QCMARKER_IN_TISSUE", title: "IS QCMARKER IN TISSUE", type: 'PROTEIN' },
    { code: "IS_BIOMARKER_OF_DISEASE", title: "IS BIOMARKER OF DISEASE", type: 'PROTEIN' },
    { code: "IS_SUBSTRATE_OF", title: "IS SUBSTRATE OF", type: 'PROTEIN' },
    // PROTEIN END

    // BIOLOGICAL PROCESS START
    { title: 'HAS PARENT', code: "HAS_PARENT", type: 'BIOLOGICAL_PROCESS' },
    { title: 'ASSOCIATED WITH', code: "ASSOCIATED_WITH", type: 'BIOLOGICAL_PROCESS' },
    // BIOLOGICAL PROCESS END
  ]

  relationShipList: DropDowns[] = []
  selectedRelation = null
  endNode = null
  computedQuery = null



  ngOnInit(): void {
    this.LifeScienceProteinFileUploadService.accessionNumbers$.subscribe(numbers => {
      this.accessionNumbers = numbers;
      this.queryValue = numbers;
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.LifeScienceProteinFileUploadService.uploadFile(file);

  }

  // updateQueryValue(event: any) {
  //   const selectedAccession: string = event.target.value;
  //   console.log('Selected value:', selectedAccession); 
  //   this.queryValue = "MATCH (n:Protein) WHERE n.accession IN ["+ selectedAccession +"] RETURN n";
  //   console.log("Query Result:", this.queryResult);
  // }


  updateQueryValue() {
    // const formattedQueryValue = this.queryValue.split('\n').map(accession => `"${accession.trim()}"`).join(',');
    if (!this.nodeValue && !this.selectedRelation && !this.endNode) {
      alert('Please select atleast one option in order to continue')
      return
    }

    // "queryValue" contains selected accession code

    const _selectedAccns = this.queryValue && this.queryValue.length > 0 ?
      this.queryValue.map(accession => `"${accession.trim()}"`).join(',') : null

    // The above line checks if any accession are selected or not


    // Construct the Cypher query
    let cypherQuery = ''
    const _accessionNodes = ['protein']
    cypherQuery = `MATCH (n${this.getFiltValue(this.nodeValue)})-[r${this.getFiltValue(this.selectedRelation)}]-(m${this.getFiltValue(this.endNode)})`

    if (_accessionNodes.includes(this.nodeValue.toLowerCase()) && _selectedAccns) {
      cypherQuery = cypherQuery + ` WHERE n.accession IN [${_selectedAccns}] RETURN n, r, m`;
    } else {
      cypherQuery = cypherQuery + `RETURN n, r, m LIMIT 25`;
    }
    // here

    // If the user selected all options
    // MATCH (n:Disease)-[r:HAS_PARENT]-(m:Disease) RETURN n, r, m

    // if the user selected start node only
    // MATCH (n:Disease)-[r]-(m) RETURN n, r, m

    // if the user selected start node and relation only 
    // MATCH (n:Disease)-[r:relation_value]-(m) RETURN n, r, m

    console.log("formattedQueryValue:", _selectedAccns);
    console.log("cypherQuery", cypherQuery);
    this.computedQuery = cypherQuery

    this.queryService.submitQuery(cypherQuery).subscribe((result) => {
      this.setQueryData(result.queryResult);

    }, (error) => {
      console.error('An error occurred while processing the query:', error);
    });
  }

  getFiltValue(_value: string) {
    return `${_value ? ':' + _value : ''}`
  }


  submit() {
    this.updateQueryValue()
    // console.log("submitting a query: " + this.queryValue);
    // this.queryService.submitQuery(this.queryValue).subscribe((result) => {
    //   this.setQueryData(result.queryResult);
    // }, (error) => {
    //   console.error('An error occurred while processing the query:', error);
    // })
  }

  setQueryData(queryResult) {
    const allKeys = queryResult.map(object => Object.keys(object));
    const _columns = getUnitArray(allKeys.flat());
    this.tableColumns = _columns
    this.queryResult = queryResult.map(_item => ({
      ..._item,
      synonyms: _item.hasOwnProperty('synonyms') && _item.synonyms ? JSON.parse(_item.synonyms).join(', ') : ''
    }));
    console.log("Query Result:", this.queryResult);
    console.log('_columns:', _columns);
  }

  getItemValue(_key, _item) {
    try {
      return _item[_key]
    } catch {
      return 'N/A'
    }
  }

  onAccSelect($event) {
    setTimeout(() => {
      console.log('queryValue:', this.queryValue)
    }, 0)
  }

  onStartNodeSelect() {
    setTimeout(() => {
      if (this.nodeValue) {
        this.relationShipList = this.relationShipMst.filter(rel => rel.type === this.nodeValue.toUpperCase())
      } else {
        this.relationShipList = []
      }
    }, 10)
  }
}

interface DropDowns {
  title: string
  code: string
  type: string
}