import {UrlStorage} from '../resources/UrlStorage.js';
import $ from "jquery";

class PermissionsController {
    user = null;

    setUser(user) {
        this.user = user
    }

    getAllUsers(){
        let url = UrlStorage.getAllUsers();
        let login = this.user.get("login");
        let caseId = this.user.get("currentCaseId");

        fetch(url, {
            method: 'POST',
            body: caseId,
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                for(let i = 0; i < response.length; i++){
                    if(response[i].login !== login){
                        $("#usersRow").append("<span id='loginOfUser' style='padding: 5px'></span>")
                            .append("<input type=\"checkbox\" class='usersCheckbox' style='padding-right: 15px' id=\"check\">");

                        $("#loginOfUser").attr("id", "userName" + i).text(response[i].login);
                        $("#check").attr("id", response[i].login);

                        if(response[i].access){
                            $("#" + response[i].login).prop("checked", true);
                        }
                    }
                }
            }).catch(error => {
            this.user.set({state: ""});
        });
    }
    
    sendPermissions(){
        let url = UrlStorage.sendPermissions(this.user.get("currentCaseId"));
        let login = this.user.get("login");
        let body = this.createJSONPermissions();

        fetch(url, {
            method: 'POST',
            body: body,
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {
                $("#usersRow").append("<span id='message'>Отправлено</span>");
                
                setTimeout(function () {
                    $("#message").remove();
                }, 3000);
            }).catch(error => {
            this.user.set({state: ""});
        });
    }

    createJSONPermissions(){
        let permissions = [];

        let permObjects = $(".usersCheckbox");

        for(let i = 0; i < permObjects.length; i++){
            permissions.push({
                login: permObjects[i].id,
                access: permObjects[i].checked
            });
        }

        return JSON.stringify(permissions)
    }
}

export {PermissionsController}