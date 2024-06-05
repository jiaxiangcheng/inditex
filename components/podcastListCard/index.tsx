import { Podcast } from "@/models/Podcast";
import { setDataIsLoading } from "@/redux/features/utils/utilsSlice";
import { useAppDispatch } from "@/redux/reducHooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
    podcast: Podcast;
}

const PodcastListCard = ({ podcast }: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const cardClicked = () => {
        dispatch(setDataIsLoading(true));
        router.push(
            `/podcast/${podcast.id.attributes["im:id"]}`
        );
    };

    return (
        <div
            className="flex flex-col justify-start items-center relative mt-8 p-4 w-[240px] rounded-lg shadow-xl hover:cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out bg-white"
            onClick={cardClicked}
        >
            <div className="flex flex-col items-center -mt-10">
                <Image
                    className="productListCardImage rounded-full"
                    src={podcast["im:image"][0].label}
                    width={100}
                    height={100}
                    alt="podcast image"
                />
                <div className="mt-2">
                    <p className="text-center">
                        {podcast.title.label}
                    </p>
                    <p className="text-slate-400 text-center mt-2">
                        Author: {podcast["im:artist"].label}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default React.memo(PodcastListCard);
