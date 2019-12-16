import {View} from 'backbone.marionette';
import tableTemplate from '../../../../html/tableTemplate.html';
import _ from 'underscore';
import moment from 'moment';
import {VocabularyController} from '../../controllers/VocabularyController.js';
import {SortModel} from '../../model/SortModel.js';
import {ListController} from '../../controllers/ListController.js';
import {SortConst} from '../../resources/SortConst.js';

const TableForm = View.extend({
    template: _.template(tableTemplate),
    cases: null,
    mark: null,
    user: null,
    sort: null,
    sortModel: null,
    listForLineNums: [],

    modelEvents: {
        'change:ready': 'readyChange',
        'change:numOfCurrentPage': 'loadTable'
    },

    events: {
        'click #view0': 'view0case',
        'click #view1': 'view1case',
        'click #view2': 'view2case',
        'click #view3': 'view3case',
        'click #view4': 'view4case',
        'click #view5': 'view5case',
        'click #view6': 'view6case',
        'click #view7': 'view7case',
        'click #view8': 'view8case',
        'click #view9': 'view9case',
        'click #sortTheme': 'sortTheme',
        'click #sortCategory': 'sortCategory',
        'click #sortPlaneDate': 'sortPlaneDate',
        'click #sortPriority': 'sortPriorityClick',
        'click #sortAuthor': 'sortAuthor',
        'click #sortCreatedDate': 'sortCreatedDate',
        'click #sortDone': 'sortDoneClick',
        'click #sortCompleteDate': 'sortCompleteDate'
    },

    initialize(options){
        this.mark = options.mark;
        this.cases = options.cases;
        this.user = options.user;
        this.sort = options.sort;
        this.sortModel = new SortModel({
            theme: false,
            category: false,
            planeDate: false,
            priority: false,
            author: false,
            createdDate: false,
            done: false,
            completeDate: false
        })
    },

    regions: {
        'thirdRegion': '#list-body-region',
    },

    onRender(){
        this.loadTable();
    },

    loadTable(){
        let controller = new ListController();
        controller.setCases(this.cases);
        controller.setMark(this.mark);
        controller.getAllCases();
    },

    readyChange(){
        if(this.mark.get("ready") === true){
            let counter = 0;
            this.listForLineNums.splice(0, this.listForLineNums.length);
            this.clearTable();

            if(this.sortModel.get("theme")){
                this.cases = (this.sortModel.get("sortMode") === SortConst.getAscending()) ?
                    this.sortText(SortConst.getAscending(), SortConst.getTheme()) :
                    this.sortText(SortConst.getDescending(), SortConst.getTheme())
            } else if(this.sortModel.get("category")){
                this.cases = (this.sortModel.get("sortMode") === SortConst.getAscending()) ?
                    this.sortText(SortConst.getAscending(), SortConst.getCategory()) :
                    this.sortText(SortConst.getDescending(), SortConst.getCategory())
            } else if(this.sortModel.get("planeDate")){
                this.cases = (this.sortModel.get("sortMode") === SortConst.getAscending()) ?
                    this.sortDate(SortConst.getAscending(), SortConst.getPlaneDate()) :
                    this.sortDate(SortConst.getDescending(), SortConst.getPlaneDate())
            } else if(this.sortModel.get("priority")){
                this.cases = (this.sortModel.get("sortMode") === SortConst.getAscending()) ?
                    this.sortPriority(SortConst.getAscending()) :
                    this.sortPriority(SortConst.getDescending())
            } else if(this.sortModel.get("author")){
                this.cases = (this.sortModel.get("sortMode") === SortConst.getAscending()) ?
                    this.sortText(SortConst.getAscending(), SortConst.getAuthor()) :
                    this.sortText(SortConst.getDescending(), SortConst.getAuthor())
            } else if(this.sortModel.get("createdDate")){
                this.cases = (this.sortModel.get("sortMode") === SortConst.getAscending()) ?
                    this.sortDate(SortConst.getAscending(), SortConst.getCreatedDate()) :
                    this.sortDate(SortConst.getDescending(), SortConst.getCreatedDate())
            } else if(this.sortModel.get("done")){
                this.cases = (this.sortModel.get("sortMode") === SortConst.getAscending()) ?
                    this.sortDone(SortConst.getAscending()) :
                    this.sortDone(SortConst.getDescending())
            } else if(this.sortModel.get("completeDate")){
                this.cases = (this.sortModel.get("sortMode") === SortConst.getAscending()) ?
                    this.sortDate(SortConst.getAscending(), SortConst.getCompleteDate()) :
                    this.sortDate(SortConst.getDescending(), SortConst.getCompleteDate())
            }

            for(let i = (this.mark.get("numOfCurrentPage") - 1) * 10; i < this.cases.length; i++){
                let currentCase = this.cases[i];

                if(i < this.mark.get("numOfCurrentPage") * 10){
                    this.listForLineNums.push(currentCase.themeId);
                    document.getElementById("col" + counter + "0").textContent = currentCase.theme;
                    document.getElementById("col" + counter + "1").textContent =
                        this.getCategory(currentCase.category);
                    document.getElementById("col" + counter + "2").textContent =
                        this.getDate(currentCase.planeDate);
                    document.getElementById("col" + counter + "3").textContent =
                        this.getPriority(currentCase.priority);
                    document.getElementById("col" + counter + "4").textContent = currentCase.userName;
                    document.getElementById("col" + counter + "5").textContent =
                        this.getDate(currentCase.createdDate);
                    document.getElementById("check" + counter).checked = currentCase.done;
                    document.getElementById("check" + counter).style.visibility = "visible";
                    document.getElementById("col" + counter + "7").textContent =
                        this.getDate(currentCase.completeDate);
                    document.getElementById("view" + counter).style.visibility = "visible";
                    counter++;
                }
            }

            this.mark.set({casesLength: this.cases.length});
            this.mark.set({ready: false});
        }
    },

    getPriority(priority){
        if(priority === "high"){
            return VocabularyController.ExtractTextFromVocabulary("optionsPriorityHigh")
        } else if(priority === "medium"){
            return VocabularyController.ExtractTextFromVocabulary("optionsPriorityMedium")
        } else if(priority === "low"){
            return VocabularyController.ExtractTextFromVocabulary("optionsPriorityLow")
        }
    },

    getCategory(category){
        if(category === "programming"){
            return VocabularyController.ExtractTextFromVocabulary("optionsCategoryProgramming")
        } else if(category === "administrating"){
            return VocabularyController.ExtractTextFromVocabulary("optionsCategoryAdministrating")
        } else if(category === "education"){
            return VocabularyController.ExtractTextFromVocabulary("optionsCategoryEducation")
        }
    },

    getDate(date){
        if(date !== null){
            return moment(new Date(date)).format('DD MM YYYY hh:mm:ss');
        } else {
            return ""
        }
    },

    clearTable(){
        for(let i = 0; i < 10; i++){
            document.getElementById("col" + i + "0").textContent = "";
            document.getElementById("col" + i + "1").textContent = "";
            document.getElementById("col" + i + "2").textContent = "";
            document.getElementById("col" + i + "3").textContent = "";
            document.getElementById("col" + i + "4").textContent = "";
            document.getElementById("col" + i + "5").textContent = "";
            document.getElementById("check" + i).style.visibility = "hidden";
            document.getElementById("col" + i + "7").textContent = "";
            document.getElementById("view" + i).style.visibility = "hidden";
        }
    },

    view0case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[0]})
    },

    view1case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[1]})
    },

    view2case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[2]})
    },

    view3case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[3]})
    },

    view4case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[4]})
    },

    view5case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[5]})
    },

    view6case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[6]})
    },

    view7case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[7]})
    },

    view8case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[8]})
    },

    view9case(){
        this.user.set({state: "viewTodo", currentCaseId: this.listForLineNums[9]})
    },

    sortByThemeId(arr){
        let size = arr.length;
        let resultArray = [];

        while(resultArray.length < size) {
            let minId = arr[0][SortConst.getThemeId()];
            let minIndex = 0;

            for (let i = 0; i < arr.length; i++) {
                if(minId > arr[i][SortConst.getThemeId()]){
                    minId = arr[i][SortConst.getThemeId()];
                    minIndex = i;
                }
            }

            resultArray.push(arr[minIndex]);
            arr.splice(minIndex, 1);
        }

        return resultArray;
    },

    deleteByThemeId(deleteArr, pastCases){
        let arr = deleteArr.slice();

        while(arr.length > 0){
            let deletedCase = arr[0];

            for(let i = 0; i < pastCases.length; i++){
                if(deletedCase[SortConst.getThemeId()] === pastCases[i][SortConst.getThemeId()]){
                    pastCases.splice(i, 1);
                }
            }

            arr.shift();
        }

        return pastCases;
    },

    sortTheme(){
        if(this.sort.get("theme")){
            this.sort.set("theme", false);
            document.getElementById("themeIcon").classList.remove("fa-angle-up");
            document.getElementById("themeIcon").classList.add("fa-angle-down");

            this.sortModel.set({sortMode: SortConst.getDescending()});
        } else {
            this.sort.set("theme", true);
            document.getElementById("themeIcon").classList.remove("fa-angle-down");
            document.getElementById("themeIcon").classList.add("fa-angle-up");

            this.sortModel.set({sortMode: SortConst.getAscending()});
        }

        this.switchSortModel(SortConst.getTheme());
        this.mark.set({"ready": true});
    },

    sortCategory(){
        if(this.sort.get("category")){
            this.sort.set("category", false);
            document.getElementById("categoryIcon").classList.remove("fa-angle-up");
            document.getElementById("categoryIcon").classList.add("fa-angle-down");

            this.sortModel.set({sortMode: SortConst.getDescending()});
        } else {
            this.sort.set("category", true);
            document.getElementById("categoryIcon").classList.remove("fa-angle-down");
            document.getElementById("categoryIcon").classList.add("fa-angle-up");

            this.sortModel.set({sortMode: SortConst.getAscending()});
        }

        this.switchSortModel(SortConst.getCategory());
        this.mark.set({"ready": true});
    },

    sortPlaneDate(){
        if(this.sort.get(SortConst.getPlaneDate())) {
            this.sort.set(SortConst.getPlaneDate(), false);
            document.getElementById("planeDateIcon").classList.remove("fa-angle-up");
            document.getElementById("planeDateIcon").classList.add("fa-angle-down");

            this.sortModel.set({sortMode: SortConst.getDescending()});
        } else {
            this.sort.set(SortConst.getPlaneDate(), true);
            document.getElementById("planeDateIcon").classList.remove("fa-angle-down");
            document.getElementById("planeDateIcon").classList.add("fa-angle-up");

            this.sortModel.set({sortMode: SortConst.getAscending()});
        }

        this.switchSortModel(SortConst.getPlaneDate());
        this.mark.set({"ready": true});
    },

    sortPriorityClick(){
        if(this.sort.get("priority")){
            this.sort.set("priority", false);
            document.getElementById("priorityIcon").classList.remove("fa-angle-up");
            document.getElementById("priorityIcon").classList.add("fa-angle-down");

            this.sortModel.set({sortMode: SortConst.getDescending()});
        } else {
            this.sort.set("priority", true);
            document.getElementById("priorityIcon").classList.remove("fa-angle-down");
            document.getElementById("priorityIcon").classList.add("fa-angle-up");

            this.sortModel.set({sortMode: SortConst.getAscending()});
        }

        this.switchSortModel(SortConst.getPriority());
        this.mark.set({"ready": true});
    },

    sortPriority(sortMode){
        let pastCases = this.cases.slice();
        let newCases = [];
        let lowPriorityCases = [];
        let middlePriorityCases = [];
        let highPriorityCases = [];

        for(let i = 0;i < pastCases.length;i++){
            if(pastCases[i][SortConst.getPriority()] === SortConst.getLowPriority()){
                lowPriorityCases.push(pastCases[i])
            } else if (pastCases[i][SortConst.getPriority()] === SortConst.getMiddlePriority()){
                middlePriorityCases.push(pastCases[i])
            } else {
                highPriorityCases.push(pastCases[i])
            }
        }

        lowPriorityCases = this.sortByThemeId(lowPriorityCases);
        middlePriorityCases = this.sortByThemeId(middlePriorityCases);
        highPriorityCases = this.sortByThemeId(highPriorityCases);

        if(sortMode === SortConst.getAscending()){
            lowPriorityCases.forEach(function (item) {
                newCases.push(item);
            });

            middlePriorityCases.forEach(function (item) {
                newCases.push(item);
            });

            highPriorityCases.forEach(function (item) {
                newCases.push(item);
            });
        } else {
            highPriorityCases.forEach(function (item) {
                newCases.push(item);
            });

            middlePriorityCases.forEach(function (item) {
                newCases.push(item);
            });

            lowPriorityCases.forEach(function (item) {
                newCases.push(item);
            })
        }

        return newCases;
    },

    sortAuthor(){
        if(this.sort.get("author")){
            this.sort.set("author", false);
            document.getElementById("authorIcon").classList.remove("fa-angle-up");
            document.getElementById("authorIcon").classList.add("fa-angle-down");

            this.sortModel.set({sortMode: SortConst.getDescending()});
        } else {
            this.sort.set("author", true);
            document.getElementById("authorIcon").classList.remove("fa-angle-down");
            document.getElementById("authorIcon").classList.add("fa-angle-up");

            this.sortModel.set({sortMode: SortConst.getAscending()});
        }

        this.switchSortModel(SortConst.getAuthor());
        this.mark.set({"ready": true})
    },

    sortCreatedDate(){
        if(this.sort.get(SortConst.getCreatedDate())){
            this.sort.set(SortConst.getCreatedDate(), false);
            document.getElementById("createdDateIcon").classList.remove("fa-angle-up");
            document.getElementById("createdDateIcon").classList.add("fa-angle-down");

            this.sortModel.set({sortMode: SortConst.getDescending()});
        } else {
            this.sort.set(SortConst.getCreatedDate(), true);
            document.getElementById("createdDateIcon").classList.remove("fa-angle-down");
            document.getElementById("createdDateIcon").classList.add("fa-angle-up");

            this.sortModel.set({sortMode: SortConst.getAscending()});
        }

        this.switchSortModel(SortConst.getCreatedDate());
        this.mark.set({"ready": true});
    },

    sortDoneClick(){
        if(this.sort.get("done")){
            this.sort.set("done", false);
            document.getElementById("doneIcon").classList.remove("fa-angle-up");
            document.getElementById("doneIcon").classList.add("fa-angle-down");

            this.sortModel.set({sortMode: SortConst.getDescending()});
        } else {
            this.sort.set("done", true);
            document.getElementById("doneIcon").classList.remove("fa-angle-down");
            document.getElementById("doneIcon").classList.add("fa-angle-up");

            this.sortModel.set({sortMode: SortConst.getAscending()});
        }

        this.switchSortModel(SortConst.getDone());
        this.mark.set({"ready": true});
    },

    sortCompleteDate(){
        if(this.sort.get(SortConst.getCompleteDate())){
            this.sort.set(SortConst.getCompleteDate(), false);
            document.getElementById("completeDateIcon").classList.remove("fa-angle-up");
            document.getElementById("completeDateIcon").classList.add("fa-angle-down");

            this.sortModel.set({sortMode: SortConst.getDescending()});
        } else {
            this.sort.set(SortConst.getCompleteDate(), true);
            document.getElementById("completeDateIcon").classList.remove("fa-angle-down");
            document.getElementById("completeDateIcon").classList.add("fa-angle-up");

            this.sortModel.set({sortMode: SortConst.getAscending()});
        }

        this.switchSortModel(SortConst.getCompleteDate());
        this.mark.set({"ready": true});
    },

    sortDate(sortMode, dateType){
        let size = this.cases.length;
        let pastCases = this.cases.slice();
        let newCases = [];
        let emptyDateCases = [];

        for(let i = 0;i < pastCases.length;i++){
            if(pastCases[i][dateType] === null){
                emptyDateCases.push(pastCases[i])
            }
        }

        emptyDateCases = this.sortByThemeId(emptyDateCases);
        this.deleteByThemeId(emptyDateCases, pastCases);

        if(sortMode === SortConst.getAscending()){
            emptyDateCases.forEach(function (item) {
                newCases.push(item);
            });

            while (newCases.length < size){
                let minDate = new Date(pastCases[0][dateType]);
                let equalDate = [pastCases[0]];

                for(let i = 1; i < pastCases.length;i++){
                    let currentDate = new Date(pastCases[i][dateType]);

                    if(minDate > currentDate){
                        minDate = currentDate;
                        equalDate = [pastCases[i]];
                    }else if(minDate === currentDate){
                        equalDate.push(pastCases[i])
                    }
                }

                if(equalDate.length > 1){
                    equalDate = this.sortByThemeId(equalDate);
                }

                equalDate.forEach(function (item) {
                    newCases.push(item);
                });

                pastCases = this.deleteByThemeId(equalDate, pastCases);
            }

        } else {
            while (newCases.length < size - emptyDateCases.length){
                let maxDate = new Date(pastCases[0][dateType]);
                let equalDate = [pastCases[0]];

                for(let i = 1; i < pastCases.length;i++){
                    let currentDate = new Date(pastCases[i][dateType]);

                    if(maxDate < currentDate){
                        maxDate = currentDate;
                        equalDate = [pastCases[i]];
                    }else if(maxDate === currentDate){
                        equalDate.push(pastCases[i])
                    }
                }

                if(equalDate.length > 1){
                    equalDate = this.sortByThemeId(equalDate);
                }

                equalDate.forEach(function (item) {
                    newCases.push(item);
                });

                pastCases = this.deleteByThemeId(equalDate, pastCases);
            }

            emptyDateCases.forEach(function (item) {
                newCases.push(item);
            });
        }

        return newCases;
    },

    sortText(sortMode, textType){
        let size = this.cases.length;
        let pastCases = this.cases.slice();
        let newCases = [];
        let emptyTextCases = [];

        for(let i = 0;i < pastCases.length;i++){
            if(pastCases[i][textType] === null){
                emptyTextCases.push(pastCases[i])
            }
        }

        emptyTextCases = this.sortByThemeId(emptyTextCases);
        this.deleteByThemeId(emptyTextCases, pastCases);

        if(sortMode === SortConst.getAscending()){
            emptyTextCases.forEach(function (item) {
                newCases.push(item);
            });

            while (newCases.length < size){
                let minText = pastCases[0][textType];
                let equalText = [pastCases[0]];

                for(let i = 1; i < pastCases.length;i++){
                    let currentText = pastCases[i][textType];

                    if(minText > currentText){
                        minText = currentText;
                        equalText = [pastCases[i]];
                    }else if(minText === currentText){
                        equalText.push(pastCases[i])
                    }
                }

                if(equalText.length > 1){
                    equalText = this.sortByThemeId(equalText);
                }

                equalText.forEach(function (item) {
                    newCases.push(item);
                });

                pastCases = this.deleteByThemeId(equalText, pastCases);
            }

        } else {
            while (newCases.length < size) {
                let maxText = pastCases[0][textType];
                let equalText = [pastCases[0]];

                for (let i = 1; i < pastCases.length; i++) {
                    let currentText = pastCases[i][textType];

                    if (maxText < currentText) {
                        maxText = currentText;
                        equalText = [pastCases[i]];
                    } else if (maxText === currentText) {
                        equalText.push(pastCases[i])
                    }
                }

                if (equalText.length > 1) {
                    equalText = this.sortByThemeId(equalText);
                }

                equalText.forEach(function (item) {
                    newCases.push(item);
                });

                emptyTextCases.forEach(function (item) {
                    newCases.push(item);
                });

                pastCases = this.deleteByThemeId(equalText, pastCases);
            }
        }

        return newCases;
    },

    sortDone(sortMode){
        let pastCases = this.cases.slice();
        let newCases = [];
        let doneCases = [];
        let undoneCases = [];

        for(let i = 0;i < pastCases.length;i++){
            if(pastCases[i][SortConst.getDone()]){
                doneCases.push(pastCases[i])
            } else {
                undoneCases.push(pastCases[i])
            }
        }

        doneCases = this.sortByThemeId(doneCases);
        undoneCases = this.sortByThemeId(undoneCases);

        if(sortMode === SortConst.getAscending()){
            undoneCases.forEach(function (item) {
                newCases.push(item);
            });

            doneCases.forEach(function (item) {
                newCases.push(item);
            });
        } else {
            doneCases.forEach(function (item) {
                newCases.push(item);
            });

            undoneCases.forEach(function (item) {
                newCases.push(item);
            });
        }

        return newCases;
    },

    switchSortModel(SortType){
        if(SortType === SortConst.getAuthor()){
            this.sortModel.set({
                theme: false,
                category: false,
                planeDate: false,
                priority: false,
                author: true,
                createdDate: false,
                done: false,
                completeDate: false
            })
        } else if (SortType === SortConst.getCategory()){
            this.sortModel.set({
                theme: false,
                category: true,
                planeDate: false,
                priority: false,
                author: false,
                createdDate: false,
                done: false,
                completeDate: false
            })
        } else if (SortType === SortConst.getTheme()){
            this.sortModel.set({
                theme: true,
                category: false,
                planeDate: false,
                priority: false,
                author: false,
                createdDate: false,
                done: false,
                completeDate: false
            })
        } else if (SortType === SortConst.getCompleteDate()){
            this.sortModel.set({
                theme: false,
                category: false,
                planeDate: false,
                priority: false,
                author: false,
                createdDate: false,
                done: false,
                completeDate: true
            })
        } else if (SortType === SortConst.getCreatedDate()){
            this.sortModel.set({
                theme: false,
                category: false,
                planeDate: false,
                priority: false,
                author: false,
                createdDate: true,
                done: false,
                completeDate: false
            })
        } else if (SortType === SortConst.getPlaneDate()){
            this.sortModel.set({
                theme: false,
                category: false,
                planeDate: true,
                priority: false,
                author: false,
                createdDate: false,
                done: false,
                completeDate: false
            })
        } else if (SortType === SortConst.getDone()){
            this.sortModel.set({
                theme: false,
                category: false,
                planeDate: false,
                priority: false,
                author: false,
                createdDate: false,
                done: true,
                completeDate: false
            })
        } else if (SortType === SortConst.getPriority()){
            this.sortModel.set({
                theme: false,
                category: false,
                planeDate: false,
                priority: true,
                author: false,
                createdDate: false,
                done: false,
                completeDate: false
            })
        }
    },

    onAttach(){
        this.fillText();
    },

    fillText(){
        document.getElementById("tableTheme").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableTheme");
        document.getElementById("tableCategory").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableCategory");
        document.getElementById("tablePlaneDate").textContent =
            VocabularyController.ExtractTextFromVocabulary("tablePlaneDate");
        document.getElementById("tablePriority").textContent =
            VocabularyController.ExtractTextFromVocabulary("tablePriority");
        document.getElementById("tableAuthor").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableAuthor");
        document.getElementById("tableCreatedDate").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableCreatedDate");
        document.getElementById("tableDone").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableDone");
        document.getElementById("tableCompleteDate").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableCompleteDate");
        document.getElementById("tableAct").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableAct");
        document.getElementById("view0").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
        document.getElementById("view1").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
        document.getElementById("view2").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
        document.getElementById("view3").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
        document.getElementById("view4").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
        document.getElementById("view5").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
        document.getElementById("view6").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
        document.getElementById("view7").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
        document.getElementById("view8").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
        document.getElementById("view9").textContent =
            VocabularyController.ExtractTextFromVocabulary("tableView");
    }
});

export {TableForm};