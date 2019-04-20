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
    fakeLoading('food-info-modal');
    console.log(page.data);
    const { id, name, description, img } = page.data;
    page.querySelector('ons-toolbar .center').innerHTML = page.data.name;
    page.querySelector('#fi-img').src = img;
    page.querySelector('#fi-title').innerHTML = name;
    page.querySelector('#fi-subtitle').innerHTML = description;
  } else if (page.id === 'post-food-page') {
    console.log(page.data);
  }
});

/**
 * Tab Change Event Listener
 */

document.addEventListener('prechange', function(event) {
  if (event.activeIndex === 1) {
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
          document
            .querySelector('#photo-viewer')
            .setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }

      submitPhoto(selectedImg);
    });

    browseFiles.onclick = function() {
      document.body.onfocus = checkFile();
    };

    const checkFile = function() {
      if (!browseFiles.value.length) {
        const tabBar = document.querySelector('ons-tabbar');
        console.log('TABBAR', ons);
        // TODO: Return to tab
        //tabBar.setActive(0);
      }
      document.body.onfocus = null;
    };

    const tags = [
      [
        {
          id: 1,
          name: 'cheese',
          long_desc: 'This is a cheese 1'
        },
        {
          id: 2,
          name: 'cheese',
          long_desc: 'This is a cheese 2'
        }
      ],
      [
        {
          id: 3,
          name: 'bun',
          long_desc: 'This is a bun 1'
        },
        {
          id: 4,
          name: 'bun',
          long_desc: 'This is a bun 2'
        }
      ],
      [
        {
          id: 5,
          name: 'lettuce',
          long_desc: 'This is a lettuce 1'
        },
        {
          id: 6,
          name: 'lettuce',
          long_desc: 'This is a lettuce 2'
        }
      ]
    ];

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
          onsSelectListItem += `<option value="${tag.id}">${tag.name} - ${tag.long_desc}</option>`;
          onsSelect.innerHTML = onsSelectListItem;
        });
        onsSelectListItem = '';
        document.querySelector('#select-tags').appendChild(onsSelect);
        
        const removeTag = document.createElement('span');
        removeTag.setAttribute('id', `tag=remove-${index + 1}`);
        removeTag.addEventListener('click', (e) => {
          e.target.parentElement.removeChild(document.getElementById(`tag-list-item-${index + 1}`));
          document.getElementById(`tag=remove-${index + 1}`).remove();
        });
        removeTag.innerHTML = 'Remove'
        document.querySelector('#select-tags').appendChild(removeTag);
  
      });
    }
  }
});

const editSelects = function(event) {
  document.getElementById('choose-sel').removeAttribute('modifier');
  if (
    event.target.value == 'material' ||
    event.target.value == 'underbar'
  ) {
    console.log(event);
    document
      .getElementById('choose-sel')
      .setAttribute('modifier', event.target.value);
  }
}

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
        labels: ['Bacon', 'Hotdog', 'Siomai'],
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
            data: [3, 10, 5]
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

    const foods = [
      {
        id: 1,
        name: 'Bacon',
        description:
          'Bacon is a type of salt-cured pork. Bacon is prepared from several different cuts of meat, typically from the pork belly or from back cuts, which have...',
        img:
          'https://thebakermama.com/wp-content/uploads/2018/08/fullsizeoutput_15a7c.jpg'
      },
      {
        id: 2,
        name: 'Hotdog',
        description:
          'The hot dog or dog is a grilled or steamed link-sausage sandwich where the sausage is served in the slit of a partially sliced hot dog bun, a bun of...',
        img:
          'https://5i0b63wqszy3rogfx27pxco1-wpengine.netdna-ssl.com/wp-content/uploads/Basic-Hot-Dogs2-600x500.jpg'
      },
      {
        id: 1,
        name: 'Bacon',
        description:
          'Bacon is a type of salt-cured pork. Bacon is prepared from several different cuts of meat, typically from the pork belly or from back cuts, which have...',
        img:
          'https://thebakermama.com/wp-content/uploads/2018/08/fullsizeoutput_15a7c.jpg'
      },
      {
        id: 2,
        name: 'Hotdog',
        description:
          'The hot dog or dog is a grilled or steamed link-sausage sandwich where the sausage is served in the slit of a partially sliced hot dog bun, a bun of...',
        img:
          'https://5i0b63wqszy3rogfx27pxco1-wpengine.netdna-ssl.com/wp-content/uploads/Basic-Hot-Dogs2-600x500.jpg'
      },
      {
        id: 1,
        name: 'Bacon',
        description:
          'Bacon is a type of salt-cured pork. Bacon is prepared from several different cuts of meat, typically from the pork belly or from back cuts, which have...',
        img:
          'https://thebakermama.com/wp-content/uploads/2018/08/fullsizeoutput_15a7c.jpg'
      },
      {
        id: 2,
        name: 'Hotdog',
        description:
          'The hot dog or dog is a grilled or steamed link-sausage sandwich where the sausage is served in the slit of a partially sliced hot dog bun, a bun of...',
        img:
          'https://5i0b63wqszy3rogfx27pxco1-wpengine.netdna-ssl.com/wp-content/uploads/Basic-Hot-Dogs2-600x500.jpg'
      }
    ];

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
            <img class="list-item__thumbnail" src="${food.img}">
        </div>
        <div class="center">
            <span class="list-item__title">${
              food.name
            }</span><span class="list-item__subtitle">${food.description}</span>
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
 * Upload selected photo service
 */
const submitPhoto = function(photo) {
  fakeLoading('loading-modal');
  const formData = new FormData();
  formData.append('photo', photo);
  console.log('FORM DATA', formData.get('photo'));
  // const nav = document.getElementById('appNavigator');
  // nav.pushPage('food-post.html', { data: photo });

  // axios
  //   .post('/url', formData)
  //   .then(result => {})
  //   .catch(err => {});
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
