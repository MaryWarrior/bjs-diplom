"use strict";
const userForm = new UserForm();

userForm.loginFormCallback = (data) =>{
    //console.log('data ', data);
    ApiConnector.login(data, (response) => {
        //console.log(response);
        if(response.success == true){
            location.reload();
        } else {
            userForm.setLoginErrorMessage('Пользователь с такими данными не зарегистрирован');
        }
    });
};

userForm.registerFormCallback = (data) =>{
    //console.log('data ', data);
    ApiConnector.register(data, (response) => {
        //console.log(response);
        if(response.success == true){
            location.reload();
        } else {
            userForm.setRegisterErrorMessage('Пользователь с такими данными уже зарегистрирован');
        }
});
};