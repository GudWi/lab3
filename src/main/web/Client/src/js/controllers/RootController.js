import {UrlStorage} from '../resources/UrlStorage.js';
import {ResponseStatusHandler} from './ResponseStatusHandler.js';
import {VocabularyController} from './VocabularyController.js';
import {UserServer} from "../model/UserServer";

class RootController {
    user = null;

    setUser(user){
        this.user = user
    }

    //Отправка запроса на получение надписей
    getLocaleStorage(){
        var url = UrlStorage.getLocalStorageUrl();
        var intermediateVocabulary = [];

        fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                response.forEach(function (element) {
                    intermediateVocabulary.push(element)
                });

                sessionStorage.setItem("vocabulary", JSON.stringify(intermediateVocabulary));
                this.user.set({vocabularyLoaded: true});
            })
            .catch(response => {
                ResponseStatusHandler.getLocaleResponse(response.status)
            })
    }

    checkUser() {
        let url = UrlStorage.checkUser();

        let login = document.getElementById("loginFormName").value;
        let password = document.getElementById("loginFormPass").value;

        let currentUser = this.user;
        let newUser = new UserServer({login: login, password: password});

        fetch(url,{
            method: 'POST',
            body: JSON.stringify(newUser),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                currentUser.set({name: response.name, isLogged: true, state: "", login: login});
                localStorage.setItem("user", JSON.stringify(currentUser));
                console.log(currentUser);
            })
            .catch(error => {
                document.getElementById("loginFormMessage").textContent = VocabularyController.ExtractTextFromVocabulary("loginFormMessage");
                console.info(error)
            });
    }

    registrationUser(){
        let url = UrlStorage.registrationUser();

        let login = document.getElementById("login").value;
        let password = document.getElementById("pass").value;
        let name = document.getElementById("name").value;

        let re = new RegExp("^ *$");

        if(re.test(login) || re.test(password) || re.test(name)){
            document.getElementById("registrationMessage").textContent =
                VocabularyController.ExtractTextFromVocabulary("registrationEmpty");

            setTimeout(function () {
                document.getElementById("registrationMessage").textContent = "";
            }, 3000);
        } else {

            let currentUser = this.user;
            let newUser = new UserServer({login: login, password: password, name: name});

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(response => {
                    currentUser.set({state: "login"});
                })
                .catch(error => {
                    document.getElementById("registrationMessage").textContent =
                        VocabularyController.ExtractTextFromVocabulary("registrationMessage");
                });
        }
    }

    logOut(){
        console.log("logOut");
        this.user.set({name: "", isLogged: false, state: "login"});
        localStorage.removeItem("user")
    }
}

export {RootController};