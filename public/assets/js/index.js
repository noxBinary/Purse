let totalBudget = 0;
let entries = {};

function setIncome(income) {
    totalBudget = income;
    document.getElementById("totalIncomeDisplay").textContent = totalBudget.toFixed(2);
    updateTotals();
}

function addEntry(name, amount) {
    const amt = parseFloat(amount);
    if (!name || Number.isNaN(amt)) {
        alert("Please enter a valid name and amount.");
        return;
    }
    entries[name] = amt;
    document.getElementById("nameInput").value = "";
    document.getElementById("amountInput").value = "";
    renderEntries();
}

function removeEntry(name) {
    delete entries[name];
    renderEntries();
}

function renderEntries() {
    const list = document.getElementById("entryList");
    list.innerHTML = "";
    for (const key in entries) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = key;

        const valueCell = document.createElement("td");
        valueCell.textContent = entries[key].toFixed(2);

        const actionCell = document.createElement("td");
        const btn = document.createElement("button");
        btn.className = "btn btn-danger btn-sm";
        btn.textContent = "Remove";
        btn.addEventListener("click", () => removeEntry(key));
        actionCell.appendChild(btn);

        row.appendChild(nameCell);
        row.appendChild(valueCell);
        row.appendChild(actionCell);
        list.appendChild(row);
    }
    updateTotals();
}

function updateTotals() {
    const totalExpenses = Object.values(entries).reduce((s, v) => s + v, 0);
    const remaining = totalBudget - totalExpenses;

    const incomeEl = document.getElementById("totalIncomeDisplay");
    const expensesEl = document.getElementById("totalExpensesDisplay");
    const remainingEl = document.getElementById("remainingBalanceDisplay");

    if (incomeEl) incomeEl.textContent = totalBudget.toFixed(2);
    if (expensesEl) expensesEl.textContent = totalExpenses.toFixed(2);
    if (remainingEl) {
        remainingEl.textContent = remaining.toFixed(2);
        remainingEl.style.color = remaining < 0 ? "red" : "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    const setIncomeBtn = document.getElementById("setIncomeBtn");

    if (addBtn) {
        addBtn.addEventListener("click", () => {
            const name = document.getElementById("nameInput").value.trim();
            const amount = document.getElementById("amountInput").value;
            addEntry(name, amount);
        });
    }

    if (setIncomeBtn) {
        setIncomeBtn.addEventListener("click", () => {
            const incomeVal = parseFloat(document.getElementById("incomeInput").value);
            if (!Number.isNaN(incomeVal) && incomeVal >= 0) {
                setIncome(incomeVal);
            } else {
                alert("Please enter a valid income amount.");
            }
        });
    }
});
