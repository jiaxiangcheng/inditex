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
                const data = await queryFn();
                // set an attribute to indicates the date of expiration
                const newData = {
                    data,
                    expiration:
                        Date.now() + options.staleTime,
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
