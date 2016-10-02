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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by nanako on 16/08/28.
 */
public class FlickrImage {

    public List<Map<String, String>> images(String[] keyword) throws FlickrException {
        Config conf = ConfigFactory.load();
        String apiKey = conf.getString("flickrApi.key");
        String sharedSecret = conf.getString("flickrApi.secret");

        Flickr flickr = new Flickr(apiKey, sharedSecret, new REST());
        PhotosInterface pi = flickr.getPhotosInterface();
        SearchParameters params = new SearchParameters();
        params.setTags(keyword);
        PhotoList<Photo> pl = pi.search(params, 10, 1);

        List<Map<String, String>> photoUrlList = new ArrayList<>();
        for (Photo pt : pl) {
            Map<String, String> photoUrl = new HashMap<>();
            photoUrl.put("mediumUrl", pt.getMediumUrl());
            photoUrlList.add(photoUrl);
        }
//        List list = new ArrayList<String>();
//        for (Photo photo : pl) {
//            list.add(photo.getMediumUrl());
//        }
        return photoUrlList;
    }
}
