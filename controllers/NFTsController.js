const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const { Room, RoomNFT, NFT, Artist } = require('../models');

class NFTsController {
    static async postNewNFTs(req, res, next) {
        try {
            const { address, avatarUrl, name, website  } = req.body;
            let cursor = null;
            let response = [];

                // console.log(!cursor);

            await Moralis.start({
                apiKey: process.env.MORALIS_API_KEY,
                // ...and any other configuration
            });

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

            const ArtistId = artist.id

            while(true) {
                const newPage = await Moralis.EvmApi.nft.getContractNFTs({
                    address,
                    chain,
                    normalizeMetadata: true,
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
                        name: `${name} (${symbol}) - ${page + 1}`,
                        address,
                        cursor,
                        ArtistId
                    }
                });

                if (!created) throw { name: 'RoomExisted' }

                response.push({
                    RoomId: room.id,
                    NFTs: result.map(nft => {
                        const { normalized_metadata, token_hash } = nft;
                        const { name, image, description } = normalized_metadata
                        return {
                            token: token_hash,
                            title: name,
                            description,
                            imageUrl: image
                        }
                    })
                });

                if (page === 9) break;
            }

            for (let room of response ) {
                const { RoomId, NFTs } = room;

                for (let nft of NFTs) {
                    const {
                        token,
                        title,
                        description,
                        imageUrl
                    } = nft;

                    let [newNFT, created] = await NFT.findOrCreate({
                        where: {
                           token
                        },
                        defaults: {
                            token,
                            title,
                            description,
                            imageUrl
                        }
                    })

                    if (!created) throw { name: 'NFTExisted'}

                    nft.id = newNFT.id;

                    created = await RoomNFT.create({
                        NFTId: newNFT.id,
                        RoomId
                    })

                    if (!created) throw { name: 'RoomNFTExisted'}

                }
            }

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
 
    static async getTopCollection(req, res, next) {
        try {
            const topNFTs = await NFT.findAll({
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
                limit: 10
            })

            res.status(200).json(topNFTs);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = NFTsController;
