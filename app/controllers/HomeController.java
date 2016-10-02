package controllers;

import com.avaje.ebean.Finder;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.photos.PhotoList;
import models.Place;
import play.mvc.Controller;
import play.mvc.Result;
import static play.libs.Json.toJson;

import services.FlickrImage;
import views.html.home;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;


/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    @Inject
    WebJarAssets webJarAssets;

    public Result home() {
        return ok(home.render(webJarAssets));
    }

    public Result places() {
        List<Place> places = new Finder<String, Place>(Place.class).all();
        return ok(toJson(places));
    }

    public Result place(String id) throws FlickrException {
        Place place = new Finder<String, Place>(Place.class).byId(id);
        List<Map<String, String>> pl = new FlickrImage().images(new String[] {place.placeName});
        return ok(toJson(pl));
    }
}
