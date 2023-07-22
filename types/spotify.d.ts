export interface FavItemsProps {
    token: string;
    type: "artists" | "tracks";
    range?: "short_term" | "medium_term" | "long_term";
    limit?: number;
}

interface Images {
    height: number;
    width: number;
    url: string;
}

export interface Artist {
    external_urls: {
        spotify: string;
    };
    id: string;
    images: Images[];
    name: string;
}
