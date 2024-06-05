"use client";
import React, {
    useEffect,
    useState,
    useRef,
    use,
    Suspense,
} from "react";
import { NavigationEvents } from "../navigationEvents";
import { useRouter } from "next/navigation";

interface Props {}
const NavBar = ({}: Props) => {
    const router = useRouter();
    const [routerChanging, setRouterChanging] =
        useState<boolean>(false);
    return (
        <nav
            className="flex w-full h-30 p-4 justify-between items-center text-blue-600 font-bold border-b border-slate-300 hover:cursor-pointer"
            onClick={() => {
                router.push("/");
            }}
        >
            <Suspense fallback={null}>
                <NavigationEvents
                    setRouterChanging={setRouterChanging}
                />
            </Suspense>
            <h1 className="text-3xl">Podcaster</h1>
            {routerChanging && (
                <span className="animate-ping h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
            )}
        </nav>
    );
};
export default React.memo(NavBar);
