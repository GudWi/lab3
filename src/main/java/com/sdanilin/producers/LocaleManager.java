package com.sdanilin.producers;

import com.sdanilin.model.VocabularyModel;
import org.apache.log4j.Logger;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Default;
import javax.inject.Inject;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

@Dependent
@Default
public class LocaleManager {
    @Inject
    private Logger logger;

    public List<VocabularyModel> getLocalStorage(String locale){
        FileInputStream fis;
        Properties localeProperties = new Properties();
        List<VocabularyModel> localeStorage = new ArrayList<>();
        ClassLoader loader = getClass().getClassLoader();

        try{
            try {
                fis = new FileInputStream(loader.getResource(getPath(locale)).getFile());
            } catch (NullPointerException e){
                fis = new FileInputStream(loader.getResource(getPath("")).getFile());
            }

            localeProperties.load(fis);

            for(Map.Entry<Object, Object> pair : localeProperties.entrySet()){
                localeStorage.add(new VocabularyModel(pair.getKey().toString(), pair.getValue().toString()));
            }

        } catch (IOException e){
            logger.error("FileNotFound");
        }

        return localeStorage;
    }

    private String getPath(String locale){
        if (locale.equals("")){
            return "content.properties";
        } else {
            return "content_" + locale + ".properties";
        }
    }
}
