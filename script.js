let amount = 0; // amount à 0 
let months = 0; // months à 0 
let yearPercentage = 0; // year poucentage à 0 
let capital = 0; // capital à 0 

let monthlyInterestRate = 0; // taux d'intérêts par mois à 0 
let monthlyPayement = 0; // paiement par mois à 0 


function getUserInfo() {
    // on crée un chiffre à virgule pour la valeur entrée dans le amountInput
    amount = parseFloat(document.getElementById('amountInput').value); 
    // on crée un chiffre entier pour la valeur entré dans le monthInput, qu'on va multiplier par 12 pour obtenir le nombre de mois
    months = parseInt(document.getElementById('monthInput').value) * 12; 
    // on crée un chiffre à virgule pour la valeur taux d'intérêt pour l'année
    yearPercentage = parseFloat(document.getElementById('interestInput').value); 
    capital = amount; 

    calculateMonthlyPayement(); // on appelle cette fonction 
}

function calculateMonthlyPayement() {
    // pour avoir l'intérêt mensuel
    monthlyInterestRate = yearPercentage / 100 / 12;  
    // calcul pour avoir le paiement mensuel 
    monthlyPayement = (amount * monthlyInterestRate) / (1 - (Math.pow((1 + monthlyInterestRate), months * -1))); 
    showOverview(); // on appelle cette fonction 
    getDetails(); // on appelle cette fonction 
}

function showOverview() {
    // on ajoute du texte dans la page HTML 
    /*
        dans la première ligne, pour définir le montant payé par mois, on va lui attribué la variable monthlyPayement
        on va ensuite lui appliquer .toLocalString('fr'), pour utiliser le systèmre de notation français (afficher les chiffres à virgule avec une virgule et non avec un point) 
    */
   // minimumFractionDigits: 2 -> pour que le nombre de chiffre après la virgule soit de minimum 2
   // maximumFractionDigits: 2 -> pour que le nombre de chiffre après la virgule soit de maximum 2 

    document.getElementById('overview').innerHTML = `
        <p>Monthly payement : ${monthlyPayement.toLocaleString('fr', 
        {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p> 
        <p>Yearly payement : ${(monthlyPayement * 12).toLocaleString('fr', 
        {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p>
        <p>Total payed : ${(monthlyPayement * months).toLocaleString('fr', 
        {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p>
        <p>Total interest payed : ${((monthlyPayement * months) - amount).toLocaleString('fr', 
        {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p>
    ` 
}

function getDetails() {
    let information = ""; // string vide 
    let counter = 1; // counter à 1 

    while (counter <= months) { // tant que counter <= months 
        let payementDate = new Date; // cette variable va prendre la date du jour 
        /* 
            getMonth() va prendre le mois actuel 
            setMonth() va mettre à jour le mois 
            + counter va ajouter counter 
            tant que counter <= months, on ajoute une ligne avec un nouveau mois 
        */
        payementDate.setMonth(payementDate.getMonth() + counter); 
        let month = payementDate.getMonth() + 1; 
        let year = payementDate.getFullYear(); 
        let displayDate = `01/${month}/${year}`;

        if (month < 10) {
            displayDate = `01/0${month}/${year}`; 
        } else {
            displayDate = `01/${month}/${year}`; 
        }

        let monthlyInterest = (capital * monthlyInterestRate); 
        capital -= (monthlyPayement - monthlyInterest); 

        information += `
            <tr>
                <td>${counter++}</td>
                <td>${displayDate}</td>
                <td>${(monthlyPayement - monthlyInterest).toLocaleString('fr', 
                {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td>${monthlyInterest.toLocaleString('fr', 
                {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td>${capital.toLocaleString('fr', 
                {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
        `
    } 

    document.getElementById('details').innerHTML = information; 
}
