import {View} from 'backbone.marionette';
import _ from 'underscore';
import indexTemplate from '../../../../html/indexTemplate.html';
import {VocabularyController} from '../../controllers/VocabularyController.js';

const IndexForm = View.extend({
    mark: null,
    amountOfPages: null,

    template: _.template(indexTemplate),

    modelEvents: {
        'change:casesLength': 'lengthChange',
        'change:ready': 'showIndexes'
    },

    initialize(options){
        this.mark = options.mark;
        this.amountOfPages = 1;
    },

    lengthChange(){
        let amountOfPages = Math.floor(this.mark.get("casesLength") / 10);
        let currentPage = this.mark.get("numOfCurrentPage");

        if(this.mark.get("casesLength") % 10 !== 0){
            amountOfPages++;
        }

        if(currentPage > amountOfPages) {
            while (currentPage > amountOfPages) {
                currentPage--;
            }

            this.amountOfPages = amountOfPages;
            this.mark.set({numOfCurrentPage: currentPage})
        } else if(this.amountOfPages !== amountOfPages){
            this.amountOfPages = amountOfPages;
            this.showIndexes();
        }
    },

    showIndexes(){
        let buttonGroup = document.getElementById("page-group");
        let mark = this.mark;
        let currentPage = mark.get("numOfCurrentPage");

        while (buttonGroup.lastChild){
            buttonGroup.removeChild(buttonGroup.lastChild);
        }

        if(this.amountOfPages <= 5){
            for(let i = 1; i <= this.amountOfPages; i++){
                buttonGroup.appendChild(this.createButton(mark, i));
            }
        } else {
            if(currentPage < 3){
                for(let i = 1; i <= 3; i++){
                    buttonGroup.appendChild(this.createButton(mark, i));
                }

                buttonGroup.appendChild(this.createThreeDots());
                buttonGroup.appendChild(this.createButton(mark, this.amountOfPages));
            } else if(currentPage >= (this.amountOfPages - 2)){
                buttonGroup.appendChild(this.createBeginButton(mark));

                for(let i = currentPage - 1; i <= this.amountOfPages; i++){
                    buttonGroup.appendChild(this.createButton(mark, i))
                }
            } else {
                buttonGroup.appendChild(this.createBeginButton(mark));

                for(let i = (currentPage - 1); i <= (currentPage + 1); i++){
                    buttonGroup.appendChild(this.createButton(mark, i))
                }

                buttonGroup.appendChild(this.createThreeDots());
                buttonGroup.appendChild(this.createButton(mark, this.amountOfPages));
            }
        }
    },

    createButton(mark, i){
        let elem = document.createElement("button");
        let access = this.mark.get("clickAccess");
        elem.classList.add('btn');

        if(mark.get("numOfCurrentPage") === i){
            elem.classList.add('btn-secondary');
        } else {
            elem.classList.add('btn-outline-secondary');
        }

        elem.classList.add('indexButton');
        elem.textContent = "" + i;

        elem.addEventListener("click", function () {
            mark.set({numOfCurrentPage: i});
        });

        return elem;
    },

    createThreeDots(){
        let elem = document.createElement("span");
        elem.textContent = "...";
        elem.classList.add('threeDots');
        return elem
    },

    createBeginButton(mark){
        let elem = document.createElement("button");
        elem.classList.add('btn');
        elem.classList.add('btn-outline-secondary');
        elem.classList.add('indexButton');

        elem.textContent = VocabularyController.ExtractTextFromVocabulary("indexBegin");;

        elem.addEventListener("click", function () {
            mark.set({numOfCurrentPage: 1})
        });

        return elem;
    }
});

export {IndexForm};