import { $ } from '../../core/Dom';

export function resizesTable($root, event) {
  const $resizes = $(event.target);
  const $parent = $resizes.closest('[data-type="resizes"]');
  const coords = $parent.getCoords();
  const type = $resizes.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let value;
  $resizes.css({
    opacity: 1,
    [sideProp]: '-3000px',
  });
  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizes.css({ right: `${-delta}px` });
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizes.css({ bottom: `${-delta}px` });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      $parent.css({ width: `${value}px` });
      $root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => el.style.width = `${value}px`);
    } else {
      $parent.css({ height: `${value}px` });
    }

    $resizes.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}
