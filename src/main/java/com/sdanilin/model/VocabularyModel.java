package com.sdanilin.model;

public class VocabularyModel {
    private String key;

    private String value;

    public VocabularyModel(String key, String value){
        this.key = key;
        this.value = value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public String getKey() {
        return key;
    }
}
