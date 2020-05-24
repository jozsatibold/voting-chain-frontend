import {Component, Input} from "@angular/core";
import {Type} from "@global/entities";

@Component({
  selector: 'vc-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.scss']
})
export class ListElementComponent {

  @Input() size = 4;
  @Input() data: {
    id: number,
    name?: string,
    title?: string,
    type: Type,
    date: Date
  } = null;
  constructor() {
  }
}
