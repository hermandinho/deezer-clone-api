"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


import {https} from "firebase-functions";
import * as express from "express";
import {fetchArtistAlbums, fetchArtistTopTracks, fetchTracks, getArtistById} from "../utils/api";
import {plainToInstance} from "class-transformer";
import {AlbumModel, ArtistModel, TrackModel} from "./models";
import * as cors from "cors";

const server = express();
server.use(cors());

// GET /tracks
server.get("/tracks", async (request, response) => {
  const q: string = (request.query.q || "") as string;
  fetchTracks(q).then(({data, status}) => {
    // console.log(data?.data);
    response.send({
      status,
      data: (data?.data || []).map((datum: Record<string, any>) =>
        plainToInstance(TrackModel, {
          ...datum,
          artist: plainToInstance(ArtistModel, datum.artist),
          album: plainToInstance(AlbumModel, {
            ...datum.album,
            cover: datum.album.cover_big,
          }),
        }, {
          excludeExtraneousValues: true,
        })),
    });
  }).catch((e) => {
    console.log(e);
    response.send(e);
  });
});

// Get /artist/:id
server.get("/artist/:id", async (request, response) => {
  const id: number = +request.params.id;
  getArtistById(id).then(({data, status}) => {
    // console.log(data);
    response.send({
      status,
      data: plainToInstance(ArtistModel,
        ({...data, picture: data.picture_big} || {}),
        {excludeExtraneousValues: true}
      ),
    });
  }).catch((e) => {
    console.log(e);
    response.send(e);
  });
});

// Get /artist/:id/top?limit=5
server.get("/artist/:id/top", async (request, response) => {
  const id: number = +request.params.id;
  const limit: number = request.query?.limit ? +request.query?.limit : 5;
  fetchArtistTopTracks(id, limit).then(({data, status}) => {
    // console.log(data);
    response.send({
      status,
      data: (data?.data || []).map((datum: Record<string, any>) =>
        plainToInstance(TrackModel, {
          ...datum,
          artist: plainToInstance(ArtistModel, datum.artist),
          album: plainToInstance(AlbumModel, datum.album),
        }, {
          excludeExtraneousValues: true,
        })),
    });
  }).catch((e) => {
    console.log(e);
    response.send(e);
  });
});

// Get /artist/:id/album
server.get("/artist/:id/albums", async (request, response) => {
  const id: number = +request.params.id;
  fetchArtistAlbums(id).then(({data, status}) => {
    // console.log(data);
    response.send({
      status,
      data: (data?.data || []).map((datum: Record<string, any>) =>
        plainToInstance(AlbumModel, {
          ...datum,
          cover: datum.cover_big,
        }, {
          excludeExtraneousValues: true,
        })),
    });
  }).catch((e) => {
    console.log(e);
    response.send(e);
  });
});

exports.app = https.onRequest(server);

