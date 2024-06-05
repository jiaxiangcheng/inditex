import { fetchPodcastsById } from "@/hooks/helpers/apiCalls";
import { Episode } from "@/models/Episode";
import type { Metadata, ResolvingMetadata } from "next";

interface MetadataProps {
    params: { podcastId: string; episodeId: string };
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
    const episodeId = params.episodeId;
    const response = await fetchPodcastsById(podcastId);
    const episode: Episode =
        response.results.length > 0
            ? response.results.find(
                  (episode: Episode) =>
                      episode.trackId.toString() ===
                      episodeId
              )
            : null;
    if (episode === null) {
        return {
            title: `Podcast`,
            description: `Details of podcast with id: ${podcastId}`,
        };
    }
    return {
        title: `Episode: ${episode?.trackName}`,
        description: `Details of episode: ${episode?.trackName}`,
        openGraph: {
            title: `Episode: ${episode?.trackName}`,
            description: `Details of episode: ${episode?.trackName}`,
            type: "website",
            url: `https://localhost:3000/podcast/${podcastId}/episode/${episodeId}`,
            images: [
                {
                    url: episode?.artworkUrl600 ?? "",
                    width: 800,
                    height: 600,
                    alt: "Episode",
                },
            ],
        },
    };
}
*/
export default function EpisodeRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>{children}</div>;
}
