
const parent = document.querySelector('.svg');
const parentWidth = parent.getAttribute('width') -20;
const parentHeight = parent.getAttribute('height') -20;
const path = document.querySelector('.path');
let distanse;
let pointAmmount;


renderChart();
parent.addEventListener('click', renderChart);


// ============  functions  ==================>

function generatePoints(array){  
  const points = array.map((item, index) => {
    if(index == 0){
      return `
        <circle cx="${item.x + 10}" cy="${item.y + 10}" r="5" fill="white"/>
      `
    }else{
      return `
        <circle cx="${item.x}" cy="${item.y + 10}" r="5" fill="white"/>
      `
    }
  })
  return points.join('');
}

function generatePath(array){
  let path = 'M10 10 V490 H690 '
  for(i = 0; i < array.length; ++i){
    if(i == 0){
      path += `M${array[i].x + 10} ${array[i].y + 10} `
    }else if(i == 1){
      path += `L${array[i].x} ${array[i].y + 10} `
    }else{
      path += `${array[i].x} ${array[i].y + 10} `
    }
  }
  return `
    <path class="path" d='${path}' fill="transparent" stroke="black" />
  `
}

function getRandom(min, max){
  return ~~(Math.random() * (max - min) +min);
}

function renderChart(){
  pointAmmount = getRandom(2, 11);
  distanse = parentWidth / (pointAmmount - 1);
  const coords = generateData();
  const path = generatePath(coords);
  const points = generatePoints(coords);
  parent.innerHTML = '';
  parent.insertAdjacentHTML('beforeend', path);
  parent.insertAdjacentHTML('beforeend', points);
}

function generateData(){
  const coords = [];
  for( let i = 0; i < pointAmmount; ++i){
    const point = {};
    if(i == 0){
      point.x = 0;
    }else{
      point.x = ~~(coords[i-1].x + distanse);
    }
    point.y = getRandom(0, parentHeight);
    coords.push(point);
  }
  return coords;
}