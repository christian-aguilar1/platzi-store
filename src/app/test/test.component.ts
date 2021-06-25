import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public inputControl: FormControl | undefined;
  public autocompleteControl: FormControl | undefined;
	public listOptions: Array<string>;

  constructor() {
    this.listOptions = ['One', 'Two', 'Three'];
  }

  public ngOnInit(): void {
    this.inputControl = new FormControl();
    this.autocompleteControl = new FormControl();
  }

}
