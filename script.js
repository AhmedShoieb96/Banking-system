let containerMovements = document.querySelector(".movements");
let balanceLabel = document.querySelector(".balance__label");
let inputLabel = document.querySelector('.summary__value--in');
let outputLabel = document.querySelector('.summary__value--out');
let interestLabel = document.querySelector('.summary__value--interest')
let logInBtn = document.querySelector('.login__btn')
let userInput = document.querySelector('.login__input--user');
let passInput = document.querySelector('.login__input--pin');
let app = document.querySelector('.app');
let welcome = document.querySelector('.welcome');
let sortBtn = document.querySelector('.btn--sort')
let closeBtn = document.querySelector('.form__btn--close')
let userCloseName = document.querySelector('.form__input--user')
let userClosePass = document.querySelector('.form__input--pin')
let transeferBtn = document.querySelector('.form__btn--transfer')
let transfertoAccNameInput = document.querySelector('.form__input--to')
let transfertoAccAmountInput = document.querySelector('.form__input--amount')
let targetAcc;
const account1 = {
        id: 1,
        owner: "ahmed",
        movements: [1000, -220, 500, -100, 500],
        balance: 1000,
        interestRate: 0.1,
        pin: 1111
}
const account2 = {
        id: 2,
        owner: "Bob",
        movements: [-100, 2490, -300, 500, -100],
        balance: 200,
        interestRate: 0.2,
        pin: 2222

}
const account3 = {
        id: 3,
        owner: "Charlie",
        movements: [200, -9000, 300, -100, 500],
        balance: 300,
        interestRate: 0.3,
        pin: 333

}
const account4 = {
        id: 4,
        owner: "big",
        movements: [100, -202, 300, -100, 5990],
        balance: 600,
        interestRate: 0.4,
        pin: 4555

}

const accounts = [account1, account2, account3, account4];


let createUserName = (accounts) => {
        accounts.forEach(acc => {
                acc.userName = acc.owner.toLowerCase().split(" ").map(name => name[0]).join('')

        });


}
createUserName(accounts)
let currentDate = new Date;
let day = currentDate.getDay();
let month = currentDate.getMonth();
let year = currentDate.getFullYear();

let date = `${day}/ ${month}/ ${year} `
console.log(date);


// let movments = accounts.map((acc) => acc.movements);
// console.log(movments[0])
let displayMovments = (account, sorted = false) => {
        containerMovements.innerHTML = ''
        let movments = sorted ? account.movements.sort((a, b) => a - b) : account.movements
        movments.forEach((mov, i) => {
                console.log(mov)
                let type = mov > 0 ? 'deposit' : 'withdrawal';
                let html = `
         <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${date}</div>
          <div class="movements__value">${mov}</div>
        </div>`;
                containerMovements.insertAdjacentHTML('afterbegin', html)

        })

}
// displayMovments(account1);

let displayBalance = (account) => {
        account.balance = account.movements.reduce((acc, cur) => cur + acc, 0);
        balanceLabel.innerHTML = ` Acc ballance is : ${account.balance}$`
}


displaySumaryMovments = (account) => {
        // total input

        let totalInput = account.movements.filter(mov => mov > 0).reduce((acc, curr) => acc + curr, 0);
        inputLabel.innerHTML = `${totalInput} $`
        let totalOutput = account.movements.filter((mov) => mov < 0).reduce((acc, curr) => acc + curr, 0)
        outputLabel.innerHTML = `${totalOutput} $`;
        let totalInterest = account.movements.filter((mov) => mov > 0).reduce((acc, curr) => acc + curr, 0) * account.interestRate;
        interestLabel.innerHTML = `${totalInterest} $`;

}
clearLoginInput = () => {
        userInput.value = "";
        passInput.value = "";
}




app.style.opacity = 0;
logInBtn.addEventListener("click", function (e) {
        e.preventDefault();
        targetAcc = accounts.find(acc => acc.owner === userInput.value);
        if (targetAcc && targetAcc.pin === Number(passInput.value)) {
                welcome.innerHTML = `welcome back mr ${targetAcc.owner}`
                app.style.opacity = 100;
                displayMovments(targetAcc);
                displayBalance(targetAcc);
                displaySumaryMovments(targetAcc);
                clearLoginInput()


        } else {
                window.alert('please chick your data')
        }

})
let sortedStutas = false;
sortBtn.addEventListener('click', function () {
        displayMovments(targetAcc, !sortedStutas)
        sortedStutas = !sortedStutas;
})

transeferBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let amount = Number(transfertoAccAmountInput.value)
        let recievedAcc = accounts.find(acc => acc.owner === transfertoAccNameInput.value)
        if (recievedAcc && targetAcc.balance > amount && amount > 0 && recievedAcc != targetAcc) {
                targetAcc.movements.push(-amount)
                recievedAcc.movements.push(amount);
                displayMovments(targetAcc)
                displayBalance(targetAcc)
                displaySumaryMovments(targetAcc)


        }
})

closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        targetAcc = accounts.find(acc => acc.owner === userCloseName.value)
        if (targetAcc && targetAcc.pin === Number(userClosePass.value)) {
                let targetAccIndex = targetAcc.findIndex(acc => acc.owner === targetAcc.owner)
                targetAcc.movements.splice(targetAccIndex)
                app.style.opacity = 0;
        }
})

// let cards= []
// async function getData() {
//         let response = await fetch('https://jsonplaceholder.typicode.com/posts');
//         let data = await response.json()
//         console.log(data)
//         cards=data
// displaycard()
// }
// getData()
// function displaycard() {
//         let card = '';
//         for (let i = 0; i < cards.length; i++){
//                 card += ` <div class="col-lg-3 col-md-6 col-sm-12 p-4">
//                 <div class=" bg-warning text-dark p-3">
//                 <h4>post id : ${cards[i].id}</h4>
//                 <p> post name : ${cards[i].title}<p>
//                 </div>
//                 </div>`
//         }
// }