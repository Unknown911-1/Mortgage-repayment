document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission for demonstration

        resetValidation();

        const amountInput = document.getElementById('amount');
        const termInput = document.getElementById('term');
        const rateInput = document.getElementById('rate');
        const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

        let isValid = true;

        if (amountInput.value.trim() === '') {
            isValid = false;
            const errorDiv = document.querySelector('.error');
            errorDiv.style.display = 'block';
        }

        if (termInput.value.trim() === '') {
            isValid = false;
            const errorsDiv = document.querySelector('.errors');
            errorsDiv.style.display = 'block';
            
        }

        if (rateInput.value.trim() === '') {
            isValid = false;
            const errorssDiv = document.querySelector('.errorss');
            errorssDiv.style.display = 'block';
        }

        if (!mortgageType) {
            isValid = false;
            const errorrDiv = document.querySelector('.errorr');
            errorrDiv.style.display = 'block';

        }
        if (isValid) {
            calculateMortgage();
        }
    });

    function calculateMortgage() {
        
        const principal = parseFloat(document.getElementById('amount').value);
        const annualInterestRate = parseFloat(document.getElementById('rate').value) / 100;
        const years = parseFloat(document.getElementById('term').value);

        const mortgageType = document.querySelector('input[name="mortgage-type"]:checked').value;
        const monthlyInterestRate = annualInterestRate / 12;
        const numberOfPayments = years * 12;

        let monthlyPayment;
        let totalRepayment;

        if (mortgageType === 'repayment') {
            // Calculate monthly payment for repayment mortgage
            monthlyPayment = (principal * monthlyInterestRate) / 
                (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
            // Calculate total repayment
            totalRepayment = monthlyPayment * numberOfPayments;
        } else if (mortgageType === 'interest-only') {
            // Calculate monthly payment for interest-only mortgage
            monthlyPayment = principal * monthlyInterestRate;
            // Calculate total repayment
            totalRepayment = (monthlyPayment * numberOfPayments) + principal;
        }

        // Format monthlyPayment and totalRepayment
        const formattedMonthlyPayment = formatCurrency(monthlyPayment);
        const formattedTotalRepayment = formatCurrency(totalRepayment);

        document.getElementById('monthly-payment').textContent = formattedMonthlyPayment;
        document.getElementById('total-repayment').textContent = formattedTotalRepayment;

        document.querySelector('.before-results').style.display = 'none';
        document.querySelector('.after-results').style.display = 'block';

        
    }

    function formatCurrency(amount) {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }


    function resetValidation() {
        const errorDiv = document.querySelector('.error');
        errorDiv.style.display = 'none';
        const errorsDiv = document.querySelector('.errors');
        errorsDiv.style.display = 'none';
        const errorssDiv = document.querySelector('.errorss');
        errorssDiv.style.display = 'none';
        const errorrDiv = document.querySelector('.errorr');
        errorrDiv.style.display = 'none';
    }

    // Clear all fields and reset form
    document.getElementById('clear-all').addEventListener('click', function() {
        document.getElementById('amount').value = '';
        document.getElementById('rate').value = '';
        document.getElementById('term').value = '';
        document.getElementById('monthly-payment').textContent = '';
        document.getElementById('total-repayment').textContent = '';

        const checkedMortgageType = document.querySelector('input[name="mortgage-type"]:checked');
        if (checkedMortgageType) {
            checkedMortgageType.checked = false;
        }

        resetValidation();

        document.querySelector('.before-results').style.display = 'block';
        document.querySelector('.after-results').style.display = 'none';
    });

    
    
    
});
