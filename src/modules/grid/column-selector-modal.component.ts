import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { SkyModalComponent } from '../modal';
import { SkyListComponent } from '../list';

@Component({
  selector: 'sky-column-selector',
  templateUrl: './column-selector-modal.component.html'
})
export class SkyColumnSelectorComponent {
  @Output() public columnsChanged: EventEmitter<string[]> = new EventEmitter<string[]>();
  @ViewChild(SkyModalComponent) private modal: SkyModalComponent;
  @ViewChild('list') private list: SkyListComponent;

  constructor(
    private gridState: GridState,
    private gridDispatcher: GridStateDispatcher
  ) {
  }

  get columns() {
    return this.gridState.map(s => s.columns.items);
  }

  get displayedColumnIds() {
    return this.gridState.map(s => s.displayedColumns.items.map(c => c.id));
  }

  public applyChanges() {
    this.list.selectedItems
      .take(1)
      .subscribe(columns => {
        this.columnsChanged.emit(columns.map(c => c.id));
        this.modal.closeButtonClick();
      });
  }
}
