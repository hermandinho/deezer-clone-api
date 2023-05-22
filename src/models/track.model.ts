import {ArtistModel} from "./artist.model";
import {AlbumModel} from "./album.model";
import {Expose} from "class-transformer";

export class TrackModel {
  @Expose()
  id!: number;
  @Expose()
  title!: string;
  @Expose()
  duration!: number;
  @Expose()
  artist!: ArtistModel;
  @Expose()
  album!: AlbumModel;
}
