//Класс для хранения url для обращения к серверу
class UrlStorage{
    //url на получение словаря
    static getLocalStorageUrl(){
        return location.protocol + '//' + location.host + location.pathname + "app/locale/getLocale";
    }

    static checkUser(){
        return location.protocol + '//' + location.host + location.pathname + "app/user/login";
    }

    static registrationUser(){
        return location.protocol + '//' + location.host + location.pathname + "app/user/registration";
    }

    static getAllCases(){
        return location.protocol + '//' + location.host + location.pathname + "app/case/getCases";
    }

    static addCase(){
        return location.protocol + '//' + location.host + location.pathname + "app/case/addCase";
    }

    static loadCase(currentCaseId){
        return location.protocol + '//' + location.host + location.pathname + "app/case/getCase/" + currentCaseId;
    }

    static deleteCase(currentCaseId){
        return location.protocol + '//' + location.host + location.pathname + "app/case/deleteCase/" + currentCaseId;
    }

    static updateCase(currentCaseId){
        return location.protocol + '//' + location.host + location.pathname + "app/case/updateCase/" + currentCaseId;
    }

    static checkAccess(currentCaseId){
        return location.protocol + '//' + location.host + location.pathname + "app/case/checkAccess/" + currentCaseId;
    }

    static sendPermissions(currentCaseId){
        return location.protocol + '//' + location.host + location.pathname + "app/case/sendPermissions/" + currentCaseId;
    }

    static getAllUsers(){
        return location.protocol + '//' + location.host + location.pathname + "app/user/getAllUsers/"
    }
}

export {UrlStorage};