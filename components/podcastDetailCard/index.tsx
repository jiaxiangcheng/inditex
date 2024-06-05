import { Podcast } from "@/models/Podcast";
import Image from "next/image";
import React from "react";

interface Props {
    podcast: Podcast;
}

const PodcastDetailCard = ({ podcast }: Props) => {
    return (
        <div className="podcastDetailCard flex flex-col w-[30%] h-fit p-4 shadow-lg mt-4 rounded-md">
            <div className="divide-y divide-gray-300/50 ">
                <div className="flex justify-center items-center rounded-md">
                    <Image
                        className="py-4"
                        src={podcast["im:image"][0].label}
                        width={200}
                        height={200}
                        alt="podcast image"
                    />
                </div>
                <div className="py-4">
                    <p className="font-bold">
                        {podcast["im:name"].label}
                    </p>
                    <p className="italic">
                        by {podcast["im:name"].label}
                    </p>
                </div>
                <div className="py-4">
                    <p className="font-bold">Description</p>
                    <p className="italic">
                        {podcast.summary.label}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default React.memo(PodcastDetailCard);
