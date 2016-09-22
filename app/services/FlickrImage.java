package services;

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

/**
 * Created by nanako on 16/08/28.
 */
public class FlickrImage {

    public PhotoList<Photo> images(String[] keyword) throws FlickrException {
        Config conf = ConfigFactory.load();
        String apiKey = conf.getString("flickrApi.key");
        String sharedSecret = conf.getString("flickrApi.secret");

        Flickr flickr = new Flickr(apiKey, sharedSecret, new REST());
        PhotosInterface pi = flickr.getPhotosInterface();
        SearchParameters params = new SearchParameters();
        params.setTags(keyword);
        PhotoList<Photo> pl = pi.search(params, 10, 1);
//        List list = new ArrayList<String>();
//        for (Photo photo : pl) {
//            list.add(photo.getMediumUrl());
//        }
        return pl;
    }
}
