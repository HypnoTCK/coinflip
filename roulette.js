let numRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
let wheelnumbersAC = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];

function buildWheel(){
	let wheel = document.createElement('div');
	wheel.setAttribute('class', 'wheel');

	let numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
	for(i = 0; i < numbers.length; i++){
		let a = i + 1;
		let spanClass = (numbers[i] < 10)? 'single' : 'double';
		let sect = document.createElement('div');
		sect.setAttribute('id', 'sect'+a);
		sect.setAttribute('class', 'sect');
		let span = document.createElement('span');
		span.setAttribute('class', spanClass);
		span.innerText = numbers[i];
		sect.append(span);
		let block = document.createElement('div');
		block.setAttribute('class', 'block');
		sect.append(block);
		wheel.append(sect);
	}

	let pocketsRim = document.createElement('div');
	pocketsRim.setAttribute('class', 'pocketsRim');
	wheel.append(pocketsRim);

	let ballTrack = document.createElement('div');
	ballTrack.setAttribute('class', 'ballTrack');
	let ball = document.createElement('div');
	ball.setAttribute('class', 'ball');
	ballTrack.append(ball);
	wheel.append(ballTrack);

	let pockets = document.createElement('div');
	pockets.setAttribute('class', 'pockets');
	wheel.append(pockets);

	let cone = document.createElement('div');
	cone.setAttribute('class', 'cone');
	wheel.append(cone);

	let turret = document.createElement('div');
	turret.setAttribute('class', 'turret');
	wheel.append(turret);

	let turretHandle = document.createElement('div');
	turretHandle.setAttribute('class', 'turretHandle');
	let thendOne = document.createElement('div');
	thendOne.setAttribute('class', 'thendOne');
	turretHandle.append(thendOne);
	let thendTwo = document.createElement('div');
	thendTwo.setAttribute('class', 'thendTwo');
	turretHandle.append(thendTwo);
	wheel.append(turretHandle);

	document.querySelector('#roulette-container').append(wheel);
}

buildWheel()

let roulette = document.getElementsByClassName('wheel')[0];
let ballTrack = document.getElementsByClassName('ballTrack')[0];

const spinDuration = 5 * 1000;
const ballDuration = 3;

function rouletteSpin(){
	var winningSpin = Math.floor(Math.random() * 37);
	spinRoulette(winningSpin);
	setTimeout(function(){
		let colour = (numRed.includes(winningSpin))? 'red' : ((winningSpin == 0)? 'green' : 'black');
        
        if(colour == 'black'){
            document.querySelector('#roulette-result').innerHTML = `RESULT: <span style='background-color: ${colour};color: white;padding: 5px'>${colour.toUpperCase()}</span> ${winningSpin} `
        }else{
            document.querySelector('#roulette-result').innerHTML = `RESULT: <span style='background-color: ${colour};padding: 5px'>${colour.toUpperCase()}</span> ${winningSpin}`
        }
	}, spinDuration - 500);
}

function spinRoulette(winningSpin) {
    
    let degree;

    for (let i = 0; i < wheelnumbersAC.length; i++) {
        if (wheelnumbersAC[i] === winningSpin) {
            degree = (i * 9.73) + 362;
        }
    }

    cleanUpPreviousAnimations();

    roulette.style.transition = `transform ${spinDuration}ms cubic-bezier(0.25, 0.8, 0.25, 1)`;
    roulette.style.transform = `rotate(${360 * 5 + degree}deg)`; // Rotate wheel to the final position

    // reset animation
    ballTrack.style.animation = '';

    setTimeout(function() {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerText = `
            @keyframes ballStop {
                from { transform: rotate(0deg); }
                to { transform: rotate(-${degree}deg); }
            }
        `;
        document.head.appendChild(style);

        ballTrack.style.animation = `ballStop ${ballDuration}s ease-out forwards`;
    }, 1000); // 1s offset for the animation
}

function cleanUpPreviousAnimations() {

    roulette.style.transition = '';
    roulette.style.transform = '';

    ballTrack.style.animation = '';
    let styles = document.head.getElementsByTagName('style');
    for (let i = 0; i < styles.length; i++) {
        if (styles[i].innerText.includes('ballStop')) {
            document.head.removeChild(styles[i]);
        }
    }
}
