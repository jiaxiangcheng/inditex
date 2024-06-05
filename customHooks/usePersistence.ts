"use client";

import { useQuery } from "react-query";
import { customAxios } from "@/utils/axios";

const fetchPodcasts = async () => {
    const response = await customAxios({
        url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
        method: "GET",
    });
    console.log("response", response);
    if (!response.feed.entry) {
        console.error("Error fetching podcasts", response);
        return [];
    } else {
        return response.feed.entry;
    }
};

const fetchPodcastsById = async (id: string) => {
    const response = await customAxios({
        url: `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`,
        method: "GET",
    });
    console.log("response", response);
    if (!response.results) {
        console.error("Error fetching podcasts", response);
        return [];
    } else {
        return response.results;
    }
};

const usePersistedQuery = (
    key: string,
    queryFn: Function,
    options: any
) => {
    return useQuery(
        key,
        async () => {
            const cachedData = localStorage.getItem(key);
            if (cachedData) {
                // check if the data is expired
                const data = JSON.parse(cachedData);
                if (data.expiration > Date.now()) {
                    return data;
                } else {
                    localStorage.removeItem(key);
                }
            }
            const data = await queryFn();
            // set an attribute to indicates the date of expiration
            data.expiration =
                Date.now() + options.staleTime;
            localStorage.setItem(key, JSON.stringify(data));
            return data;
        },
        options
    );
};

export const usePodcasts = () => {
    // set the staleTime and cacheTime to 1 day
    return usePersistedQuery("podcasts", fetchPodcasts, {
        staleTime: 86400000,
        cacheTime: 86400000,
    });
};

export const usePodcastById = (id: string) => {
    return usePersistedQuery(
        `podcast-${id}`,
        () => fetchPodcastsById(id),
        {
            staleTime: 86400000,
            cacheTime: 86400000,
        }
    );
};
