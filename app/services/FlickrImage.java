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
        params.setSafeSearch(Flickr.SAFETYLEVEL_SAFE);
        PhotoList<Photo> pl = pi.search(params, 20, 1);

        List<Map<String, String>> photoList = new ArrayList<>();
        for (Photo pt : pl) {
            Map<String, String> propList = new HashMap<>();
            propList.put("mediumUrl", pt.getMediumUrl());
            propList.put("small320url", pt.getSmall320Url());
            propList.put("description", pt.getDescription());
            propList.put("url", pt.getUrl());
            propList.put("license", pt.getLicense());
            propList.put("title", pt.getTitle());
            photoList.add(propList);
        }
//        List list = new ArrayList<String>();
//        for (Photo photo : pl) {
//            list.add(photo.getMediumUrl());
//        }
        return photoList;
    }
}
