import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizesTable } from './table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizesTable(this.$root, event);
    }
  }
}
