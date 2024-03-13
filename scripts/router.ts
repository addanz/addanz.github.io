"use strict";

namespace core{

    export class Router {

        private _activeLink:string;
        private _routingTable:string[];

        private _linkData:string;

        constructor() {
            this._activeLink = "";
            this._routingTable = [];
            this._linkData = "";
        }

        public get LinkData():string{
            return this._linkData;
        }

        public set LinkData(link:string){
            this._linkData = link;
        }

        public get ActiveLink():string{
            return this._activeLink;
        }

        public set ActiveLink(link:string){
            this._activeLink = link;
        }

        /**
         * This method adds a new route to the routing table
         * @param route
         * @returns {void}
         */
        public Add(route:string){
            this._routingTable.push(route);
        }

        /**
         * This method replaces the referemce for the routing table with a new one
         * @param routingTable
         * @returns {void}
         */
        public AddTable(routingTable:string[]){
            this._routingTable = routingTable;
        }

        /**
         * This method finds and returns the index of the route in the Routing table
         * or -1 if the route does not exist.
         * @param route
         * @returns {*}
         */
        public Find(route:string):number{
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the routing table. It returns true if it
         * succeeds (delete a route), false otherwise.
         * @param route
         * @returns {boolean}
         */
        public Remove(route:string):boolean{
            if(this.Find(route)>-1){
                this._routingTable.splice(this.Find(route),1);
                return true
            }
            return false;
        }

        /**
         * This method returns the routing table contents in a comma delimited separated string.
         * @returns {string}
         */
        public toString():string{
            return this._routingTable.toString();
        }
    }

}

// instantiate a new router
let router:core.Router = new core.Router();

// Add default routes to our routing table
router.AddTable([
    "/",
    "/home",
    "/about",
    "/services",
    "/products",
    "/contact",
    "/contact-list",
    "/login",
    "/register",
    "/edit"

])

let route:string = location.pathname;

router.ActiveLink = (router.Find(route) > -1)
                    ? ((route) === "/") ? "home" : route.substring(1)
                    : ("404");