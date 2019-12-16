class ResponseStatusHandler{
    //обработка кодов после получения словаря
    static getLocaleResponse(statusCode){
        var message = document.createElement('label');

        if(statusCode !== 200){
            message.style.color = "red";
            message.textContent = "Dictionary wasn't loaded";
        }
    }
}

export {ResponseStatusHandler};