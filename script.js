/*initialize an empty array to store expenses*/
const expenses = [];
/*get references to the form, table body, and total amount elements*/
const form = document.getElementById('expense-form');
const tableBody = document.getElementById('expense-table-body');
const totalAmount = document.getElementById('total-amount');
/*function to format the amount as currency*/
function formatCurrency(value) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(value);
}
/*add a function to render the expenses in the table and update the total amount*/
function renderExpenses() {
  if (expenses.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty">No expenses recorded yet.</td>
      </tr>
    `;
    totalAmount.textContent = 'KSh 0.00';
    return;
  }
/*calculate the total amount of expenses and update the total amount element*/
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  totalAmount.textContent = formatCurrency(total);

  tableBody.innerHTML = expenses
    .map(
      (expense, index) => `
        <tr>
          <td>${expense.name}</td>
          <td>${expense.category || 'General'}</td>
          <td>${formatCurrency(Number(expense.amount))}</td>
          <td>${expense.date}</td>
          <td><button type="button" class="delete-expense" data-index="${index}">Delete</button></td>
        </tr>
      `
    )
    .join('');
}
/*add an event listener to the form to handle the submission of new expenses*/
form.addEventListener('submit', function (event) {
  event.preventDefault();
/*get the values from the form inputs and validate them*/
  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value.trim();
  const amount = Number(document.getElementById('amount').value);
  const date = document.getElementById('date').value;
/*check if the name, date, and amount are valid, and alert the user if not*/
  if (!name || !date || Number.isNaN(amount) || amount < 0) {
    alert('Please enter a valid expense name, date, and amount.');
    return;
  }
/*add the new expense to the expenses array and reset the form*/
  expenses.push({
    name,
    category: category || 'General',
    amount,
    date
  });
/*reset the form and render the updated expenses in the table*/
  form.reset();
  renderExpenses();
});
/*add an event listener to the table body to handle the deletion of expenses*/
tableBody.addEventListener('click', function (event) {
  if (!event.target.classList.contains('delete-expense')) {
    return;
  }

  const expenseIndex = Number(event.target.dataset.index);
  expenses.splice(expenseIndex, 1);
  renderExpenses();
});
/*initially render the expenses when the page loads*/
renderExpenses();
