function userControls() {

    var userCount = 1;
    var userInfo = [];
    //////////////////////////////
    ///////User Constructor///////
    //////////////////////////////
    function User(name, password, id) {
        this.name = name;
        this.password = password;
        this.id = id;
    }

    /////////////////////////////
    ///////Create New User///////
    /////////////////////////////
    $('.new-user').on('click', function newUser() {
        var form = $('.create-user-form');
        var name = form.userName;
        var password = form.userPassword;
        var id = Math.ceil(Math.random()*1000000)
        var user = new User(name, password, id)
        userInfo.push(user);
    })


    /////////////////////////////////
    ///////User Authentication///////
    /////////////////////////////////
    var _currentUser;
    
    $('log-in').on('click', function logIn() {

    })
    this.authenticate = function(name, password) {
        for (var i = 0; i<userInfo.length; i++) {
            var user = userInfo[i];
            if (user.name == name && user.password == password) {
                _currentUser = user.id;
                return;
            }
        }
    }

    this.getCurrentUser = function() {
        return _currentUser;
    }


};

userControls();