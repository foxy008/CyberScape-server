const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const { Room, RoomNFT, NFT, Artist } = require('../models');
const { positions } = require("../data/position");
const artists = require("../data/artists");
// Ganti diatas kalo mau posisi ubah

class NFTsController {
    static async postNewNFTs(req, res, next) {
        try {
            let response;
            const allResponse = [];
            for (let i = 0; i < artists.length; i++) {
                const { address, avatarUrl, name, website } = artists[i];
                let cursor = null;


                // console.log(!cursor);

                const chain = EvmChain.ETHEREUM;

                const [artist, created] = await Artist.findOrCreate({
                    where: {
                        name
                    },
                    defaults: {
                        name,
                        website,
                        avatarUrl
                    }
                });

                // if (!created) throw { name: 'RoomExisted' }

                const ArtistId = artist.id

                if (true) {
                    const newPage = await Moralis.EvmApi.nft.getContractNFTs({
                        address,
                        chain,
                        normalizeMetadata: true,
                        mediaItems: true,
                        limit: 10,
                        disableTotal: false,
                        cursor
                    });

                    // console.log(newPage);
                    const { pagination, jsonResponse } = newPage;
                    const { page, total, pageSize } = pagination;
                    let { result } = jsonResponse;
                    const { name, symbol } = result[0];

                    console.log(
                        `Got page ${page} of ${Math.ceil(
                            total / pageSize
                        )}, ${total} total`
                    );

                    cursor = pagination.cursor;

                    const [room, created] = await Room.findOrCreate({
                        where: {
                            address,
                            cursor
                        },
                        defaults: {
                            name: `${name} (${symbol})`,
                            address,
                            cursor,
                            ArtistId
                        }
                    });

                    if (!created) continue
                    //  throw { name: 'RoomExisted' }

                    response = {
                        RoomId: room.id,
                        Artist: artist,
                        NFTs: result.map(nft => {
                            const { normalized_metadata, token_hash, media } = nft;
                            const { name, description } = normalized_metadata
                            const image = media.media_collection.medium.url
                            return {
                                token: token_hash,
                                title: name,
                                description,
                                imageUrl: image
                            }
                        })
                    };
                }

                const { RoomId, NFTs } = response;

                for (let nft of NFTs) {
                    const {
                        token,
                        title,
                        description,
                        imageUrl
                    } = nft;

                    let newImageUrl = imageUrl;

                    if (newImageUrl && newImageUrl.startsWith('ipfs://')) {
                        newImageUrl = `https://ipfs.io/ipfs/${newImageUrl.substring('ipfs://'.length)}`;
                    }

                    let [newNFT, created] = await NFT.findOrCreate({
                        where: {
                            token
                        },
                        defaults: {
                            token,
                            title,
                            description,
                            imageUrl: newImageUrl
                        }
                    })

                    if (!created) continue
                    // throw { name: 'NFTExisted' }

                    nft.id = newNFT.id;

                    created = await RoomNFT.create({
                        NFTId: newNFT.id,
                        RoomId,
                        position: positions[i]
                    })

                    if (!created) {
                        throw { name: 'RoomNFTExisted' }}

                }

                allResponse.push(response);
            }

            res.status(201).json(allResponse);
        } catch (error) {
            next(error);
        }
    }

    static async getTopCollection(req, res, next) {
        try {
            const { top } = req.query;

            let sequelizeQuery = {
                include: [{
                    model: RoomNFT,
                    include: [{
                        model: Room,
                        include: [{
                            model: Artist
                        }]
                    }]
                }],
                order: [
                    ['averageRating', 'DESC']
                ],
                limit: 9
            }

            if (top) {
                sequelizeQuery = {
                    ...sequelizeQuery,
                    limit: 4
                }
            }

            const topNFTs = await NFT.findAll(sequelizeQuery)

            res.status(200).json(topNFTs);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = NFTsController;
