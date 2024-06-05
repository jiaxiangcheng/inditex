"use client";
import PodcastDetailCard from "@/components/podcastDetailCard";
import {
    usePodcastById,
    usePodcasts,
} from "@/customHooks/usePersistence";
import { Podcast } from "@/models/Podcast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
    params: {
        podcastId: string;
    };
}

const PodcastPage = ({ params }: Props) => {
    const {
        data: podcasts,
        isLoading: podcastsLoading,
        isError: podcastsError,
    } = usePodcasts();
    const podcastId = params.podcastId;
    const {
        data: podcastDetails,
        isLoading,
        isError,
    } = usePodcastById(podcastId);
    const router = useRouter();
    const podcastData: Podcast = podcasts.find(
        (podcast: Podcast) =>
            podcast.id.attributes["im:id"] === podcastId
    );

    if (isLoading || podcastsLoading)
        return <p>Loading...</p>;
    if (isError || podcastsError)
        return (
            <p>{`Error loading podcasts with id: ${podcastId}`}</p>
        );

    console.log(
        "🚀 ~ PodcastPage ~ podcastData:",
        podcastData
    );
    console.log("podcastDetails", podcastDetails);
    return (
        <div className="flex w-full p-8">
            <PodcastDetailCard podcast={podcastData} />
            <div className="episodesContainer flex flex-col flex-1 ml-16 mt-4">
                <div className="episodeTitle p-4 shadow-lg rounded-md">
                    <h1 className="w-full font-bold text-2xl">
                        Episodes:{" "}
                        {podcastDetails.resultCount}
                    </h1>
                </div>
                <div className="episodeList p-4 shadow-lg rounded-md mt-4">
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
                                (episode: any) => {
                                    // Convert episode.trackTimeMillis to MM:SS
                                    const duration =
                                        new Date(
                                            episode.trackTimeMillis
                                        )
                                            .toISOString()
                                            .substr(14, 5);
                                    return (
                                        <tr
                                            key={episode.id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:cursor-pointer"
                                                onClick={() => {
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
