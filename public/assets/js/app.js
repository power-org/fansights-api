ons.platform.select('ios');

/**
 *   Page Event Change Listener
 */
document.addEventListener('init', function(event) {
  const page = event.target;
  if (page.id === 'food-info') {
    console.log(page.data);
    const { id, name, description, img } = page.data;
    page.querySelector('ons-toolbar .center').innerHTML = page.data.name;
    page.querySelector('#fi-img').src = img;
    page.querySelector('#fi-title').innerHTML = name;
    page.querySelector('#fi-subtitle').innerHTML = description;
  }
});
