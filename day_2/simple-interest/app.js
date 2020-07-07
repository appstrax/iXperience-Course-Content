// Hide spinner
document.querySelector('.spinner-border').style.display = 'none';

// Listen for submit event
document.getElementById('loan-form').addEventListener('submit', function(e){
    document.getElementById('results').style.display = 'none';
    document.querySelector('.spinner-border').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate the results
function calculateResults(){
    const amount =  document.getElementById('amount').value;
    const interest =  document.getElementById('interest').value;
    const years =  document.getElementById('years').value;
    
    let totalReturn =  document.getElementById('total-return');
    let totalInterest =  document.getElementById('total-interest');

    totalReturn.value = (amount*(1 + ((interest*years)/100))).toFixed(2);
    totalInterest.value = (totalReturn.value-amount).toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.querySelector('.spinner-border').style.display = 'none';
}