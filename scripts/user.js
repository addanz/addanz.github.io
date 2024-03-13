"use strict";
var core;
(function (core) {
    class User {
        _displayName;
        _emailAddress;
        _userName;
        _password;
        constructor(displayName = "", emailAddress = "", userName = "", password = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._userName = userName;
            this._password = password;
        }
        get displayName() {
            return this._displayName;
        }
        set displayName(value) {
            this._displayName = value;
        }
        get emailAddress() {
            return this._emailAddress;
        }
        set emailAddress(value) {
            this._emailAddress = value;
        }
        get userName() {
            return this._userName;
        }
        set userName(value) {
            this._userName = value;
        }
        get password() {
            return this._password;
        }
        set password(value) {
            this._password = value;
        }
        toString() {
            return `DisplayName: ${this._displayName} 
                \nEmailAddress: ${this._emailAddress}\n Username: ${this._userName}\n`;
        }
        serialize() {
            if (this._displayName !== "" && this._emailAddress !== "" && this._userName !== "") {
                return `${this._displayName},${this._emailAddress},${this._userName}`;
            }
            console.error("One or more properties of the Contact are empty or invalid");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._userName = propertyArray[2];
        }
        toJson() {
            return {
                DisplayName: this._displayName,
                EmailAddress: this._emailAddress,
                Username: this._userName,
            };
        }
        fromJson(data) {
            this._displayName = data.displayName;
            this._emailAddress = data.emailAddress;
            this._userName = data.userName;
            this._password = data.password;
        }
    }
    core.User = User;
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map