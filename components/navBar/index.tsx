"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/reducHooks";

interface Props {}
const NavBar = ({}: Props) => {
    const router = useRouter();
    const dataIsLoading = useAppSelector(
        (state) => state.utils.dataIsLoading
    );

    return (
        <nav
            className="flex w-full h-30 p-4 justify-between items-center text-blue-600 font-bold border-b border-slate-300 hover:cursor-pointer"
            onClick={() => {
                router.push("/");
            }}
        >
            <h1 className="text-3xl">Podcaster</h1>
            {dataIsLoading && (
                <span className="animate-ping h-5 w-5 rounded-full bg-sky-400 opacity-75"></span>
            )}
        </nav>
    );
};
export default React.memo(NavBar);
