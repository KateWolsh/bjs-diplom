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
            moneyManager.setMessage(true, 'Баланс успешно пополнен!');
        } else{
            moneyManager.setMessage(false, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success){
            moneyManager.showProfile(response.data);
            moneyManager.setMessage(true, 'Валюта конвертирована!');
        } else{
            moneyManager.setMessage(false, response.error);
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) =>{
        if(response.success){
            moneyManager.showProfile(response.data);
            moneyManager.setMessage(true, 'Валюта переведена!');
        }else{
            moneyManager.setMessage(false, response.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();
    ApiConnector.getFavorites((response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
        } else {
            console.error(response.error);
        }
    });

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
        favoritesWidget.setMessage(true, 'Пользователь добавлен');
    } else {
        favoritesWidget.setMessage(false, response.error);
    }
  });
}

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
        favoritesWidget.setMessage(true, 'Пользователь удален');
    } else {
        favoritesWidget.setMessage(false, response.error);
    }
  })
}