import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() characters: any;
  @Output() sideAssigned = new EventEmitter<{name: string, side: string}>();

  constructor() { }

  ngOnInit(): void {
  }

  onSideAssigned(charInfo) {
    this.sideAssigned.emit(charInfo);
  }

}
