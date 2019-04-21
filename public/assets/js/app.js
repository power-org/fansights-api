/**
 * Forcing our app to use ios layout on any platform when browsed
 */
ons.platform.select('ios');

/**
 *   Page Event Change Listener
 */
document.addEventListener('init', function(event) {
  const page = event.target;
  if (page.id === 'food-info') {
    showLoading('food-info-modal');
    console.log(page.data);
    const { id, caption, picture, details } = page.data;
    let foodInfo = [];
    page.querySelector('ons-toolbar .center').innerHTML = page.data.caption;
    page.querySelector('#fi-img').src = picture;
    page.querySelector('#fi-title').innerHTML = caption;
    page.querySelector('#fi-subtitle').innerHTML = page.data.details.reduce(
      (curr, d) => (curr += d.long_desc),
      ''
    );

    axios
      .get(`/api/me/${id}`)
      .then(result => {
        foodInfo = result.data;
        let contains = foodInfo.details.map(d => d.tag);
        let td = foodInfo.nutrients.map(e=>{
          return `
            <tr>
              <td>${e.nutr_desc}</td>
              <td>${e.units}</td>
              <td>${e.nutr_val.toFixed(2)}</td>
            </tr>
          `;
        });
        document.querySelector('#fi-nutrients-table tbody').innerHTML = td;

        page.querySelector('#fi-ingredients').innerHTML = contains.join(',');
        hideLoading('food-info-modal');
      })
      .catch(err => {
        hideLoading('food-info-modal');
        console.log(err);
        ons.notification.alert('Failed to get food information');
      });
  } else if (page.id === 'post-food-page') {
    console.log(page.data);
  }
});

/**
 * Tab Change Event Listener
 */

document.addEventListener('prechange', function(event) {
  if (event.activeIndex === 1) {
    initFoodPost();
  } else if (event.activeIndex === 2) {
    loadProfileInfo();
  }
});

const editSelects = function(event) {
  document.getElementById('choose-sel').removeAttribute('modifier');
  if (event.target.value == 'material' || event.target.value == 'underbar') {
    console.log(event);
    document
      .getElementById('choose-sel')
      .setAttribute('modifier', event.target.value);
  }
};

/**
 * Statistics and Foods Service
 */
const loadHomeInfo = async function() {
  showLoading('loading-modal');
  try {
    // const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    // console.log('FETCHED', res);
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',

      // The data for our dataset
      data: {
        labels: window.USER.topTagsToday.map(e=>e.tag),
        datasets: [
          {
            label: 'My Foods',
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 99, 66)',
              'rgb(255, 99, 198)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 99, 66)',
              'rgb(255, 99, 198)'
            ],
            data: window.USER.topTagsToday.map(e=>e.count)
          }
        ]
      },

      options: {
        legend: {
          labels: {
            fontColor: 'white',
            // padding: 35
            boxWidth: 30,
            position: 'absolute'
          },
          position: 'right'
        }
      }
    });

    const foods = window.USER.meals;
    /**
     *   Push to another page on item click
     */
    const handleItemClick = function(foodId) {
      const selectedFood = foods.find(food => food.id === foodId);
      const nav = document.getElementById('appNavigator');
      nav.pushPage('food-info.html', { data: selectedFood });
    };

    /**
     *   List all foods from server reponse
     */
    const list = document.getElementById('food-list');

    const items = foods.map(food => {
      const onsListItem = document.createElement('ons-list-item');
      onsListItem.addEventListener('click', () => handleItemClick(food.id));
      onsListItem.innerHTML = `
        <div class="left">
            <img class="list-item__thumbnail" src="${food.picture}">
        </div>
        <div class="center">
            <span class="list-item__title">${
              food.caption
            }</span><span class="list-item__subtitle">${food.details.reduce(
        (curr, d) => (curr += d.long_desc),
        ''
      )}</span>
        </div>
    `;
      return onsListItem;
    });

    items.forEach(item => {
      list.appendChild(item);
    });
  } catch (error) {
    console.log('Request Error', error);
  }
  hideLoading('loading-modal');
};

/**
 * Initialize file upload and preset data
 */
const initFoodPost = function() {
  document.getElementById('ct-browse-file').click();

  /**
   *   Listen to local file browsing
   */
  const browseFiles = document.getElementById('ct-browse-file');
  browseFiles.addEventListener('change', e => {
    const selectedImg = e.target.files[0];
    const input = e.target;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        const photoViewer = document.querySelector('#photo-viewer');
        photoViewer.setAttribute('src', e.target.result)
        photoViewer.onclick = function() {
          document.getElementById('ct-browse-file').click();
        }

      };

      reader.readAsDataURL(input.files[0]);
      analyzePhoto(selectedImg);
    }
  });

  browseFiles.onclick = function() {
    document.body.onfocus = checkFile();
  };

  const checkFile = function() {
    if (!browseFiles.value.length) {
      // const tabBar = document.querySelector('ons-tabbar');
      // document.getElementById('appNavigator').resetToPage('home-page');
      console.log(document.getElementById('appNavigator'));
      // TODO: Return to tab 1
      //tabBar.setActive(0);
    }
    document.body.onfocus = null;
  };
};

