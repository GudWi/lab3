import {UrlStorage} from '../resources/UrlStorage.js';
import {CaseModel} from '../model/CaseModel.js';
import {VocabularyController} from './VocabularyController.js';

class ListController {
    cases = [];
    mark = null;

    setCases(cases){
        this.cases = cases;
    }

    setMark(mark){
        this.mark = mark;
    }

    getAllCases(){
        let url = UrlStorage.getAllCases();
        let intermediateCase = this.cases;
        intermediateCase.splice(0, intermediateCase.length);

        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                response.forEach(function (doing) {
                    intermediateCase.push(doing);
                });
            }).then(response => {
                let currentUser = JSON.parse(localStorage.getItem("user"));
                document.getElementById("nameOfUser").textContent = currentUser.name;
                this.mark.set({ready: true});
                this.mark.set({occupied: false});
            })
            .catch(error => {
                console.info(error)
            });
    }

    addCase(){
        let url = UrlStorage.addCase();
        let currentUser = JSON.parse(localStorage.getItem("user"));

        let theme = document.getElementById("themeAdd").value;
        let priority = this.transformPriority();
        let category = this.transformCategory();
        let description = document.getElementById("descriptionAdd").value;
        let planeDate = new Date(document.getElementById("plannedDateAdd").value);

        let intermediateCase = new CaseModel({
            theme: theme,
            category: category,
            planeDate: planeDate,
            priority: priority,
            userName: currentUser.login,
            description: description
        });

        fetch(url,{
            method: 'POST',
            body: JSON.stringify(intermediateCase),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {
                this.getAllCases();
        }).catch(error => {
                console.info(error)
        });
    }

    transformPriority(){
        let priority = document.getElementById("priorityAdd").value;
        let result = "";

        if(priority === VocabularyController.ExtractTextFromVocabulary("optionsPriorityHigh")){
            result = "high"
        } else if(priority === VocabularyController.ExtractTextFromVocabulary("optionsPriorityMedium")){
            result = "medium"
        } else if(priority === VocabularyController.ExtractTextFromVocabulary("optionsPriorityLow")){
            result = "low"
        }

        console.log(priority + " " + result);
        return result
    }

    transformCategory(){
        let category = document.getElementById("category").value;
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

export {ListController}