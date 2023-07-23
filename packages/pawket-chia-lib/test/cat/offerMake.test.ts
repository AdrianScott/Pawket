import { GetParentPuzzleResponse } from "../../models/api";
import { getTestAccount } from "../utility";
import { encodeOffer } from "../../services/offer/encoding";
import { OfferEntity, OfferPlan } from "../../services/offer/summary";
import { generateOffer } from "../../services/offer/bundler";
import { Instance } from "../../services/util/instance";
import { getAccountAddressDetails } from "../../services/util/account";
import { NetworkContext } from "../../services/coin/coinUtility";
import { signSpendBundle } from "../../services/spendbundle";

function xchPrefix() { return "xch"; }
function xchSymbol() { return "XCH"; }
function tokenInfo() {
  return {
    BSH: {
      symbol: "BSH",
      decimal: 3,
      unit: "BSH",
      id: "6e1815ee33e943676ee437a42b7d239c0d0826902480e4c3781fee4b327e1b6b",
    },
  };
}
const net: NetworkContext = {
  prefix: "xch",
  symbol: "XCH",
  chainId: "ccd5bb71183532bff220ba46c268991a3ff07eb358e8255a65c30a2dce0e5fbb",
  api: localPuzzleApiCall,
}

beforeAll(async () => {
  await Instance.init();
})

test('Make Offer 1', async () => {
  const offplan: OfferPlan[] = [
    {
      "id": "",
      "plan": {
        "coins": [
          {
            "amount": 15n,
            "parent_coin_info": "0xd46f5f861aeb19a3ff8c7bbb73aa1797f585332eb846333d5092c7dcc75af204",
            "puzzle_hash": "0x907ecc36e25ede9466dc1db20f86d8678b4a518a4351b552fb19be20fc6aac96"
          }
        ],
        "targets": [
          {
            "address": "0xbae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f79",
            "amount": 9n,
            "symbol": xchSymbol()
          },
          {
            "symbol": xchSymbol(),
            "address": "0x907ecc36e25ede9466dc1db20f86d8678b4a518a4351b552fb19be20fc6aac96",
            "amount": 6n
          }
        ]
      }
    }
  ];
  const reqs: OfferEntity[] = [
    {
      "id": "0x6e1815ee33e943676ee437a42b7d239c0d0826902480e4c3781fee4b327e1b6b",
      "symbol": "BSH",
      "amount": 11n,
      "target": "0x907ecc36e25ede9466dc1db20f86d8678b4a518a4351b552fb19be20fc6aac96"
    }
  ];
  const account = getTestAccount("46815978e90da660427161c265b400831ee59f9aae9a40b449fbcd67ca140590");
  const tokenPuzzles = await getAccountAddressDetails(account, [], tokenInfo(), xchPrefix(), xchSymbol(), undefined, "cat_v1");

  const nonce = "71bdf5d923a48956a8d26a36c6ea4a9959de221ff2ee986bce4827e5f037ceb8";
  const ubundle = await generateOffer(offplan, reqs, tokenPuzzles, net, nonce, "cat_v1");
  const bundle = await signSpendBundle(ubundle, tokenPuzzles, net.chainId);
  const encoded = await encodeOffer(bundle, 2);

  expect(bundle).toMatchSnapshot("bundle");
  expect(encoded).toMatchSnapshot("offer");
});

