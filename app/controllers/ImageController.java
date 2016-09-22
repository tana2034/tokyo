package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.photos.Photo;
import com.flickr4java.flickr.photos.PhotoList;
import com.flickr4java.flickr.photos.PhotosInterface;
import com.flickr4java.flickr.photos.SearchParameters;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.image;

import static play.libs.Json.toJson;

/**
 * Created by nanako on 16/08/28.
 */
public class ImageController extends Controller {


}
