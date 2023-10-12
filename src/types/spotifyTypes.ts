import { z } from "zod";

const RangeScheme = z.enum(["short_term", "medium_term", "long_term"]);
const TypeScheme = z.enum(["artists", "tracks"]);

const FavItemsPropsScheme = z.object({
  token: z.string(),
  range: RangeScheme,
  limit: z.number().min(0).max(50).optional(),
});

const ArtistScheme = z.object({
  external_urls: z.object({ spotify: z.string().url() }),
  followers: z
    .object({ href: z.string().url().nullable(), total: z.number().min(0) })
    .optional(),
  genres: z.array(z.string()).optional(),
  href: z.string().url(),
  id: z.string(),
  images: z
    .array(
      z.object({
        height: z.number().min(0).nullable(),
        width: z.number().min(0).nullable(),
        url: z.string().url(),
      }),
    )
    .optional(),
  name: z.string(),
  popularity: z.number().min(0).max(100).optional(),
  type: z.literal("artist"),
  uri: z.string().url(),
});

const TrackScheme = z.object({
  album: z.object({
    album_type: z.enum(["ALBUM", "SINGLE", "COMPILATION"]),
    total_tracks: z.number().min(0),
    available_markets: z.array(z.string()),
    external_urls: z.object({ spotify: z.string().url() }),
    href: z.string().url(),
    id: z.string(),
    images: z.array(
      z.object({
        height: z.number().min(0).nullable(),
        width: z.number().min(0).nullable(),
        url: z.string().url(),
      }),
    ),
    name: z.string(),
    release_date: z.string(),
    release_date_precision: z.enum(["year", "month", "day"]),
    restrictions: z
      .object({ reason: z.enum(["market", "product", "explicit"]) })
      .optional(),
    type: z.literal("album"),
    uri: z.string().url(),
    copyrigth: z
      .array(z.object({ text: z.string(), type: z.enum(["C", "P"]) }))
      .optional(),
    external_ids: z
      .object({ upc: z.string(), isrc: z.string(), ean: z.string() })
      .optional(),
    genres: z.array(z.string()).optional(),
    label: z.string().optional(),
    popularity: z.number().min(0).max(100).optional(),
    album_group: z
      .enum(["album", "single", "compilation", "appears_on"])
      .optional(),
    artists: z.array(
      z.object({
        external_urls: z.object({ spotify: z.string().url() }),
        href: z.string().url(),
        id: z.string(),
        name: z.string(),
        type: z.literal("artist"),
        uri: z.string().url(),
      }),
    ),
  }),
  artists: z.array(ArtistScheme),
  available_markets: z.array(z.string()),
  disc_number: z.number().min(0),
  duration_ms: z.number().min(0),
  explicit: z.boolean(),
  external_ids: z.object({
    isrc: z.string(),
    ean: z.string().optional(),
    upc: z.string().optional(),
  }),
  external_urls: z.object({ spotify: z.string().url() }),
  href: z.string().url(),
  id: z.string(),
  restrictions: z
    .object({ reason: z.enum(["market", "product", "explicit"]) })
    .optional(),
  name: z.string(),
  popularity: z.number().min(0).max(100),
  preview_url: z.string().url().nullable(),
  track_number: z.number().min(0),
  type: z.literal("track"),
  uri: z.string().url(),
  is_local: z.boolean(),
});

export const FavItemsResponseScheme = z.object({
  href: z.string().url(),
  limit: z.number().min(0).max(50),
  next: z.string().url().nullable(),
  offset: z.number().min(0),
  previous: z.string().url().nullable(),
  total: z.number().min(0),
});

export const FavArtists = FavItemsResponseScheme.extend({
  items: z.array(ArtistScheme),
});

export const FavTracks = FavItemsResponseScheme.extend({
  items: z.array(TrackScheme),
});

export const CreatePlaylistResponseSchema = z.object({
  id: z.string(),
});

export const addTracksToPlaylistResponseSchema = z.object({
  snapshot_id: z.string(),
});

export type TypeItem = z.infer<typeof TypeScheme>;
export type FavItemsProps = z.infer<typeof FavItemsPropsScheme>;
export type Range = z.infer<typeof RangeScheme>;
export type Artist = z.infer<typeof ArtistScheme>;
export type FavArtistsType = z.infer<typeof FavArtists>;
export type FavTracksType = z.infer<typeof FavTracks>;

export type Track = z.infer<typeof TrackScheme>;
