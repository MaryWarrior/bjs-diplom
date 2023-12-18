"use strict";
//выход из аккаунта
const logoutButton = new LogoutButton();
logoutButton.action = (data) => {
    ApiConnector.logout(response => {
            if(response.success == true){
                location.reload();
            }
    });
};

//получение данных пользователей
ApiConnector.current(response => 
    {if (response.success == true){
        ProfileWidget.showProfile(response.data);
    }
})

//обновление курсов
const ratesBoard = new RatesBoard();
function getRates() {
    ApiConnector.getStocks(response => {
        if(response.success == true){
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
setInterval(getRates(), 60000);

//операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if(response.success == true){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Деньги успешно зачислены");
        } else {
            moneyManager.setMessage(false, response.error);
        }
});
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success == true){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Деньги успешно конвертированы");
        } else {
            moneyManager.setMessage(false, response.error);
        }
});
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if(response.success == true){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Деньги успешно переведены");
        } else {
            moneyManager.setMessage(false, response.error);
        }
});
};

//работа с избранным
const favoritesWidget = new FavoritesWidget;

ApiConnector.getFavorites(response => {
    if(response.success == true){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if(response.success == true){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
});
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if(response.success == true){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь успешно удален из  избранного");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
});
};