"use client";
import { usePodcasts } from "../customHooks/usePersistence";
import { useEffect, useState } from "react";
import PodcastListCard from "@/components/podcastListCard";
import { Podcast } from "@/models/Podcast";
import { useAppDispatch } from "@/redux/reducHooks";
import { setDataIsLoading } from "@/redux/features/utils/utilsSlice";

const HomePage = () => {
    const {
        data: podcasts,
        isLoading,
        isError,
    } = usePodcasts();
    const [filter, setFilter] = useState("");
    const dispatch = useAppDispatch();

    const filteredPodcasts = podcasts.filter(
        (podcast: any) =>
            podcast.title.label
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
            podcast["im:artist"].label
                .toLowerCase()
                .includes(filter.toLowerCase())
    );
    useEffect(() => {
        if (isLoading && !podcasts) {
            dispatch(setDataIsLoading(true));
        } else {
            dispatch(setDataIsLoading(false));
        }
    }, [isLoading]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading podcasts</p>;

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
            <div className="flex w-full mt-16 gap-8 flex-wrap justify-center">
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
