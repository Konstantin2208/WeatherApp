package com.example.weatherapp.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {


    private static final String API_KEY = "f3978f267e48df8f5b474b70d7347473";
    private static final String BASE_URL="https://api.openweathermap.org/data/2.5/weather";

    public String getWeather(String city){
        String url =String.format("%s?q=%s&appid=%s&units=metric", BASE_URL, city, API_KEY);

        RestTemplate restTemplate= new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

}
