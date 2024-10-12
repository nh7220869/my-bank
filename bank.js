// Importing required libraries (use the following command to install these packages if needed)
// npm install inquirer chalk
// Bank Account Class
var BankAccountClass = /** @class */ (function () {
    function BankAccountClass(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    BankAccountClass.prototype.withdraw = function (amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log("Withdrawal of $".concat(amount, " successful. Remaining balance: $").concat(this.balance));
        }
        else {
            console.log("Insufficient balance...!");
        }
    };
    BankAccountClass.prototype.deposit = function (amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited...
        }
        this.balance += amount;
        console.log("Deposit of $".concat(amount, " successful. Remaining balance: $").concat(this.balance));
    };
    BankAccountClass.prototype.checkBalance = function () {
        return this.balance;
    };
    return BankAccountClass;
}());
// Customer class
var Customer = /** @class */ (function () {
    function Customer(firstName, lastName, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.account = account;
    }
    return Customer;
}());
// Create bank accounts and customers
var accounts = [
    new BankAccountClass(1111, 9000),
    new BankAccountClass(2222, 10000),
    new BankAccountClass(3333, 20000)
];
var customers = [
    new Customer("Muhammad", "Abdullad", accounts[0]),
    new Customer("Muhammad", "Abubakar", accounts[1]),
    new Customer("Shafaquat", "Ali", accounts[2])
];
// Function to handle login
document.getElementById('login-button').addEventListener('click', function () {
    var accountNumberInput = Number(document.getElementById('account-number').value);
    var customer = customers.find(function (c) { return c.account.accountNumber === accountNumberInput; });
    if (customer) {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('account-options').style.display = 'block';
        document.getElementById('customer-name').innerText = "Welcome, ".concat(customer.firstName, " ").concat(customer.lastName, " (Account No: ").concat(customer.account.accountNumber, ")");
    }
    else {
        alert("Invalid account number. Please try again...");
    }
});
// Common function to handle deposit, withdraw, and balance actions
function handleTransaction(action) {
    var customer = customers.find(function (c) { return c.account.accountNumber === Number(document.getElementById('account-number').value); });
    if (customer) {
        var amount = null;
        if (action !== 'balance') {
            var inputAmount = prompt("Enter amount to ".concat(action, ":"));
            amount = inputAmount ? Number(inputAmount) : null;
        }
        if (amount || action === 'balance') {
            switch (action) {
                case 'deposit':
                    customer.account.deposit(amount);
                    showResult("Deposit of $".concat(amount, " successful."));
                    break;
                case 'withdraw':
                    customer.account.withdraw(amount);
                    showResult("Withdrawal of $".concat(amount, " successful."));
                    break;
                case 'balance':
                    var balance = customer.account.checkBalance();
                    showResult("Current balance: $".concat(balance));
                    break;
            }
            hideButtons();
        }
    }
}
// Show the amount input field for deposit and withdrawal actions
var currentTransaction = null;
document.getElementById('deposit-button').addEventListener('click', function () {
    currentTransaction = 'deposit';
    document.getElementById('amount-section').style.display = 'block';
    hideButtons(); // Hide other buttons after deposit is clicked
});
document.getElementById('withdraw-button').addEventListener('click', function () {
    currentTransaction = 'withdraw';
    document.getElementById('amount-section').style.display = 'block';
    hideButtons(); // Hide other buttons after withdraw is clicked
});
document.getElementById('check-balance-button').addEventListener('click', function () {
    var customer = customers.find(function (c) { return c.account.accountNumber === Number(document.getElementById('account-number').value); });
    if (customer) {
        var balance = customer.account.checkBalance();
        showResult("Current balance: $".concat(balance));
        hideButtons(); // Hide other buttons after check balance is clicked
    }
});
// Handle the amount input and perform the transaction
document.getElementById('submit-transaction').addEventListener('click', function () {
    var customer = customers.find(function (c) { return c.account.accountNumber === Number(document.getElementById('account-number').value); });
    var amount = Number(document.getElementById('amount-input').value);
    if (customer && amount > 0) {
        if (currentTransaction === 'deposit') {
            customer.account.deposit(amount);
            showResult("Deposit of $".concat(amount, " successful."));
        }
        else if (currentTransaction === 'withdraw') {
            customer.account.withdraw(amount);
            showResult("Withdrawal of $".concat(amount, " successful."));
        }
        document.getElementById('amount-section').style.display = 'none'; // Hide the amount section
        currentTransaction = null; // Reset transaction type
        hideButtons(); // Show all buttons again after the transaction
    }
    else {
        alert("Please enter a valid amount.");
    }
});
// Logout and back button functionality
document.getElementById('logout-button').addEventListener('click', function () {
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('account-options').style.display = 'none';
    document.getElementById('account-number').value = '';
    document.getElementById('result-message').innerText = '';
    document.getElementById('amount-section').style.display = 'none'; // Hide amount input section on logout
    showButtons(); // Show all buttons again
});
// Back button functionality
document.getElementById('back-button').addEventListener('click', function () {
    document.getElementById('transaction-result').style.display = 'none'; // Hide result div
    showButtons(); // Show all buttons again
    document.getElementById('amount-section').style.display = 'none'; // Hide the amount section
});
// Helper functions
function showResult(message) {
    var resultDiv = document.getElementById('transaction-result');
    resultDiv.style.display = 'block';
    document.getElementById('result-message').innerText = message;
}
function hideButtons() {
    document.getElementById('deposit-button').style.display = 'none';
    document.getElementById('withdraw-button').style.display = 'none';
    document.getElementById('check-balance-button').style.display = 'none';
    document.getElementById('logout-button').style.display = 'none';
    document.getElementById('back-button').style.display = 'block'; // Show back button
}
function showButtons() {
    document.getElementById('deposit-button').style.display = 'inline-block';
    document.getElementById('withdraw-button').style.display = 'inline-block';
    document.getElementById('check-balance-button').style.display = 'inline-block';
    document.getElementById('logout-button').style.display = 'inline-block';
    document.getElementById('back-button').style.display = 'none'; // Hide back button
}
