import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '../../core/Dom';

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
      const $resizes = $(event.target);
      const $parent = $resizes.closest('[data-type="resizes"]');
      const coords = $parent.getCoords();
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $parent.$el.style.width = `${value}px`;
        cells.forEach((el) => el.style.width = `${value}px`);
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}