const knownCoins = [
  { "parentCoinId": "0xd538ae235752c68078884bfb129e2c0832c2d8ed67674bde6c9a48603e6b875e", "amount": 159, "parentParentCoinId": "0x0cd93529333db5ffcb7aef5a1f9610df8467ae739b083697479dbb88a82467f5", "puzzleReveal": "0xff02ffff01ff02ffff01ff02ff5effff04ff02ffff04ffff04ff05ffff04ffff0bff2cff0580ffff04ff0bff80808080ffff04ffff02ff17ff2f80ffff04ff5fffff04ffff02ff2effff04ff02ffff04ff17ff80808080ffff04ffff0bff82027fff82057fff820b7f80ffff04ff81bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ff820bffff80808080808080808080808080ffff04ffff01ffffffff81ca3dff46ff0233ffff3c04ff01ff0181cbffffff02ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff22ffff0bff2cff3480ffff0bff22ffff0bff22ffff0bff2cff5c80ff0980ffff0bff22ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff0bffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff13ff80808080ff820b9f80ffff01ff02ff26ffff04ff02ffff04ffff02ff13ffff04ff5fffff04ff17ffff04ff2fffff04ff81bfffff04ff82017fffff04ff1bff8080808080808080ffff04ff82017fff8080808080ffff01ff088080ff0180ffff01ff02ffff03ff17ffff01ff02ffff03ffff20ff81bf80ffff0182017fffff01ff088080ff0180ffff01ff088080ff018080ff0180ffff04ffff04ff05ff2780ffff04ffff10ff0bff5780ff778080ff02ffff03ff05ffff01ff02ffff03ffff09ffff02ffff03ffff09ff11ff7880ffff0159ff8080ff0180ffff01818f80ffff01ff02ff7affff04ff02ffff04ff0dffff04ff0bffff04ffff04ff81b9ff82017980ff808080808080ffff01ff02ff5affff04ff02ffff04ffff02ffff03ffff09ff11ff7880ffff01ff04ff78ffff04ffff02ff36ffff04ff02ffff04ff13ffff04ff29ffff04ffff0bff2cff5b80ffff04ff2bff80808080808080ff398080ffff01ff02ffff03ffff09ff11ff2480ffff01ff04ff24ffff04ffff0bff20ff2980ff398080ffff010980ff018080ff0180ffff04ffff02ffff03ffff09ff11ff7880ffff0159ff8080ff0180ffff04ffff02ff7affff04ff02ffff04ff0dffff04ff0bffff04ff17ff808080808080ff80808080808080ff0180ffff01ff04ff80ffff04ff80ff17808080ff0180ffffff02ffff03ff05ffff01ff04ff09ffff02ff26ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff0bff22ffff0bff2cff5880ffff0bff22ffff0bff22ffff0bff2cff5c80ff0580ffff0bff22ffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff2cff058080ff0180ffff04ffff04ff28ffff04ff5fff808080ffff02ff7effff04ff02ffff04ffff04ffff04ff2fff0580ffff04ff5fff82017f8080ffff04ffff02ff7affff04ff02ffff04ff0bffff04ff05ffff01ff808080808080ffff04ff17ffff04ff81bfffff04ff82017fffff04ffff0bff8204ffffff02ff36ffff04ff02ffff04ff09ffff04ff820affffff04ffff0bff2cff2d80ffff04ff15ff80808080808080ff8216ff80ffff04ff8205ffffff04ff820bffff808080808080808080808080ff02ff2affff04ff02ffff04ff5fffff04ff3bffff04ffff02ffff03ff17ffff01ff09ff2dffff0bff27ffff02ff36ffff04ff02ffff04ff29ffff04ff57ffff04ffff0bff2cff81b980ffff04ff59ff80808080808080ff81b78080ff8080ff0180ffff04ff17ffff04ff05ffff04ff8202ffffff04ffff04ffff04ff24ffff04ffff0bff7cff2fff82017f80ff808080ffff04ffff04ff30ffff04ffff0bff81bfffff0bff7cff15ffff10ff82017fffff11ff8202dfff2b80ff8202ff808080ff808080ff138080ff80808080808080808080ff018080ffff04ffff01a072dec062874cd4d3aab892a0906688a1ae412b0109982e1797a170add88bdcdcffff04ffff01a06e1815ee33e943676ee437a42b7d239c0d0826902480e4c3781fee4b327e1b6bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b5c7539888af59f601be0ea2eddd32c06a80d932170eec55ef7a7640cbc5b37b81c4258644229eca2322298a9bf0189fff018080ff0180808080" },
];

async function localPuzzleApiCall(parentCoinId: string): Promise<GetParentPuzzleResponse | undefined> {
  const resp = knownCoins.find(_ => _.parentCoinId == parentCoinId);
  return resp;
}

test('Make Offer 2', async () => {
  const offplan: OfferPlan[] = [
    {
      "id": "0x6e1815ee33e943676ee437a42b7d239c0d0826902480e4c3781fee4b327e1b6b",
      "plan": {
        "coins": [
          {
            "amount": 100n,
            "parent_coin_info": "0xd538ae235752c68078884bfb129e2c0832c2d8ed67674bde6c9a48603e6b875e",
            "puzzle_hash": "0x9d974f53c5a3d12ef729f38f2c1603b4f4f959a033d0a6ed763fab46a7cc5577"
          }
        ],
        "targets": [
          {
            "address": "0xbae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f79",
            "amount": 10n,
            "symbol": "BSH",
            "memos": [
              "0xbae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f79"
            ]
          },
          {
            "symbol": "BSH",
            "address": "0x907ecc36e25ede9466dc1db20f86d8678b4a518a4351b552fb19be20fc6aac96",
            "amount": 90n
          }
        ]
      }
    }
  ];
  const reqs: OfferEntity[] = [
    {
      "id": "",
      "symbol": xchSymbol(),
      "amount": 5n,
      "target": "0x907ecc36e25ede9466dc1db20f86d8678b4a518a4351b552fb19be20fc6aac96"
    }
  ];
  const account = getTestAccount("46815978e90da660427161c265b400831ee59f9aae9a40b449fbcd67ca140590");
  const tokenPuzzles = await getAccountAddressDetails(account, [], tokenInfo(), xchPrefix(), xchSymbol(), undefined, "cat_v1");

  const nonce = "741f8564b6637aee92dd68548cfe7df8ec35b20029235565244944febd68bf8d";
  const ubundle = await generateOffer(offplan, reqs, tokenPuzzles, net, nonce, "cat_v1");
  const bundle = await signSpendBundle(ubundle, tokenPuzzles, net.chainId);
  const encoded = await encodeOffer(bundle, 2);

  expect(bundle).toMatchSnapshot("bundle");
  expect(encoded).toMatchSnapshot("offer");
});
