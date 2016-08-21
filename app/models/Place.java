package models;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

/**
 * Created by nanako on 16/08/12.
 */
@Entity
public class Place extends Model {
    @Id
    public String id;

    public String placeName;

    public String placeNameKana;

    public String placeNameAlpha;

}
