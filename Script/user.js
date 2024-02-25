// Author            : Addan Zahra and Rojauhn Noble
// Student ID        : 100883421   ||  100849533
// Date of Completion: February 24, 2024

"use strict";

(function (core) {

    class User {

        constructor(displayName = "", emailAddress = "", password =""){
            this._displayName = displayName;
            this._emailAddress = emailAddress;
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

        toString(){

            return `\nDisplayName: ${this._displayName}\n
                  EmailAddress: ${this._emailAddress}\n`;

        }

        /**
         * Serialize for writing to localStorage
         * @returns {null/string}
         */

        serialize(){

            if(this._displayName !== "" && this._emailAddress !== ""){

                return `${this._displayName}, ${this._emailAddress}`;
            }
            console.error("One or more properties of the User are empty or invalid");
            return null;
        }

        /**
         * Deserializer is used to read data from local storage.
         * @param data
         */
        deserialize(data){
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
        }

        toJSON(){
            return {
                DisplayName : this._displayName,
                EmailAddress : this._emailAddress,
                Password : this.Password
            }
        }

        fromJSON(data) {
            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._password = data.Password;
        }

    }
    core.User = User;
})(core || (core={}));