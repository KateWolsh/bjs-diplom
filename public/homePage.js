"use strict"

const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        } else {
            console.error(response.error);
        }
    });
}

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.error(response.error);
    }
});



const ratesBoard = new RatesBoard();

function getRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            console.error(response.error);
        }
    });
}

getRates();
setInterval(getRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if(response.success){
            moneyManager.showProfile(response.data);
            moneyManager.setMessage('Баланс успешно пополнен!');
        } else{
            moneyManager.setMessage(false, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success){
            moneyManager.showProfile(response.data);
            moneyManager.setMessage('Валюта конвертирована!');
        } else{
            moneyManager.setMessage(false, response.error);
        }
    })
}