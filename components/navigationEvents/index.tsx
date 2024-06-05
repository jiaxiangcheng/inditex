"use client";

import { useEffect } from "react";
import {
    usePathname,
    useSearchParams,
} from "next/navigation";

interface Props {
    setRouterChanging: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

export function NavigationEvents({
    setRouterChanging,
}: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        setRouterChanging(false);
    }, [pathname, searchParams]);

    return null;
}
