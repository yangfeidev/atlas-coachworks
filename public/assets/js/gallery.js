(function () {
  var grid = document.querySelector('.gallery-page .gallery-grid');
  if (!grid) return;
  var items = Array.from(grid.querySelectorAll('.gallery-item'));
  var gap = 10;

  function layout() {
    var width = grid.clientWidth;
    if (!width) return;
    var columns = window.innerWidth <= 767 ? 1 : window.innerWidth <= 1024 ? 2 : 4;
    var columnWidth = (width - gap * (columns - 1)) / columns;
    var heights = Array(columns).fill(0);
    grid.classList.add('is-masonry');
    items.forEach(function (item) {
      var image = item.querySelector('img');
      var imageWidth = Number(image.getAttribute('width')) || image.naturalWidth || 1;
      var imageHeight = Number(image.getAttribute('height')) || image.naturalHeight || 1;
      var column = heights.indexOf(Math.min.apply(null, heights));
      item.style.width = columnWidth + 'px';
      item.style.transform = 'translate(' + (column * (columnWidth + gap)) + 'px,' + heights[column] + 'px)';
      heights[column] += columnWidth * imageHeight / imageWidth + gap;
    });
    grid.style.height = Math.max.apply(null, heights) - gap + 'px';
  }

  window.addEventListener('resize', layout);
  layout();
})();
