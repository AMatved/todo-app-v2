// Base64 encoded icons - embedded directly to avoid file serving issues
window.ICONS_DATA = {
  trash: null,
  brand: null
};

// Load icons from JSON file
fetch('/icons-base64.json')
  .then(response => response.json())
  .then(data => {
    window.ICONS_DATA.trash = data.trash;
    window.ICONS_DATA.brand = data.brand;

    // Update trash icon if exists
    const trashImg = document.querySelector('.trash-icon-img');
    if (trashImg && window.ICONS_DATA.trash) {
      trashImg.src = window.ICONS_DATA.trash;
    }

    // Update brand icon if exists
    const brandImg = document.querySelector('.brand-icon');
    if (brandImg && brandImg.tagName === 'IMG' && window.ICONS_DATA.brand) {
      brandImg.src = window.ICONS_DATA.brand;
    }
  })
  .catch(err => {
    console.warn('Failed to load icons data:', err);
  });
