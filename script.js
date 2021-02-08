let vote = document.querySelector('.row-01 span');
let office = document.querySelector('.row-02 span');
let numbers = document.querySelector('.row-03');
let description = document.querySelector('.row-04');
let warning = document.querySelector('.screen-about');
let lateral = document.querySelector('.image-area');

let stageCurrent = 0;
let number = '';
let blankVote = false;

function startStage() {
  let stage = stages[stageCurrent];

  let numberHtml = '';
  number = '';
  blankVote = false;

  for (let i=0; i < stage.numbers; i++) {
    if (i === 0) {
      numberHtml += '<div class="number blink"></div>';
    } else {
      numberHtml += '<div class="number"></div>';
    }
  }

  vote.style.display = 'none';
  office.innerHTML = stage.title;
  numbers.innerHTML = numberHtml;
  description.innerHTML = '';
  warning.style.display = 'none';
  lateral.innerHTML = '';
}

function updateInterface() {
  let stage = stages[stageCurrent];
  let candidate = stage.candidate.filter((item)=>{
    if (item.numberCandidate === number) {
      return true;
    } else {
      return false;
    }
  });

  console.log(candidate)
  if (candidate.length > 0) {
    candidate = candidate[0];
    vote.style.display = 'block';
    warning.style.display = 'block';
    description.innerHTML = `Nome: ${candidate.nameCandidate}<br/>Partido: ${candidate.partyCandidate}`;

    let photosHtml = '';
    for (let i in candidate.photos) {
      if (candidate.photos[i].small) {
        photosHtml += `<div class="image small">
      <img src="${candidate.photos[i].url}" alt=""> ${candidate.photos[i].legend}
    </div>`;
      } else {
        photosHtml += `<div class="image">
        <img src="${candidate.photos[i].url}" alt=""> ${candidate.photos[i].legend}</div>`;
      } 
    }
    lateral.innerHTML = photosHtml;
    
  } else {
    vote.style.display = 'block';
    warning.style.display = 'block';
    description.innerHTML = '<div class="warning-01 blink">VOTO NULO</div>'
  }

}

function clickNumber(n) {
  let elementNumber = document.querySelector('.number.blink');
  if (elementNumber !== null) {
    elementNumber.innerHTML = n;
    number = `${number}${n}`;

    elementNumber.classList.remove('blink');
    if (elementNumber.nextElementSibling !== null) {
      elementNumber.nextElementSibling.classList.add('blink');
    } else {
      updateInterface();
    }
  }
}

function blank() {
  if (number === '') {
    blankVote = true;
    vote.style.display = 'block';
    warning.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = '<div class="warning-01 blink">VOTO EM BRANCO</div>'
    lateral.innerHTML = '';
  } else {
    alert('Para votar em BRANCO, não pode ter digitado nenhum número!')
  }
}

function restart() {
  startStage();
}

function confirm() {
  let stage = stages[stageCurrent];

  let voteConfirm = false;

  if (blankVote === true) {
    voteConfirm = true;
  } else if (number.length === stage.numbers) {
    voteConfirm = true;
  }

  if (voteConfirm) {
    stageCurrent++;
    if (stages[stageCurrent] !== undefined) {
      startStage();
    } else {
      document.querySelector('.screen').innerHTML = '<div class="warning-02 blink">FIM</div>'
    }
  }
}

startStage();