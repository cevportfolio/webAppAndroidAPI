$('#connection-submit').on('click', async function() {
  if ($.trim(localStorage.getItem('dbName')) != '' && $.trim(localStorage.getItem('dbUser')) != '' &&
      $.trim(localStorage.getItem('dbPassword')) != '' && $.trim(localStorage.getItem('login')) != '' &&
      $.trim(localStorage.getItem('password')) != '') {
    await login(localStorage.getItem('dbName'), localStorage.getItem('dbUser'), localStorage.getItem('dbPassword'),
          localStorage.getItem('login'), localStorage.getItem('password'));
  } else {
    await login($('input#dbName').val(), $('input#dbUser').val(), $('input#dbPassword').val(), $('input#login').val(), $('input#password').val());
  }
});

$('#connection-save').on('click', function() {
  if ($.trim($('input#dbName').val()) != '' && $.trim($('input#dbUser').val()) != '' && $.trim($('input#dbPassword').val()) != '' && $.trim($('input#login').val()) != '' && $.trim($('input#password').val()) != '') {
    localStorage.setItem('dbName', $('input#dbName').val());
    localStorage.setItem('dbUser', $('input#dbUser').val());
    localStorage.setItem('dbPassword', $('input#dbPassword').val());
    localStorage.setItem('login', $('input#login').val());
    localStorage.setItem('password', $('input#password').val());
  } else {
    alert("Не все поля заполнены");
  }
});

$('#connection-load').on('click', function() {
  loadLoginData();
});

this.login = function(dbName, dbUser, dbPassword, login, password) {
   $.post('../ajax/loginAdmin.php', {dbName: dbName, dbUser: dbUser,
                                     dbPassword: dbPassword, login: login,
                                     password: password}, function(data) {
     // // $('div#connection-data').text(data);
     // if (data == 'Успешный вход') {
     //   // renderMenuPage();
     //   alert('Успешный вход');
     // }
     try {
       loginAdmin.loginSecurityData = JSON.parse(data);
       checkReceivedLoginSecurityData();
     } catch(e) {
       console.log(e);
     }
   });
}

this.checkReceivedLoginSecurityData = function() {
  // alert(loginAdmin.loginSecurityData[0].attribute;);
  for (var i = 0; i < Object.keys(loginAdmin.loginSecurityData).length; i++) {
    loginAdmin.firstname = loginAdmin.loginSecurityData[i].firstname;
    loginAdmin.middlename = loginAdmin.loginSecurityData[i].middlename;
    loginAdmin.secondname = loginAdmin.loginSecurityData[i].secondname;
    loginAdmin.attribute = loginAdmin.loginSecurityData[i].attribute;
    alert('Успешный вход');
  }
}

this.loadLoginData = function() {
  if ($.trim(localStorage.getItem('dbName')) != '' && $.trim(localStorage.getItem('dbUser')) != '' &&
      $.trim(localStorage.getItem('dbPassword')) != '' && $.trim(localStorage.getItem('login')) != '' &&
      $.trim(localStorage.getItem('password')) != '') {
    alert('Данные загружены');
  } else {
    alert('Нет данных. Заполните поля для авторизации');
  }
}
