"use client";
import PodcastDetailCard from "@/components/podcastDetailCard";
import {
    usePodcastById,
    usePodcasts,
} from "@/customHooks/usePersistence";
import { Episode } from "@/models/Episode";
import { Podcast } from "@/models/Podcast";
import React, { useEffect } from "react";

interface Props {
    params: {
        podcastId: string;
        episodeId: string;
    };
}

const EpisodePage = ({ params }: Props) => {
    const podcastId = params.podcastId;
    const episodeId = params.episodeId;
    const {
        data: podcasts,
        isLoading: podcastsLoading,
        isError: podcastsError,
    } = usePodcasts();
    const {
        data: podcastDetails,
        isLoading,
        isError,
    } = usePodcastById(podcastId);
    const [podcastData, setPodcastData] =
        React.useState<Podcast | null>(null);
    const [episodeData, setEpisodeData] =
        React.useState<Episode | null>(null);

    useEffect(() => {
        if (podcasts) {
            const podcast = podcasts.find(
                (podcast: Podcast) =>
                    podcast.id.attributes["im:id"] ===
                    podcastId
            );
            setPodcastData(podcast);
        }
    }, [podcasts]);

    useEffect(() => {
        if (podcastDetails) {
            const episode = podcastDetails.results.find(
                (episode: Episode) =>
                    episode.trackId.toString() === episodeId
            );
            setEpisodeData(episode);
        }
    }, [podcastDetails]);

    if (isLoading || podcastsLoading)
        return <p>Loading...</p>;
    if (isError || podcastsError)
        return (
            <p>{`Error loading podcasts with id: ${podcastId}`}</p>
        );

    return (
        <div className="flex w-full p-8">
            {podcastData && (
                <PodcastDetailCard podcast={podcastData} />
            )}
            <div className="episodesContainer flex flex-col flex-1 ml-16 mt-4">
                <div className="episodePreview p-8 shadow-lg rounded-md">
                    <p className="text-xl font-bold">
                        {episodeData?.trackName}
                    </p>
                    <p className="mt-4 whitespace-pre-line">
                        {episodeData?.description}
                    </p>
                    <audio
                        className="mt-8 w-full"
                        controls
                        src={episodeData?.previewUrl}
                    />
                </div>
            </div>
        </div>
    );
};

export default EpisodePage;
