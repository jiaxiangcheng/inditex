"use client";
import Link from "next/link";
import { usePodcasts } from "../customHooks/usePersistence";
import { useState } from "react";

const HomePage = () => {
    const {
        data: podcasts,
        isLoading,
        isError,
    } = usePodcasts();
    const [filter, setFilter] = useState("");
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading podcasts</p>;

    const filteredPodcasts = podcasts.filter(
        (podcast: any) =>
            podcast.title.label
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
            podcast["im:artist"].label
                .toLowerCase()
                .includes(filter.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter podcasts by title or artist"
            />
            <ul>
                {filteredPodcasts.map((podcast: any) => (
                    <li
                        key={podcast.id.attributes["im:id"]}
                    >
                        <Link
                            href={`/podcast/${podcast.id.attributes["im:id"]}`}
                        >
                            {podcast.title.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
