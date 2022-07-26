var bankAccount;

window.onload = function () {
    var createBtn = document.getElementById("btn-create")

    var btnDebit = document.getElementById("debit")
    var btnDeposit = document.getElementById("deposit")

    createBtn.onclick = init

    btnDebit.onclick = function () {
        debDepoCall()
    }
    btnDeposit.onclick = function () {
        debDepoCall()
    }
}
function init() {
    bankAccount = new BankAccount();
    createAccount()
}

class BankAccount {
    #name
    #amount
    static #accountInfoList = new Array();

    constructor(name, amount) {
        this.#name = name;
        this.#amount = amount;
    }

    getAcName() {
        return this.#name;
    }

    getAcAmount() {
        return this.#amount
    }

    setAcName(name) {
        this.#name = name;
    }

    setAcAmount(amount) {
        this.#amount = amount;
    }

    getAccountData() {
        return BankAccount.#accountInfoList ? BankAccount.#accountInfoList : [];
    }
}

function debDepoCall() {
    var updateChild = document.getElementById("update-child");
    var openChild = document.getElementById("open-child");

    if (bankAccount && bankAccount.getAccountData()) {
        updateAccount(event.target.id)
        updateChild.style.display = "block";
        openChild.style.display = "none"
        resetValue()
    } else {
        alert("No acount available to" + " " + event.target.id + ". Create new account to " + event.target.id);
    }
}


function createAccount() {
    var acName = document.getElementById("ac-name")
    var acAmount = document.getElementById("ac-amount")
    let isExist = false;

    if (acName.value || acAmount.value) {
        bankAccount.getAccountData().forEach(ac => {
            if (ac.getAcName() === acName.value) {
                alert("account name " + ac.getAcName() + " already exists")
                isExist = true;
            }
        })
        if (!isExist) {
            this.addAccountInfo(acName.value, parseFloat(acAmount.value))
        }
    }
    else {
        alert("Input field(s) can not be empty")
    }
    resetValue()
}

function addAccountInfo(name, amount) {
    bankAccount.getAccountData().push(new BankAccount(name, amount))
    this.displayAccount();
    alert(name + " account with amount " + amount + " created")
}

function displayAccount(data) {
    var customerInfo = document.getElementById("display-bank")
    var info = "";
    bankAccount.getAccountData().forEach(item => {
        info += "Account Name: " + item.getAcName() + "  " + "Balance: " + item.getAcAmount() + "\n";
    })
    customerInfo.value = info;
}

function showAccountNameInDropDown() {
    var dropAcName = document.getElementById("drop-ac-name")
    dropAcName.innerHTML = ""
    bankAccount.getAccountData().forEach(item => {
        var opVal = document.createElement("option");
        opVal.textContent = item.getAcName();
        opVal.value = item.getAcName();
        dropAcName.add(opVal);
    })
}

function updateAccount(id) {
    var btnUpdate = document.getElementById("btn-update")
    var updatedAmount = document.getElementById("updated-amount");
    showAccountNameInDropDown()
    btnUpdate.onclick = function () {
        if (updatedAmount.value) {
            debitDeposit(id)
        } else {
            alert("Amount field can not be empty")
        }
    }
}


function debitDeposit(id) {
    console.log("debitDeposit => " + id);
    var dropAcName = document.getElementById("drop-ac-name")
    var updatedAmount = document.getElementById("updated-amount");
    var updateChild = document.getElementById("update-child");
    var openChild = document.getElementById("open-child");

    var selectedAc = dropAcName.value
    var amount = parseFloat(updatedAmount.value)

    if (selectedAc) {
        bankAccount.getAccountData().forEach(item => {
            if (item.getAcName() == selectedAc) {
                item.setAcAmount(id === "debit" ? parseFloat(item.getAcAmount()) - amount : parseFloat(item.getAcAmount()) + amount)
            }
        })
        displayAccount();
        updateChild.style.display = "none";
        openChild.style.display = "block"
        resetValue()
    } else {
        console.log("No value selected from drop down");
    }
}

function resetValue() {
    var acName = document.getElementById("ac-name")
    var acAmount = document.getElementById("ac-amount")
    var updatedAmount = document.getElementById("updated-amount");

    acName.value = ""
    acAmount.value = ""
    updatedAmount.value = ""

}

