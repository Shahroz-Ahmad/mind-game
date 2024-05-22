// JavaScript
var inp1 = document.querySelector('#FIRST')
var inp2 = document.querySelector('#SECOND')
var btn = document.querySelector('button')
var dice1 = document.querySelector('#dice1')
var dice2 = document.querySelector('#dice2')
var headinng = document.querySelector('.heading')
var tablee = document.querySelector('table')

var arr = []

console.log(inp1, inp2, btn, dice1, dice2, headinng);

function playGame() {
    if (inp1.value === '' || inp2.value === '') {
        alert('Fill in all the inputs')
    } else {
        btn.disabled = true;
        dice1.classList.add('rotating');
        dice2.classList.add('rotating');

        setTimeout(() => {
            var randomnumber1 = parseInt(Math.random() * 7) ;
            var randomnumber2 = parseInt(Math.random() * 6) + 1;

            dice1.classList.remove('rotating');
            dice2.classList.remove('rotating');

            var sequence1 = generateSequence(randomnumber1);
            var sequence2 = generateSequence(randomnumber2);

            showSequence(dice1, sequence1);
            showSequence(dice2, sequence2);

            setTimeout(() => {
                dice1.setAttribute('src', `dice${randomnumber1}.png`);
                dice2.setAttribute('src', `dice${randomnumber2}.png`);

                if (randomnumber1 > randomnumber2) {
                    headinng.innerText = inp1.value;
                } else if (randomnumber1 < randomnumber2) {
                    headinng.innerHTML = inp2.value;
                } else if (randomnumber1 == randomnumber2) {
                    headinng.innerHTML = 'DRAW';
                }

                const winnerz = randomnumber1 > randomnumber2 ? inp1.value : randomnumber1 < randomnumber2 ? inp2.value : 'draw';

                var obj = {
                    firstPlayer: inp1.value,
                    secondPlayer: inp2.value,
                    winner: winnerz
                };
                arr.push(obj);
                inp1.value = '';
                inp2.value = '';
                showdata();
                btn.disabled = false; 
            }, 1000); 
        }, 2000);
    }
}

function generateSequence(number) {
    
    var sequence = [];
    for (var i = 1; i <= 6; i++) {
        sequence.push((number + i - 1) % 6 + 1);
    }
    return sequence;
}

function showSequence(dice, sequence) {
    var i = 0;
    var interval = setInterval(() => {
        dice.setAttribute('src', `dice${sequence[i]}.png`);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 200); 
}

// ... (rest of your code) ...
function showdata() {
    tablee.innerHTML = `<tr>
    <th>Index</th>
    <th>player1</th>
    <th>player2</th>
    <th>winner</th>

</tr>`
    arr.map((ele, i) => {
        tablee.innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${ele.firstPlayer}</td>
            <td>${ele.secondPlayer}</td>
            <td>${ele.winner}</td>
        </tr>
            `
    })
}