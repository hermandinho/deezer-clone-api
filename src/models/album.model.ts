import {Expose} from "class-transformer";

export class AlbumModel {
    @Expose()
    id!: number;
    @Expose()
    title!: string;
    @Expose()
    link!: string;
    @Expose()
    cover!: string;
    @Expose()
    release_date!: string;
}
