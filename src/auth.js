class Auth {
    constructor() {
        this.authenticated = false;
        this.userData = {};
    }

    login(callback) {
        this.authenticated = true;
        callback();
    }

    logout(callback) {
        this.authenticated = false;
        callback();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    setUserData(userData) {
        this.userData = userData;
    }
    
    getUserData() {
        return this.userData;
    }
}

export default new Auth();