"use client";
import { usePodcastById } from "@/customHooks/usePersistence";
import React from "react";

interface Props {
    params: {
        podcastId: string;
    };
}

const PodcastPage = ({ params }: Props) => {
    const podcastId = params.podcastId;
    const {
        data: podcast,
        isLoading,
        isError,
    } = usePodcastById(podcastId);
    if (isLoading) return <p>Loading...</p>;
    if (isError)
        return (
            <p>{`Error loading podcasts with id: ${podcastId}`}</p>
        );

    return (
        <pre className="w-full whitespace-wrap">
            {JSON.stringify(podcast)}
        </pre>
    );
};

export default PodcastPage;
