"use client";
import { usePodcasts } from "../customHooks/usePersistence";
import { use, useEffect, useState } from "react";
import PodcastListCard from "@/components/podcastListCard";
import { Podcast } from "@/models/Podcast";
import { useAppDispatch } from "@/redux/reducHooks";
import { setDataIsLoading } from "@/redux/features/utils/utilsSlice";
import PodcastSkeleton from "./podcast/components/podcastSkeleton";
import { Metadata } from "next";

const metadata: Metadata = {
    title: "Podcasts - List",
    description: "List of podcasts from iTunes API",
};

const HomePage = () => {
    const {
        data: podcasts,
        isLoading,
        isError,
    } = usePodcasts();
    const [filter, setFilter] = useState("");
    const [filteredPodcasts, setFilteredPodcasts] =
        useState<Podcast[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLoading && !podcasts) {
            dispatch(setDataIsLoading(true));
        } else {
            if (podcasts) {
                dispatch(setDataIsLoading(false));
                setFilteredPodcasts(podcasts);
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (podcasts) {
            if (filter != "") {
                const filteredPodcasts = podcasts.filter(
                    (podcast: Podcast) =>
                        podcast["im:name"].label
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                );
                setFilteredPodcasts(filteredPodcasts);
            } else {
                setFilteredPodcasts(podcasts);
            }
        }
    }, [filter]);

    if (isLoading)
        return (
            <PodcastSkeleton typeOfSkeleton="podcastList" />
        );
    if (isError)
        return (
            <div className="flex w-full h-full justify-center items-center">
                Error loading podcasts list
            </div>
        );

    return (
        <div className="flex flex-col w-full justify-start items-center">
            <div className="flex w-full justify-end mt-4 px-8">
                <div className="p-2 rounded-md bg-blue-500 mr-4 font-bold text-white">
                    {filteredPodcasts.length}
                </div>
                <input
                    className="p-2 rounded-md border border-gray-300 w-1/4"
                    type="text"
                    placeholder="Filter podcasts..."
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                />
            </div>
            <div className="flex w-full mt-16 gap-8 flex-wrap justify-center mb-16">
                {filteredPodcasts.map(
                    (podcast: Podcast) => (
                        <PodcastListCard
                            key={
                                podcast.id.attributes[
                                    "im:id"
                                ]
                            }
                            podcast={podcast}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default HomePage;
