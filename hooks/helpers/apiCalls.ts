import { customAxios } from "@/utils/axios";

export const fetchPodcasts = async () => {
    const response = await customAxios({
        url: `https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')}`,
        method: "GET",
    });
    if (!response.feed.entry) {
        console.error("Error fetching podcasts", response);
        return [];
    } else {
        return response.feed.entry;
    }
};

export const fetchPodcastsById = async (id: string) => {
    const url = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
    const response = await customAxios({
        url: `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
        method: "GET",
    });
    if (!response.results) {
        console.error("Error fetching podcasts", response);
        return [];
    } else {
        return response;
    }
};