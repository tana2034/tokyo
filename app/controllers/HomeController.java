package controllers;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.photos.PhotoList;
import com.flickr4java.flickr.photos.PhotosInterface;
import com.flickr4java.flickr.photos.SearchParameters;
import play.mvc.*;

import services.ResourceAccessor;
import views.html.*;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    public Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public Result getFlickrImage() throws FlickrException {

        ResourceAccessor accessor = new ResourceAccessor("flickr");
        String apiKey = accessor.getValue("key");
        String sharedSecret = accessor.getValue("secret");

        Flickr flickr = new Flickr(apiKey, sharedSecret, new REST());
        PhotosInterface pi = flickr.getPhotosInterface();
        SearchParameters params = new SearchParameters();
        params.setMachineTags(new String[]{"浅草"});
        PhotoList pl = pi.search(params, 1, 1);

        return ok();
    }
}
