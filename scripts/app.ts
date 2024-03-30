"use strict";

// IIFE - Immmediately invoked functional expression

(function()
{

    /**
     * Binds click, mouseover , and mouseout events to anchor tags with class 'link' and a matching
     * data attribute. Applies CSS changes for visual feedback and handles link activation on click
     * @param link
     */
    function AddLinkEvents(link:string):void{
        let linkQuery = $(`a.link[data=${link}]`);
        //Removes all link events from the event queue
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");

        linkQuery.css("text-decoration","underline");
        linkQuery.css("color","blue");

        linkQuery.on("click",function (){
            LoadLink(`${link}`);
        });

        linkQuery.on("click",function (){
            $(this).css("cursor","pointer");
            $(this).css("font-weight","bold");
        });

        linkQuery.on("mouseout", function (){
            $(this).css("font-weight","normal");
        });



    }


    /**
     * Sets up event listeners for navigation links found within list items or the unordered list
     * Removes any existing clicks and mouseover events before re-establishing new ones to control
     * navigation behaviour and visual cues.
     * @constructor
     */
    function AddNavigationEvents():void{
        let navLinksExtra = $(".navbar-brand");
        let navlinks = $("ul>li>a");

        navLinksExtra.off("click");
        navLinksExtra.off("mouseover");

        navlinks.off("click");
        navlinks.off("mouseover");

        navlinks.on("click",function(){
            LoadLink($(this).attr("data") as string);
        });

        navLinksExtra.on("click",function(){
            LoadLink($(this).attr("data") as string);
        });

        navlinks.on("mouseover",function(){
            $(this).css("cursor","pointer")
        });

        navLinksExtra.on("mouseover",function(){
            $(this).css("cursor","pointer")
        });

    }

    /**
     * Updates the application current active link,manages authentication and updates browser history
     * It also updates the navigation UI to reflect the current active link and loads the corresponding content
     * @param link
     * @param data
     * @constructor
     */
    function LoadLink(link:string, data:string = ""):void{

        router.ActiveLink = link;

        AuthGuard();

        router.LinkData = data;

        history.pushState({},"",router.ActiveLink);

        document.title = CapitalizeFirstCharacter(router.ActiveLink);

        $("ul>li>a").each(function(){
            $(this).removeClass("active");
        });

        $(".navbar-brand").each(function(){
            $(this).removeClass("active");
        });

        $("li>a:contains(${document.title})").addClass("active");

        LoadContent();


    }

    function AuthGuard(){
        let protected_routes = ["contact-list"];

        if(protected_routes.indexOf(router.ActiveLink) >- 1) {

            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }

    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-undo"></i> Logout</a>`);
        }

        $("#logout").on("click", function () {
            sessionStorage.clear();
            $("#login").html(`<a class="nav-link" href="#" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
            LoadHeader();
            LoadLink("home");
        });

    }


    /**
     *
     *
     */
    function ContactFormValidation(){
        ValidateField("#fullName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter a valid First and Last Name." )
        ValidateField("#contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,"Please enter a contact number." )
        ValidateField("#email",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid email address." )

    }

    /**
     * Test Regular Expression for Full Name Input
     *
     */
    function ValidateField(input_field_id:string,regular_expression:RegExp,error_message:string){

        let messageArea = $("#messageArea").hide();
        // let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/;

        $(input_field_id).on("blur",function (){
            console.log("test");
           let inputFieldText = $(this).val() as string;
           if(!regular_expression.test(inputFieldText)){
               //fail validation
               $(this).trigger("focus").trigger("select");
               messageArea.addClass("alert alert-danger").text(error_message).show();
           }
           else{
               messageArea.removeClass("class").hide();
           }
        });
    }
    function AddContact(fullName:string,contactNumber:string,emailAddress:string){
        let contact = new core.Contact(fullName,contactNumber,emailAddress);

        if(contact.serialize()){
            let key = contact.fullName.substring(0,1)+ Date.now();
            localStorage.setItem(key,contact.serialize() as string);


        }
        console.log("outside if of add contact function")
    }

    function DisplayHomePage()
    {
        console.log("Called DisplayHomePage...")

        $("#AboutUsBtn").on("click", ()=>{

            LoadLink("about");
        } );

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my paragraph</p>`)

        $("main").append(`<article class="container">
                        <p id="ArticleParagraph" class="mt-3">This is my article paragraph<p/></article>`)

    }

    function DisplayProductPage()
    {
        console.log("Called DisplayProductPage")
    }

    function DisplayServicePage()
    {
        console.log("Called DisplayServicePage")
    }

    function DisplayAboutPage()
    {
        console.log("Called DisplayAboutPage")
    }

    function DisplayContactPage()
    {
        console.log("Called DisplayContactPage")

        $("a[data = 'contact-list']").off("click");
        $("a[data = 'contact-list']").on("click",function (){
            LoadLink("contact-list")
        });

        // TestFullName();
        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckBox") as HTMLInputElement;



        sendButton.addEventListener("click",function (){
            if(subscribeCheckbox.checked){

                let fullName:string = document.forms[0].fullName.value;
                let contactNumber:string = document.forms[0].contactNumber.value;
                let email:string = document.forms[0].email.value;

                AddContact(fullName,contactNumber,email);
            }
        })
    }

    function DisplayContactListPage()
    {
        console.log("Called DisplayContactListPage")
        if(localStorage.length>0){

            let contactList = document.getElementById("contactList") as HTMLElement;
            let data = "";
            let index =1;
            let keys = Object.keys(localStorage);
            for(const key of keys){
                let contact = new core.Contact();
                let contactData = localStorage.getItem(key) as string;
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td>
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                            <i class="fas fa-edit fa-sm"> Edit</i>
                            </button>
                        </td>
                        <td>
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                            <i class="fas fa-trash-alt fa-sm"> Delete</i>
                            </button>
                        </td>
                        </tr>`;
                index++
            }
            contactList.innerHTML = data;
        }
        $("#addButton").on("click",()=>{

            LoadLink("edit","add");
        })

        $("button.edit").on("click", function(){

            LoadLink("edit", $(this).val() as string);
        })

        $("button.delete").on("click", function(){
            if(confirm("Confirm contact Delete")){
                localStorage.removeItem($(this).val() as string)
            }

            LoadLink("contact-list");
        })

    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()...")


        ContactFormValidation();
        // let page = location.hash.substring(1);
        let page = router.LinkData;

        console.log(page)
        switch (page){
            case "add":

                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fa fa-plus fa-sm"> Add</i>`);

                $("#editButton").on("click",(event)=>{
                    event.preventDefault();

                    let fullName:string = document.forms[0].fullName.value;
                    let contactNumber:string = document.forms[0].contactNumber.value;
                    let email:string = document.forms[0].email.value;

                    AddContact(fullName,contactNumber,email)

                    LoadLink("contact-list");
                })

                $("#cancelButton").on("click", () => {

                    LoadLink("contact-list");
                })

                break;
            default:
                //Edit operation
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string)
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#email").val(contact.emailAddress);

                $("#editButton").on("click", (event)=>{
                    event.preventDefault()

                    contact.fullName = $("#fullName").val() as string;
                    contact.contactNumber = $("#contactNumber").val() as string;
                    contact.emailAddress = $("#email").val() as string;

                    localStorage.setItem(page,contact.serialize() as string);

                    LoadLink("contact-list");
                })

                $("#cancelButton").on("click", () => {

                    LoadLink("contact-list");
                })

                break;
        }
    }

    function DisplayLoginPage(){
        console.log("DisplayLoginPage() called...")

        let messageArea = $("#messageArea") ;
        $("#loginButton").on("click", function (){
            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function (data){
                console.log("test");
               for(const user of data.users){
                   console.log(user);

                   let userName:string = document.forms[0].userName.value;
                   let password:string = document.forms[0].password.value;


                   if(userName === user.Username && password === user.Password){

                       newUser.fromJson(user);
                       success = true;
                       break;
                   }
               }

               if(success){
                   sessionStorage.setItem("user", newUser.serialize() as string) ;
                   messageArea.removeAttr("class").hide() ;
                   LoadLink("contact-list");
               }else{
                   $("#userName").trigger("focus").trigger("select");
                   messageArea
                       .addClass("alert alert-danger")
                       .text("Error: Invalid Credentials")
                       .show();
               }
            });

        });
        $("#cancelButton").on("click", function (){
            document.forms[0].reset();
            LoadLink("home");
        })
    }

    function DisplayRegisterPage(){
        console.log("DisplayRegisterPage() called...")
        AddLinkEvents("login");
    }
    function Display404Page(){
        console.log("Display404Page() called...")
    }

    function ActiveLinkCallback():Function{
        switch(router.ActiveLink){
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutPage;
            case "services": return DisplayServicePage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "products": return DisplayProductPage;
            case "register": return DisplayRegisterPage;
            case "login": return DisplayLoginPage;
            case "edit": return DisplayEditPage;
            case "404": return Display404Page;
            default:
                console.error("ERROR: callback function does not exist " + router.ActiveLink);
                return new Function();
        }
    }

    function CapitalizeFirstCharacter(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function LoadHeader(){

        $.get("./views/components/header.html", function(html_data)
        {
        $("header").html(html_data);
        document.title = CapitalizeFirstCharacter(router.ActiveLink);

        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current","page");

        AddNavigationEvents();
        CheckLogin();
        });
    }

    function LoadContent(){
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();

        $.get(`./views/content/${page_name}.html`,function(html_data){
           $("main").html(html_data);
            CheckLogin();
           callback();
        });
    }

    function LoadFooter(){
        $.get("./views/components/footer.html", function(html_data){
            $("footer").html(html_data);
        });
    }

    function Start(){
        console.log("App Started...");

        LoadHeader();
        LoadLink("home");
        LoadFooter();



    }
    window.addEventListener("load", Start)
})()