export interface Podcast {
    "im:name": Name;
    "im:image": Image[];
    summary: Summary;
    "im:price": Price;
    "im:contentType": ContentType;
    rights: Rights;
    title: Title;
    link: Link;
    id: Id;
    "im:artist": Artist;
    category: Category;
    "im:releaseDate": ReleaseDate;
}

interface Name {
    label: string;
}

interface Image {
    label: string;
    attributes: ImageAttributes;
}

interface ImageAttributes {
    height: string;
}

interface Summary {
    label: string;
}

interface Price {
    label: string;
    attributes: PriceAttributes;
}

interface PriceAttributes {
    amount: string;
    currency: string;
}

interface ContentType {
    attributes: ContentTypeAttributes;
}

interface ContentTypeAttributes {
    term: string;
    label: string;
}

interface Rights {
    label: string;
}

interface Title {
    label: string;
}

interface Link {
    attributes: LinkAttributes;
}

interface LinkAttributes {
    rel: string;
    type: string;
    href: string;
}

interface Id {
    label: string;
    attributes: IdAttributes;
}

interface IdAttributes {
    "im:id": string;
}

interface Artist {
    label: string;
    attributes: ArtistAttributes;
}

interface ArtistAttributes {
    href: string;
}

interface Category {
    attributes: CategoryAttributes;
}

interface CategoryAttributes {
    "im:id": string;
    term: string;
    scheme: string;
    label: string;
}

interface ReleaseDate {
    label: string;
    attributes: ReleaseDateAttributes;
}

interface ReleaseDateAttributes {
    label: string;
}


export interface PodcastDetials {
    wrapperType: string;
    kind: string;
    artistId: number;
    collectionId: number;
    trackId: number;
    artistName: string;
    collectionName: string;
    trackName: string;
    collectionCensoredName: string;
    trackCensoredName: string;
    artistViewUrl: string;
    collectionViewUrl: string;
    feedUrl: string;
    trackViewUrl: string;
    artworkUrl30: string;
    artworkUrl60: string;
    artworkUrl100: string;
    collectionPrice: number;
    trackPrice: number;
    collectionHdPrice: number;
    releaseDate: string;
    collectionExplicitness: string;
    trackExplicitness: string;
    trackCount: number;
    trackTimeMillis: number;
    country: string;
    currency: string;
    primaryGenreName: string;
    artworkUrl600: string;
    genreIds: string[];
    genres: string[];
}
