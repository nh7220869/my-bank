// Importing required libraries (use the following command to install these packages if needed)
// npm install inquirer chalk

// Interface for Bank Account
interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    checkBalance(): number;
}

// Bank Account Class
class BankAccountClass implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        } else {
            console.log("Insufficient balance...!");
        }
    }

    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;  // $1 fee charged if more than $100 is deposited...
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }

    checkBalance(): number {
        return this.balance;
    }
}

// Customer class
class Customer {
    firstName: string;
    lastName: string;
    account: BankAccount;

    constructor(firstName: string, lastName: string, account: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.account = account;
    }
}

// Create bank accounts and customers
const accounts: BankAccount[] = [
    new BankAccountClass(1111, 9000),
    new BankAccountClass(2222, 10000),
    new BankAccountClass(3333, 20000)
];

const customers: Customer[] = [
    new Customer("Muhammad", "Abdullad", accounts[0]),
    new Customer("Muhammad", "Abubakar", accounts[1]),
    new Customer("Shafaquat",   "Ali", accounts[2])
];

// Function to handle login
document.getElementById('login-button')!.addEventListener('click', () => {
    const accountNumberInput = Number((<HTMLInputElement>document.getElementById('account-number')).value);
    const customer = customers.find(c => c.account.accountNumber === accountNumberInput);

    if (customer) {
        document.getElementById('welcome')!.style.display = 'none';
        document.getElementById('account-options')!.style.display = 'block';
        document.getElementById('customer-name')!.innerText = `Welcome, ${customer.firstName} ${customer.lastName} (Account No: ${customer.account.accountNumber})`;
    } else {
        alert("Invalid account number. Please try again...");
    }
});

// Common function to handle deposit, withdraw, and balance actions
function handleTransaction(action: 'deposit' | 'withdraw' | 'balance') {
    const customer = customers.find(c => c.account.accountNumber === Number((<HTMLInputElement>document.getElementById('account-number')).value));
    
    if (customer) {
        let amount: number | null = null;
        if (action !== 'balance') {
            const inputAmount = prompt(`Enter amount to ${action}:`);
            amount = inputAmount ? Number(inputAmount) : null;
        }

        if (amount || action === 'balance') {
            switch (action) {
                case 'deposit':
                    customer.account.deposit(amount!);
                    showResult(`Deposit of $${amount} successful.`);
                    break;
                case 'withdraw':
                    customer.account.withdraw(amount!);
                    showResult(`Withdrawal of $${amount} successful.`);
                    break;
                case 'balance':
                    const balance = customer.account.checkBalance();
                    showResult(`Current balance: $${balance}`);
                    break;
            }
            hideButtons();
        }
    }
}

// Show the amount input field for deposit and withdrawal actions
let currentTransaction: 'deposit' | 'withdraw' | null = null;

document.getElementById('deposit-button')!.addEventListener('click', () => {
    currentTransaction = 'deposit';
    document.getElementById('amount-section')!.style.display = 'block';
    hideButtons();  // Hide other buttons after deposit is clicked
});

document.getElementById('withdraw-button')!.addEventListener('click', () => {
    currentTransaction = 'withdraw';
    document.getElementById('amount-section')!.style.display = 'block';
    hideButtons();  // Hide other buttons after withdraw is clicked
});

document.getElementById('check-balance-button')!.addEventListener('click', () => {
    const customer = customers.find(c => c.account.accountNumber === Number((<HTMLInputElement>document.getElementById('account-number')).value));
    if (customer) {
        const balance = customer.account.checkBalance();
        showResult(`Current balance: $${balance}`);
        hideButtons();  // Hide other buttons after check balance is clicked
    }
});

// Handle the amount input and perform the transaction
document.getElementById('submit-transaction')!.addEventListener('click', () => {
    const customer = customers.find(c => c.account.accountNumber === Number((<HTMLInputElement>document.getElementById('account-number')).value));
    const amount = Number((<HTMLInputElement>document.getElementById('amount-input')).value);

    if (customer && amount > 0) {
        if (currentTransaction === 'deposit') {
            customer.account.deposit(amount);
            showResult(`Deposit of $${amount} successful.`);
        } else if (currentTransaction === 'withdraw') {
            customer.account.withdraw(amount);
            showResult(`Withdrawal of $${amount} successful.`);
        }
        document.getElementById('amount-section')!.style.display = 'none';  // Hide the amount section
        currentTransaction = null;  // Reset transaction type
        hideButtons();  // Show all buttons again after the transaction
    } else {
        alert("Please enter a valid amount.");
    }
});

// Logout and back button functionality
document.getElementById('logout-button')!.addEventListener('click', () => {
    document.getElementById('welcome')!.style.display = 'block';
    document.getElementById('account-options')!.style.display = 'none';
    (<HTMLInputElement>document.getElementById('account-number')).value = '';
    document.getElementById('result-message')!.innerText = '';
    document.getElementById('amount-section')!.style.display = 'none';  // Hide amount input section on logout
    showButtons();  // Show all buttons again
});

// Back button functionality
document.getElementById('back-button')!.addEventListener('click', () => {
    document.getElementById('transaction-result')!.style.display = 'none';  // Hide result div
    showButtons();  // Show all buttons again
    document.getElementById('amount-section')!.style.display = 'none';  // Hide the amount section
});

// Helper functions
function showResult(message: string) {
    const resultDiv = document.getElementById('transaction-result')!;
    resultDiv.style.display = 'block';
    document.getElementById('result-message')!.innerText = message;
}

function hideButtons() {
    document.getElementById('deposit-button')!.style.display = 'none';
    document.getElementById('withdraw-button')!.style.display = 'none';
    document.getElementById('check-balance-button')!.style.display = 'none';
    document.getElementById('logout-button')!.style.display = 'none';
    document.getElementById('back-button')!.style.display = 'block';  // Show back button
}

function showButtons() {
    document.getElementById('deposit-button')!.style.display = 'inline-block';
    document.getElementById('withdraw-button')!.style.display = 'inline-block';
    document.getElementById('check-balance-button')!.style.display = 'inline-block';
    document.getElementById('logout-button')!.style.display = 'inline-block';
    document.getElementById('back-button')!.style.display = 'none';  // Hide back button
}
