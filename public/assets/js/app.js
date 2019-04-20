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
    // const player = document.getElementById('player');
    // const constraints = {
    //   video: true
    // };
    // navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    //   player.srcObject = stream;
    // })
    // .catch((err) => {
    //   const camContainer = document.getElementById('camera-container');
    //   camContainer.insertAdjacentHTML('beforeend', '<input type="file" accept="image/*">');
    //   console.log(camContainer);
    //   console.log({err});
    // })
  }
});


/**
 * Statistics and Foods Service 
 */
const loadHomeInfo = async function() {
  showLoading('loading-modal');
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('FETCHED', res);
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
      onsListItem.addEventListener('click', () =>  handleItemClick(food.id));
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
  }, 2000);
};
