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
import React, { useEffect, useMemo } from "react";

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

    const podcastData = useMemo(() => {
        if (podcasts) {
            return (
                podcasts.find(
                    (podcast: Podcast) =>
                        podcast.id.attributes["im:id"] ===
                        podcastId
                ) || null
            );
        }
        return null;
    }, [podcasts, podcastId]);

    const episodeData = useMemo(() => {
        if (podcastDetails) {
            return (
                podcastDetails.results.find(
                    (episode: Episode) =>
                        episode.trackId.toString() ===
                        episodeId
                ) || null
            );
        }
        return null;
    }, [podcastDetails, episodeId]);

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
    }, [
        isLoading,
        podcastsLoading,
        podcastDetails,
        episodeData,
        dispatch,
    ]);

    if (isLoading || podcastsLoading) {
        return <PodcastSkeleton typeOfSkeleton="episode" />;
    }

    if (isError || podcastsError) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                {`Error loading episode with trackingId: ${episodeId}`}
            </div>
        );
    }

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
