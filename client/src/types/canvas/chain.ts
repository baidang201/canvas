import { ChainInfo } from "@keplr-wallet/types"

export const checkersChainId = "canvas"

export const getCanvasChainInfo = (): ChainInfo => ({
    chainId: checkersChainId,
    chainName: checkersChainId,
    rpc: process.env.RPC_URL!,
    rest: "http://127.0.0.1:1317",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmos" + "pub",
        bech32PrefixValAddr: "cosmos" + "valoper",
        bech32PrefixValPub: "cosmos" + "valoperpub",
        bech32PrefixConsAddr: "cosmos" + "valcons",
        bech32PrefixConsPub: "cosmos" + "valconspub",
    },
    currencies: [
        {
            coinDenom: "STAKE",
            coinMinimalDenom: "stake",
            coinDecimals: 6,
            coinGeckoId: "stake",
        },
        {
            coinDenom: "TOKEN",
            coinMinimalDenom: "token",
            coinDecimals: 6,
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "STAKE",
            coinMinimalDenom: "stake",
            coinDecimals: 6,
            coinGeckoId: "stake",
        },
    ],
    stakeCurrency: {
        coinDenom: "STAKE",
        coinMinimalDenom: "stake",
        coinDecimals: 6,
        coinGeckoId: "stake",
    },
    coinType: 118,
    // gasPriceStep: {
    //     low: 1,
    //     average: 1,
    //     high: 1,
    // },
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
})
