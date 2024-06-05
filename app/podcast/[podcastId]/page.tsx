"use client";
import PodcastDetailCard from "@/components/podcastDetailCard";
import {
    usePodcastById,
    usePodcasts,
} from "@/customHooks/usePersistence";
import { Episode } from "@/models/Episode";
import { Podcast } from "@/models/Podcast";
import { setDataIsLoading } from "@/redux/features/utils/utilsSlice";
import { useAppDispatch } from "@/redux/reducHooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PodcastSkeleton from "../components/podcastSkeleton";

interface Props {
    params: {
        podcastId: string;
    };
}

const PodcastPage = ({ params }: Props) => {
    const podcastId = params.podcastId;
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
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [podcastData, setPodcastData] =
        React.useState<Podcast | null>(null);

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
        if (isLoading && !podcastDetails) {
            dispatch(setDataIsLoading(true));
        } else {
            dispatch(setDataIsLoading(false));
        }
    }, [isLoading]);

    if (isLoading || podcastsLoading)
        return <PodcastSkeleton typeOfSkeleton="podcast" />;
    if (isError || podcastsError)
        return (
            <div className="flex w-full h-full justify-center items-center">{`Error loading podcasts with id: ${podcastId}`}</div>
        );
    return (
        <div className="flex w-full p-8">
            {podcastData && (
                <PodcastDetailCard podcast={podcastData} />
            )}
            <div className="episodesContainer flex flex-col flex-1 ml-16 mt-4">
                <div className="episodeTitle p-8 shadow-lg rounded-md">
                    <h1 className="w-full font-bold text-2xl">
                        Episodes:{" "}
                        {podcastDetails.resultCount}
                    </h1>
                </div>
                <div className="episodeList p-8 shadow-lg rounded-md mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Release Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Duration
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {podcastDetails.results.map(
                                (
                                    episode: Episode,
                                    index: number
                                ) => {
                                    if (index === 0)
                                        return null;
                                    // Convert episode.trackTimeMillis to MM:SS
                                    const duration =
                                        episode.trackTimeMillis
                                            ? new Date(
                                                  episode.trackTimeMillis
                                              )
                                                  .toISOString()
                                                  .substr(
                                                      14,
                                                      5
                                                  )
                                            : "N/A";
                                    return (
                                        <tr
                                            key={
                                                episode.trackId
                                            }
                                            className="hover:bg-gray-100"
                                        >
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:cursor-pointer"
                                                onClick={() => {
                                                    dispatch(
                                                        setDataIsLoading(
                                                            true
                                                        )
                                                    );
                                                    router.push(
                                                        `/podcast/${podcastId}/episode/${episode.trackId}`
                                                    );
                                                }}
                                            >
                                                {
                                                    episode.trackName
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(
                                                    episode.releaseDate
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {duration}
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PodcastPage;
