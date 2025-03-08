const balance = document.getElementById("balance"),
moneyPlus = document.getElementById("moneyPlus"),
moneyMins = document.getElementById("moneyMins"),
list = document.getElementById("list"),
form = document.getElementById("form"),
text = document.getElementById("text"),
amount = document.getElementById("amount"),
expensedate = document.getElementById("expensedate");

let transactions = [];

form.addEventListener("submit", addTransaction);
function addTransaction(e) {
    e.preventDefault();
    const transtaion = {id:generateID(), text: text.value, amount:amount.value, expensedate:expensedate.value};

    addTransactionDOM(transtaion);
    transactions.push(transtaion);
    updateTransaction();

    text.value ="";
    amount.value=" ";
    init();
}

function generateID(){
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transtaion){
    const sign = transtaion.amount<0?"-":"+";
    const Item = document.createElement("li");

    Item.classList.add(transtaion.amount<0?"minus":"plus");

    Item.innerHTML =`${transtaion.text}<div><span>${sign} $${Math.abs(transtaion.amount)}</span> </div><div>${transtaion.expensedate}</div><div><button class ="delete" onclick="removeTransaction(${transtaion.id})">X<button></div>`;
     list.appendChild(Item);

}

function removeTransaction(id){
  transactions = transactions.filter((transaction)=>transaction.id !== id);
  init();
}

function init(){
    list.innerHTML =" ";
    if(transactions.length==0){
        const Item = document.createElement("li");
        Item.innerHTML="No Transaction";
        list.appendChild(Item);
    }
    transactions.forEach(addTransactionDOM);
    updateTransaction();
}

function updateTransaction(){
   const amounts = transactions.map((transaction)=>Number(transaction.amount));
   const total = amounts.reduce((acc,Item)=>acc += Number(Item), 0).toFixed(2);
   
   const income=amounts.filter(Item=>Number(Item)>0).reduce((acc,Item)=>acc += Number(Item),0).toFixed(2);
   const expense=(amounts.filter(Item=>Number(Item)<0).reduce((acc,Item)=>acc += Number(Item),0) * -1).toFixed(2);

   
   balance.innerText=`$${total}`;
   moneyPlus.innerText =`$${income}`;
   moneyMins.innerText= `$${expense}`;
}