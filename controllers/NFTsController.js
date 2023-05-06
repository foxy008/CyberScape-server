const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const { Room, RoomNFT, NFT } = require('../models');

class NFTsController {
    static async postNewNFTs(req, res, next) {
        try {
            const { address } = req.body;
            let cursor = null;
            let response = [];
            // console.log(!cursor);

            await Moralis.start({
                apiKey: process.env.MORALIS_API_KEY,
                // ...and any other configuration
            });


            const chain = EvmChain.ETHEREUM;

            while(true) {
                const newPage = await Moralis.EvmApi.nft.getContractNFTs({
                    address,
                    chain,
                    normalizeMetadata: true,
                    limit: 10,
                    disableTotal: false,
                    cursor
                  });

                const { pagination, jsonresponse } = newPage;
                const { page, total, pageSize } = pagination;
                let { result } = jsonresponse;
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
                        name: `${name} (${symbol} - ${page})`,
                        address,
                        cursor
                    }
                });

                if (!created) throw { name: 'RoomExisted' }

                response.push({
                    RoomId: room.id,
                    NFTs: result.map(nft => {
                        const { normalized_metadata, token_address } = nft;
                        const { name, image, description } = normalized_metadata
                        return {
                            token: token_address,
                            title: name,
                            description,
                            imageUrl: image
                        }
                    })
                });

                response.forEach(room => {
                    const { RoomId } = room;

                    room.forEach(nft => {
                        NFT.findOrCreate({
                            where: {
                               room,
                               address
                            }
                        })
                    })
                })

                if (page === 9) break;
            }

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = NFTsController;
