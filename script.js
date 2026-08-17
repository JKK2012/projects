const expenses = [];

const form = document.getElementById('expense-form');
const tableBody = document.getElementById('expense-table-body');
const totalAmount = document.getElementById('total-amount');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(value);
}

function renderExpenses() {
  if (expenses.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="empty">No expenses recorded yet.</td>
      </tr>
    `;
    totalAmount.textContent = 'KSh 0.00';
    return;
  }

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  totalAmount.textContent = formatCurrency(total);

  tableBody.innerHTML = expenses
    .map(
      (expense) => `
        <tr>
          <td>${expense.name}</td>
          <td>${expense.category || 'General'}</td>
          <td>${formatCurrency(Number(expense.amount))}</td>
          <td>${expense.date}</td>
        </tr>
      `
    )
    .join('');
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value.trim();
  const amount = Number(document.getElementById('amount').value);
  const date = document.getElementById('date').value;

  if (!name || !date || Number.isNaN(amount) || amount < 0) {
    alert('Please enter a valid expense name, date, and amount.');
    return;
  }

  expenses.push({
    name,
    category: category || 'General',
    amount,
    date
  });

  form.reset();
  renderExpenses();
});

renderExpenses();
