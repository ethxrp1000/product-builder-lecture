class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const number = this.getAttribute('number');

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'ball');
        wrapper.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            .ball {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #f1c40f;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: bold;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                animation: appear 0.5s ease-in-out;
                margin: 5px;
            }

            @keyframes appear {
                from {
                    transform: scale(0);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

function generateLottoNumbers() {
    lottoNumbersContainer.innerHTML = ''; // Clear previous numbers

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.classList.add('lotto-row');
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach(number => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            row.appendChild(lottoBall);
        });
        lottoNumbersContainer.appendChild(row);
    }
}

generateBtn.addEventListener('click', generateLottoNumbers);

// Initial generation
generateLottoNumbers();