/**
 * Load profile information
 */
const loadProfileInfo = function() {
  console.log('LOADING PROFILE');
  document.querySelector('#pp-name').innerText = window.USER.name;
  document.querySelector('#pp-email').innerText = window.USER.email;
  document.querySelector('#pp-profile').src = window.USER.profile;
  const dsHeavyMeal = document.getElementById('pp-heavy-meal');
  const dsSnackMeal = document.getElementById('pp-snack-meal');

  dsHeavyMeal.addEventListener('onchange', e => {
    console.log('heavy', e.target.value);
  });

  dsSnackMeal.addEventListener('onchange', e => {
    console.log('snack', e.target.value);
  });
};

/**
 * Analyze selected photo service
 */
const analyzePhoto = function(photo) {
  let type = '';
  ons
    .openActionSheet({
      title: 'Choose from food type',
      cancelable: true,
      buttons: [
        'Meal',
        'Snack',
        {
          label: 'Cancel',
          icon: 'md-close'
        }
      ]
    })
    .then(function(index) {
      if (index === 0) type = 'real_food';
      else if (index === 1) type = 'junk_food';
      else document.getElementById('ct-browse-file').click();

      showLoading('loading-modal');
      const formData = new FormData();
      formData.append(type, photo);
      axios
        .post('/api/upload', formData)
        .then(result => {
          console.log(result);
          const tags = result.data;

          // const onsSelect = document.createElement('ons-select');
          // onsSelect.setAttribute('id', 1);
          const os = document.querySelector('ons-select');
          console.log('os', os);
          if (document.contains(os)) {
            os.remove();
            // document.querySelectorAll('.someselector').forEach(el => el.remove());
          } else {
            tags.forEach((groups, index) => {
              console.log('GROUPS', groups);
              let onsSelect = document.createElement('ons-select');
              onsSelect.setAttribute('id', `tag-list-item-${index + 1}`);

              let onsSelectListItem = '';
              groups.forEach(tag => {
                onsSelectListItem += `<option value="${tag.id}">${tag.name} - ${
                  tag.long_desc
                }</option>`;
                onsSelect.innerHTML = onsSelectListItem;
              });
              onsSelectListItem = '';
              document.querySelector('#select-tags').appendChild(onsSelect);

              const removeTag = document.createElement('span');
              removeTag.setAttribute('id', `tag=remove-${index + 1}`);
              removeTag.addEventListener('click', e => {
                e.target.parentElement.removeChild(
                  document.getElementById(`tag-list-item-${index + 1}`)
                );
                document.getElementById(`tag=remove-${index + 1}`).remove();
              });
              removeTag.innerHTML = 'Remove';
              document.querySelector('#select-tags').appendChild(removeTag);
            });

            const postButton = document.createElement('ons-button');
            postButton.setAttribute('modifier', 'large');
            postButton.innerHTML = 'Post this photo';
            postButton.onclick = function() {
              const caption = document.querySelector('#ct-caption').value;
              const customTags = document.querySelector('#ct-tags').value;
              formData.append('caption', caption);
              formData.append('tag', customTags);

              // formData.append('caption', tags);
              console.log('POSTING PHOTO...', caption);
            };
            document.querySelector('#select-tags').append(postButton);
          }
          hideLoading('loading-modal');
        })
        .catch(err => {
          hideLoading('loading-modal');
          ons.notification.alert('Error analyzing photo');
        });
    });
};

const openDietSettings = function() {
  showLoading('pp-diet-settings-modal');
};

const closeDietSettings = function() {
  hideLoading('pp-diet-settings-modal');
};

const saveDietSettings = function() {
  console.log('Saving diet settings..');
};

/**
 *  Loading Modal
 */

const showLoading = function(modal) {
  const loadingModal = document.getElementById(modal);
  loadingModal.show();
};

const hideLoading = function(modal) {
  const loadingModal = document.getElementById(modal);
  loadingModal.hide();
};

const fakeLoading = function(modal) {
  showLoading(modal);
  setTimeout(function() {
    hideLoading(modal);
  }, 100);
};

const getUniqueArray = function(arr) {
  return arr.filter(function(item, index) {
    return arr.indexOf(item) >= index;
  });
};

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (401 === error.response.status) {
      ons.notification.alert('Session expired').then(() => {
        window.location.href = '/';
      });
    } else {
      return Promise.reject(error);
    }
  }
);
