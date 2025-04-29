document.addEventListener('DOMContentLoaded', async () => {
  // Fetch data from API
  const response = await fetch('/api/data');
  const data = await response.json();
  
  // Render charts
  renderRevenueExpensesChart(data);
  renderExpenseBreakdownChart(data);
  renderRecentTransactions(data.transactions);
  
  // Add event listeners
  document.querySelectorAll('.chart-filter').forEach(select => {
    select.addEventListener('change', () => {
      // In a real app, we would fetch new data based on the filter
      console.log('Filter changed:', select.value);
    });
  });
});

function renderRevenueExpensesChart(data) {
  const ctx = document.getElementById('revenueExpensesChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.months,
      datasets: [
        {
          label: 'Revenue',
          data: data.revenue,
          borderColor: '#4361ee',
          backgroundColor: 'rgba(67, 97, 238, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        },
        {
          label: 'Expenses',
          data: data.expenses,
          borderColor: '#f72585',
          backgroundColor: 'rgba(247, 37, 133, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          }
        }
      }
    }
  });
}

function renderExpenseBreakdownChart(data) {
  const ctx = document.getElementById('expenseBreakdownChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.categories,
      datasets: [{
        data: data.categoryAmounts,
        backgroundColor: [
          '#4361ee',
          '#3f37c9',
          '#4895ef',
          '#4cc9f0',
          '#f72585',
          '#b5179e',
          '#7209b7'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const value = context.raw;
              const percentage = Math.round((value / total) * 100);
              return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

function renderRecentTransactions(transactions) {
  const tbody = document.getElementById('transactions-body');
  
  // Sample data - in a real app, this would come from the API
  const sampleTransactions = [
    {
      date: '2023-06-15',
      description: 'Office Supplies',
      category: 'Operations',
      amount: 1250.50,
      status: 'completed'
    },
    {
      date: '2023-06-14',
      description: 'Marketing Campaign',
      category: 'Marketing',
      amount: 8500.00,
      status: 'completed'
    },
    {
      date: '2023-06-12',
      description: 'Software Subscription',
      category: 'Technology',
      amount: 499.99,
      status: 'pending'
    },
    {
      date: '2023-06-10',
      description: 'Client Dinner',
      category: 'Business Development',
      amount: 320.75,
      status: 'completed'
    },
    {
      date: '2023-06-08',
      description: 'Payment Processing Fee',
      category: 'Finance',
      amount: 150.30,
      status: 'failed'
    }
  ];
  
  tbody.innerHTML = sampleTransactions.map(transaction => `
    <tr>
      <td>${new Date(transaction.date).toLocaleDateString()}</td>
      <td>${transaction.description}</td>
      <td>${transaction.category}</td>
      <td>$${transaction.amount.toLocaleString()}</td>
      <td><span class="status ${transaction.status}">${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span></td>
    </tr>
  `).join('');
}
