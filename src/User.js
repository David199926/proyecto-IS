var User = (function () {
    var userData = { prueba: ''};
    var setUserData = function(data) {
        userData = data;
    }
	var getUserData = function() {
        return userData;
    }

    return {
        setUserData: setUserData,
        getUserData: getUserData,
    }

})();

export default User;