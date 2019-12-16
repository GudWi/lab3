import {UrlStorage} from '../resources/UrlStorage.js';
import {ResponseStatusHandler} from './ResponseStatusHandler.js';
import {VocabularyController} from './VocabularyController.js';
import {CaseModel} from "../model/CaseModel";
import $ from "jquery";

class ViewController {
    user = null;
    todo = null;
    access = null;

    setUser(user) {
        this.user = user
    }

    setMark(mark){
        this.mark = mark;
    }

    setAccess(access){
        this.access = access;
    }

    checkAccess(){
        let url = UrlStorage.checkAccess(this.user.get("currentCaseId"));
        let login = this.user.get("login");
        let access = this.access;

        fetch(url, {
            method: 'POST',
            body: login,
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                if(response.access === false){
                    $("#viewEdit").css("visibility", "hidden");
                    $("#viewDelete").css("visibility", "hidden");
                    $("#viewPermissions").css("visibility", "hidden");
                } else {
                    $("#viewEdit").css("visibility", "visible");
                    $("#viewDelete").css("visibility", "visible");
                    $("#viewPermissions").css("visibility", "visible");
                }
            }).catch(error => {
            this.user.set({state: ""});
        });
    }

    loadCase(todo){
        let url = UrlStorage.loadCase(this.user.get("currentCaseId"));
        this.todo = todo;
        let intermediateCase = this.todo;

        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                let currentUser = JSON.parse(localStorage.getItem("user"));

                intermediateCase.set({theme: response.theme, category: response.category, planeDate: response.planeDate,
                priority: response.priority, userName: response.userName, description: response.description,
                    done: response.done, createdDate: response.createdDate, completeDate: response.completeDate});

                document.getElementById("nameOfUser").textContent = currentUser.name;
                this.mark.set({ready: true});
            })
            .catch(error => {
                this.user.set({state: ""});
            });
    }

    deleteCase(todo) {
        let url = UrlStorage.deleteCase(this.user.get("currentCaseId"));
        this.todo = todo;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.user.set({state: ""});
        }).catch(error => {
            console.info(error);
            this.user.set({state: ""});
        })
    }

    updateCase(todo){
        let url = UrlStorage.updateCase(this.user.get("currentCaseId"));
        this.todo = todo;
        let currentUser = JSON.parse(localStorage.getItem("user"));

        let theme = document.getElementById("editTheme").value;
        let priority = this.transformPriority();
        let category = this.transformCategory();
        let description = document.getElementById("editDescription").value;
        let planeDate = (document.getElementById("editPlaneDate").value !== "") ?
            new Date(document.getElementById("editPlaneDate").value) : null;
        let createdDate = (document.getElementById("editCreationDate").value !== "") ?
            new Date(document.getElementById("editCreationDate").value) : null;
        let completeDate = (document.getElementById("editCompleteDate").value !== "") ?
            new Date(document.getElementById("editCompleteDate").value) : null;
        let done = document.getElementById("editDone").checked;

        let intermediateCase = new CaseModel({
            theme: theme,
            category: category,
            planeDate: planeDate,
            priority: priority,
            userName: currentUser.login,
            description: description,
            createdDate: createdDate,
            completeDate: completeDate,
            done: done
        });

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(intermediateCase),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.user.set({state: "viewTodo"});
        }).catch(error => {
            console.log(error);
        })
    }

    transformPriority(){
        let priority = document.getElementById("editPriority").value;
        let result = "";

        if(priority === VocabularyController.ExtractTextFromVocabulary("optionsPriorityHigh")){
            result = "high"
        } else if(priority === VocabularyController.ExtractTextFromVocabulary("optionsPriorityMedium")){
            result = "medium"
        } else if(priority === VocabularyController.ExtractTextFromVocabulary("optionsPriorityLow")){
            result = "low"
        }

        return result
    }

    transformCategory(){
        let category = document.getElementById("editCategory").value;
        let result = "";

        if(category === VocabularyController.ExtractTextFromVocabulary("optionsCategoryProgramming")){
            result = "programming"
        } else if(category === VocabularyController.ExtractTextFromVocabulary("optionsCategoryAdministrating")){
            result = "administrating"
        } else if(category === VocabularyController.ExtractTextFromVocabulary("optionsCategoryEducation")){
            result = "education"
        }

        return result
    }

    setDate(string){
        let date = string.split(" ");
        let time = date[3].split(":");
        let resultDate = new Date(date[2], date[1], date[0], time[0], time[1], time[2]);

        return resultDate;
    }
}

export {ViewController};