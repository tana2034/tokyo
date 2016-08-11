package services;

import java.util.ResourceBundle;

/**
 * Created by nanako on 16/08/11.
 */
public class ResourceAccessor {
    private ResourceBundle resourcebundle = null;

    public ResourceAccessor(String propertyName) {
        resourcebundle = ResourceBundle.getBundle(propertyName);
    }

    /**
     * Propertiesファイルの値を取得
     * @param key
     * @return value
     */
    public String getValue(String key) {
        return resourcebundle.getString(key);
    }
}
