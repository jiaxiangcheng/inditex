import { fetchPodcastsById } from "@/hooks/helpers/apiCalls";
import { Episode } from "@/models/Episode";
import type { Metadata, ResolvingMetadata } from "next";

interface MetadataProps {
    params: { podcastId: string };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

// Uncomment the following code to enable metadata generation
// Which means: Better SEO -> Lower LCP -> Higher First Contentful Paint

/*
export async function generateMetadata(
    { params, searchParams }: MetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const podcastId = params.podcastId;
    const response = await fetchPodcastsById(podcastId);
    const podcast: Episode =
        response.results.length > 0
            ? response.results[0]
            : null;
    if (podcast === null) {
        return {
            title: `Podcast`,
            description: `Details of podcast with id: ${podcastId}`,
        };
    }
    return {
        title: `Podcast: ${podcast?.collectionName}`,
        description: `Details of podcast with id: ${podcastId}`,
        openGraph: {
            title: `Podcast: ${podcast?.collectionName}`,
            description: `Details of podcast: ${podcast?.collectionName}`,
            type: "website",
            url: `https://localhost:3000/podcast/${podcastId}`,
            images: [
                {
                    url: podcast?.artworkUrl600 ?? "",
                    width: 800,
                    height: 600,
                    alt: "Podcast",
                },
            ],
        },
    };
}
*/
export default function PodcastRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>{children}</div>;
}
