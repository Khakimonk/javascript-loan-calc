"use strict";

function calculate() {
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalInterest = document.getElementById("totalinterest");
    
    var principal = parseFloat(amount.nodeValue);
    var interest = parseFloat(apr.nodeValue);
    var payments = parseFloat(years.nodeValue);
    
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal*x*interest)/(x-1);
    
    if(isFinite(monthly)) {
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalInterest.innerHTML = ((monthly * payments) - principal).toFixed(2);
        
        save(amount.nodeValue, apr.nodeValue, years.nodeValue, zipcode.nodeValue);
        
        try {
            getLenders(amount.nodeValue, apr.nodeValue, years.nodeValue, zipcode.nodeValue);
        }
        catch(e) {}
    }
    else {
     payment.innerHTML = "";
     total.innerHTML = "";
     totalInterest.innerHTML = "";
     chart();   
    }
}

function save(amount, apr, years, zipcode) {
    if(window.localStorage) {
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
    }
}

window.onload = function() 
    if(window.localStorage && localStorage.loan_amount){
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("zipcode").value = localStorage.loan_zipcode;
    }
};