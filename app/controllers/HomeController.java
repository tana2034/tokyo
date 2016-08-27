package controllers;

import com.avaje.ebean.Finder;
import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.photos.Photo;
import com.flickr4java.flickr.photos.PhotoList;
import com.flickr4java.flickr.photos.PhotosInterface;
import com.flickr4java.flickr.photos.SearchParameters;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import models.Place;
import play.mvc.Controller;
import play.mvc.Result;
import static play.libs.Json.toJson;
import views.html.home;
import views.html.index;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;


/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    @Inject
    WebJarAssets webJarAssets;

    public Result home() {
        List<Place> places = new Finder<String, Place>(Place.class).all();
        return ok(home.render(webJarAssets,toJson(places).toString()));
    }

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
  /*  public Result index() {
        return ok(index.render("Your new application is ready."));
    }*/

    public Result getFlickrImage() throws FlickrException {
        Config conf = ConfigFactory.load();
        String apiKey = conf.getString("flickrApi.key");
        String sharedSecret = conf.getString("flickrApi.secret");

        Flickr flickr = new Flickr(apiKey, sharedSecret, new REST());
        PhotosInterface pi = flickr.getPhotosInterface();
        SearchParameters params = new SearchParameters();
        params.setTags(new String[]{"浅草"});
        PhotoList<Photo> pl = pi.search(params, 10, 1);
        List list = new ArrayList<String>();
        for (Photo photo : pl) {
            list.add(photo.getMediumUrl());
        }
        return ok(list.toString());
    }
}
