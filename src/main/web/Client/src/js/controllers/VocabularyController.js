//Класс для работы с локалью
class VocabularyController{
    //Получить значение словаря по ключу
    static ExtractTextFromVocabulary(key){
        var result;

        JSON.parse(sessionStorage.getItem("vocabulary")).forEach(function (pair) {
            if(pair.key === key){
                result = pair.value;
            }
        });

        return result;
    }
}

export {VocabularyController};