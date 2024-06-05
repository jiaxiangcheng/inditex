"use client";
import PodcastSkeleton from "@/app/podcast/components/podcastSkeleton";
import PodcastDetailCard from "@/components/podcastDetailCard";
import {
    usePodcastById,
    usePodcasts,
} from "@/customHooks/usePersistence";
import { Episode } from "@/models/Episode";
import { Podcast } from "@/models/Podcast";
import { setDataIsLoading } from "@/redux/features/utils/utilsSlice";
import { useAppDispatch } from "@/redux/reducHooks";
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
    const dispatch = useAppDispatch();
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

    useEffect(() => {
        if (
            isLoading &&
            podcastsLoading &&
            !podcastDetails &&
            !episodeData
        ) {
            dispatch(setDataIsLoading(true));
        } else {
            dispatch(setDataIsLoading(false));
        }
    }, [isLoading]);

    if (isLoading || podcastsLoading)
        return <PodcastSkeleton typeOfSkeleton="episode" />;
    if (isError || podcastsError)
        return (
            <div className="flex w-full h-full justify-center items-center">{`Error loading episode with trackingId: ${episodeId}`}</div>
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
                    <p className="mt-4 whitespace-pre-line"></p>
                    <div
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                            __html: episodeData?.description!,
                        }}
                    />
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
