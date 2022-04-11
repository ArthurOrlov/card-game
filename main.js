function makeDigitList(range) {
  let i = 0;
  let list = [];
  while (i < 2) {
    for (let num = 1; num < range + 1; num++) {
      list.push(num);
    }
    i++
  }
  return list;
}


function fisherSort(list) {
  for (let i in list) {
    j = Math.floor(Math.random() * (list.length - 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}


function makeDiv(class_) {
  const div = document.createElement('div');
  div.classList.add(class_);
  return div;
}


function endConfirm(firstStr) {
  askText = `${firstStr} \nПоменять кол-во карточек?`
  ask = confirm(askText);
  if (ask) {
    window.location.href = window.location.href;
  } else {
    const cardCount = document.getElementsByClassName('play-card').length;
    document.querySelector('.container').remove();
    runPlay(cardCount);
  }
}


function makeCard(valueCard) {
  const li = document.createElement('li');
  li.classList.add('play-card', 'play-card__close');
  const p = document.createElement('p');
  p.classList.add('play-card__value');
  //p.style.display = 'none';
  p.textContent = valueCard;
  const div = makeDiv('play-card__value-wrapper');

  div.append(p);
  li.append(div);
  return li;
}


function makeList(cardCount = 16, timer) {
  let range = cardCount / 2;
  let valueList = makeDigitList(range);
  fisherSort(valueList);
  const ul = document.createElement('ul');
  ul.classList.add('card-list');

  for (let valueCard of valueList) {

    const li = makeCard(valueCard);

    li.addEventListener('click', () => {
      if (li.classList.contains('play-card__open')) {
        return
      }

      li.classList.toggle('play-card__open');

      if (document.querySelectorAll('.play-card__open').length == 2) {
        const item1 = document.querySelectorAll('.play-card__open')[0]
        const item2 = document.querySelectorAll('.play-card__open')[1]
        if (item1.querySelector('.play-card__value').textContent === item2.querySelector('.play-card__value').textContent) {
          item1.classList.add('play-card__open-finally')
          item2.classList.add('play-card__open-finally')
        }

        setTimeout(() => {
          item1.classList.remove('play-card__open')
          item2.classList.remove('play-card__open')
        }, 400)

        if (document.querySelectorAll('.play-card__open-finally').length === document.querySelectorAll('.play-card').length) {
          let btn = document.createElement('button');
          let textInBtn = document.createTextNode('ПОБЕДА!');

          btn.appendChild(textInBtn);

          document.body.appendChild(btn);
          btn.classList.add('finish-btn');
          document.querySelector('.container').remove();
          
          document.querySelector('.finish-btn').addEventListener('click', function() {
            document.querySelector('.finish-btn').style.display = 'none';
            document.querySelector('.form').style.display = 'flex';
          })
        }
      }
      /*li.querySelector('.play-card__value').style.display = 'inline-block';
      li.classList.toggle('play-card__close');
      li.classList.toggle('play-card__open');

      let selectedCard = document.getElementsByClassName('play-card__selected')[0];

      if (selectedCard === undefined) {
        li.classList.add('play-card__selected');
        return
      }

      if ((selectedCard.textContent !== li.textContent) && document.getElementsByClassName('play-card__open') < 3) {
        selectedCard.classList.add('play-card__close');
        selectedCard.classList.remove('play-card__open');
        selectedCard.classList.remove('play-card__selected');
        li.classList.add('play-card__selected');
      }

      else {
        selectedCard.classList.remove('play-card__selected');

        let btn = document.createElement('button');
        let textInBtn = document.createTextNode('ПОБЕДА!');
        btn.appendChild(textInBtn);

        setTimeout(() => {
          if (li.classList.toggle('play-card__close'); == 0) {
            clearTimeout(timer);
            document.body.appendChild(btn);
            btn.classList.add('finish-btn');
            document.querySelector('.container').remove();
            
            document.querySelector('.finish-btn').addEventListener('click', function() {
              document.querySelector('.finish-btn').style.display = 'none';
              document.querySelector('.form').style.display = 'flex';
            })
          }
        }, 100)
      }*/
    })

    ul.append(li);
  }
  return ul;
}


function runPlay(cardCount) {
  const timer = setTimeout(() => {
    endConfirm('Время вышло!')
  }, 60000);

  const container = makeDiv('container');
  const ulFull = makeList(cardCount, timer);

  container.append(ulFull);
  document.body.append(container);
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const input = form.querySelector('.input--card-count');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';

    let cardCount = input.value;

    if ((cardCount < 2) || (cardCount > 10)) {
      cardCount = 4
    } else if (input.value !== '') {
      cardCount = input.value % 2 === 0 ? input.value : input.value - 1
    } else {
      cardCount = 4;
    }

    let inputpow = Math.pow(cardCount, 2); 

    runPlay(inputpow);
  })
})