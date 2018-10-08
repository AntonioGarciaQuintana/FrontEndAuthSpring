import { OnInit, Input, EventEmitter, Component } from '@angular/core';
import { Sort } from '../../model/sort';

@Component({
    selector: 'app-column-sorter',
    templateUrl: './column-sort.component.html'
 })
export class SortColumnComponent implements OnInit {

    @Input() eventSorting: EventEmitter<Sort>;
    @Input() text: string;
    @Input() property: string;

    ASC_DIR = 'asc';
    DESC_DIR = 'desc';

    sorter: Sort;

    ngOnInit() {
        this.sorter = new Sort(this.property);
    }

    onChangeSorting() {
        switch (this.sorter.dir) {
            case this.ASC_DIR:
                this.sorter.dir = this.DESC_DIR;
                break;
            case this.DESC_DIR:
                this.sorter.dir = this.ASC_DIR;
                break;
            default:
                this.sorter.dir = this.ASC_DIR;
        }
        this.eventSorting.emit(this.sorter);
    }
}
