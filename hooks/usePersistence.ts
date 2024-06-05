"use client";

import { useQuery } from "react-query";
import {
    fetchPodcasts,
    fetchPodcastsById,
} from "./helpers/apiCalls";

const usePersistedQuery = (
    key: string,
    queryFn: Function,
    options: any
) => {
    return useQuery(
        key,
        async () => {
            try {
                const cachedData =
                    localStorage.getItem(key);
                if (cachedData) {
                    // check if the data is expired
                    const data = JSON.parse(cachedData);
                    if (data.expiration > Date.now()) {
                        console.log(
                            "using cached data",
                            data
                        );
                        return data.data;
                    } else {
                        localStorage.removeItem(key);
                    }
                }
                // fetch the data if it's not cached
                const data = await queryFn();
                // set an attribute to indicates the date of expiration
                const newData = {
                    data,
                    expiration:
                        Date.now() + 86400000,
                };
                localStorage.setItem(
                    key,
                    JSON.stringify(newData)
                );
                return data;
            } catch (error) {
                console.log(
                    "Error fetching podcasts",
                    error
                );
                throw error;
            }
        },
        options
    );
};

const getCachedData = (key: string) => {
    const cachedData = localStorage.getItem(key);
    let staleTime = 86400000; // default to 24 hours
    let cacheTime = 86400000; // default to 24 hours

    if (cachedData) {
        const data = JSON.parse(cachedData);
        const expiration = data.expiration;
        const timeLeft = expiration - Date.now();
        staleTime = timeLeft > 0 ? timeLeft : 0;
        cacheTime = timeLeft > 0 ? timeLeft : 0;
    }

    return { staleTime, cacheTime };
};

export const usePodcasts = () => {
    const key = "podcasts";
    const { staleTime, cacheTime } = getCachedData(key);
    return usePersistedQuery(key, fetchPodcasts, {
        staleTime: staleTime,
        cacheTime: cacheTime,
    });
};

export const usePodcastById = (id: string) => {
    const key = `podcast-${id}`;
    const { staleTime, cacheTime } = getCachedData(key);
    return usePersistedQuery(key, () => fetchPodcastsById(id), {
        staleTime: staleTime,
        cacheTime: cacheTime,
    });
};

