import React from "react";

interface Props {
    typeOfSkeleton: "podcastList" | "podcast" | "episode";
}

const PodcastSkeleton = ({ typeOfSkeleton }: Props) => {
    if (typeOfSkeleton === "podcastList") {
        return (
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(24)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded shadow-md"
                    >
                        <div className="bg-gray-300 rounded-full w-24 h-24 mx-auto mb-4"></div>
                        <div className="bg-gray-300 h-4 w-3/4 mx-auto mb-2 rounded"></div>
                        <div className="bg-gray-300 h-3 w-1/2 mx-auto rounded"></div>
                    </div>
                ))}
            </div>
        );
    } else if (typeOfSkeleton === "podcast")
        return (
            <div className="flex p-4">
                {/* Left Section */}
                <div className="w-1/3 p-4">
                    <div className="bg-gray-300 h-48 w-full mb-4"></div>
                    <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
                    <div className="bg-gray-300 h-4 w-1/2 mb-6"></div>
                    <div className="bg-gray-300 h-4 w-full mb-2"></div>
                    <div className="bg-gray-300 h-4 w-5/6 mb-2"></div>
                    <div className="bg-gray-300 h-4 w-4/5"></div>
                </div>

                {/* Right Section */}
                <div className="w-2/3 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="bg-gray-300 h-6 w-32"></div>
                        <div className="bg-gray-300 h-6 w-10"></div>
                    </div>
                    <div className="bg-gray-300 h-8 w-full mb-4"></div>
                    {[...Array(16)].map((_, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center mb-2"
                        >
                            <div className="bg-gray-300 h-6 w-1/2"></div>
                            <div className="bg-gray-300 h-6 w-1/4"></div>
                            <div className="bg-gray-300 h-6 w-12"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    else {
        return (
            <div className="flex p-4 space-x-4">
                {/* Left Section */}
                <div className="w-1/3 p-4 bg-white rounded shadow">
                    <div className="bg-gray-300 h-48 w-full mb-4 rounded"></div>
                    <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/2 mb-6 rounded"></div>
                    <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-4/5 rounded"></div>
                </div>

                {/* Right Section */}
                <div className="w-2/3 p-4 bg-white rounded shadow">
                    <div className="bg-gray-300 h-6 w-1/2 mb-4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-full mb-4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-11/12 mb-4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-10/12 mb-4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-9/12 mb-4 rounded"></div>
                    <div className="bg-gray-300 h-12 w-full mb-2 rounded"></div>
                </div>
            </div>
        );
    }
};

export default PodcastSkeleton;
