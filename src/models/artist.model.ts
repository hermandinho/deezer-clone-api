import {Expose} from "class-transformer";

export class ArtistModel {
    @Expose()
    id!: number;
    @Expose()
    name!: string;
    @Expose()
    link!: string;
    @Expose()
    nb_fan!: number;
    @Expose()
    picture!: string;
}
