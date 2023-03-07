import { $ } from '../../core/Dom';

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resized = $(event.target);
    const $parent = $resized.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resized.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resized.css({
      opacity: 1,
      [sideProp]: '-5000px',
    });

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resized.css({ right: `${-delta}px` });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resized.css({ bottom: `${-delta}px` });
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

      resolve({
        value,
        type,
        id: $parent.data[type],
      });

      $resized.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
}
