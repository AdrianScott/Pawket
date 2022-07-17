import { OriginCoin, SpendBundle } from "@/models/wallet";
import { assertBundle } from "./runner";
import { SymbolCoins } from "../transfer/transfer";
import { generateMintNftBundle, generateTransferNftBundle, NftCoinAnalysisResult } from "../coin/nft";
import puzzle from "../crypto/puzzle";
import { getTestAccount } from "./offerTest";
import { getAccountAddressDetails } from "@/store/modules/account";
import { GetParentPuzzleResponse } from "@/models/api";

export async function testNftMint(): Promise<void> {
  const expect: SpendBundle = {
    "aggregated_signature": "8f26a2c064e02728bd8ed76b6b719a381ec1e478c02004ae06c1d6cddac99a84943864948b97859be66a39c70969be37137ba31bb1f1f4baa4e56e296897df4fd0f57388f7635444ec230a74b06a7d68d4317a4efd3d2f159794711faf0a25c3",
    "coin_spends": [
      {
        "coin": {
          "amount": 100n,
          "parent_coin_info": "0xcf2a6632809099ab0e1b02685921e3be445abd453dd4e5e1ee145a153b8c8b46",
          "puzzle_hash": "0x8ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbe"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0acfbc6b1da28c3059c47f9bddb13066f85610cfc827c0f42cd8d2860859d0acde310427d82e526daefa6bfce9c356b23ff018080",
        "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa08ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbeff638080ff8080"
      },
      {
        "coin": {
          "parent_coin_info": "0x1073ed20bd4f91514b234bcf0621d47919bfd547b047cb6752b9b508de895267",
          "amount": 1n,
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        },
        "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
        "solution": "0xffa00e2ce4b926672fa0ba0bfd29c02e890c47a45ec80c2117fdaa1b0d643504ade1ff01ff8080"
      },
      {
        "coin": {
          "parent_coin_info": "0xd122925cb0c7e962630d539ef238237bbab32caa940e6f2b9506aaf9068c4f76",
          "amount": 1n,
          "puzzle_hash": "0x0e2ce4b926672fa0ba0bfd29c02e890c47a45ec80c2117fdaa1b0d643504ade1"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0d122925cb0c7e962630d539ef238237bbab32caa940e6f2b9506aaf9068c4f76a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff10ffff04ff81bfff808080ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff3affff04ff02ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff808080808080ffff04ff81bfffff01ff8080808080808080ffff04ffff01ffffff49ff0233ffff0401ff0102ffffffff02ffff03ff05ffff01ff02ff22ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ffff0181e880ffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff81a7ff80808080ff0580ffff01ff02ff81a7ffff04ff0bffff04ff05ffff04ff820167ff8080808080ffff01ff088080ff0180ffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ff0180ffff01ff04ffff04ff0bffff04ff05ff808080ffff01ff80808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff2affff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff02ff26ffff04ff02ffff04ffff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ff808080808080ffff04ff17ff8080808080ffffff04ff09ffff04ffff02ff2affff04ff02ffff04ff15ffff04ff0bff8080808080ff808080ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff22ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff2bffff01ff02ffff03ffff09ff818bff3880ffff01ff02ffff03ffff18ff8202cbff3480ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff4bff80808080808080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff808080808080808080ff0180ffff01ff02ffff03ffff15ff818bff8080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ff018080ff0180ffff01ff02ffff03ff2fffff01ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff81afffff04ffff0bff34ff5380ffff04ffff02ff2effff04ff02ffff04ff23ff80808080ffff04ffff0bff34ff0580ff8080808080808080ffff04ff17ff8201ef808080ff8080ffff01ff088080ff018080ff0180ff018080ffff04ffff01a0dd8135d546e291df295b376aa89fc409c8c50d7f655d1ff4e845637901bc2f8fffff04ffff01ffff75ffc06e68747470733a2f2f617773312e646973636f757273652d63646e2e636f6d2f627573696e657373342f75706c6f6164732f636869612f6f726967696e616c2f31582f363832373534646662353936653062346563303864633233343432636335613931393234313865332e706e6780ffff68a076a1900b6931f7bf5f07ab310733270838b040385f285423f49e2f551886733580ffff04ffff01a081970d352e6a39a241eaf8ca510a0e669e40d778ba612621c60a50ef6cf29c7bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0acfbc6b1da28c3059c47f9bddb13066f85610cfc827c0f42cd8d2860859d0acde310427d82e526daefa6bfce9c356b23ff018080ff018080808080ff01808080",
        "solution": "0xffffa01073ed20bd4f91514b234bcf0621d47919bfd547b047cb6752b9b508de895267ff0180ff01ffffff80ffff01ffff33ffa08ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbeff01ffffa08ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbe808080ff8080ff01ff808080"
      }
    ]
  };

  const account = getTestAccount("4a3666e148799c0f23d5644f7dceabe2b97c689dddad68929c2ec7686d2e33fd");

  const change_hex = "0x8ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbe";
  const target_hex = "0x8ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbe";

  const changeAddress = puzzle.getAddressFromPuzzleHash(change_hex, xchPrefix());
  const targetAddress = puzzle.getAddressFromPuzzleHash(target_hex, xchPrefix());

  const tokenPuzzles = await getAccountAddressDetails(account);
  const availcoins: SymbolCoins = {
    [xchSymbol()]: [
      {
        "amount": 100n,
        "parent_coin_info": "0xcf2a6632809099ab0e1b02685921e3be445abd453dd4e5e1ee145a153b8c8b46",
        "puzzle_hash": "0x8ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbe",
      }
    ]
  };
  const metadata = {
    "uri": "https://aws1.discourse-cdn.com/business4/uploads/chia/original/1X/682754dfb596e0b4ec08dc23442cc5a9192418e3.png",
    "hash": "76a1900b6931f7bf5f07ab310733270838b040385f285423f49e2f5518867335",
  };
  const fee = 0n;
  const { spendBundle } = await generateMintNftBundle(targetAddress, changeAddress, fee, metadata, availcoins, tokenPuzzles, xchSymbol());
  assertBundle(expect, spendBundle);
}

export async function testNftTransfer(): Promise<void> {
  const expect: SpendBundle = {
    "aggregated_signature": "0xaef55f10c030b74b9f45622be96c9826787bb246245638830c27befb2b2ec7a48fad8752dd47d858762c7c6db943e02a05f0ca61ff4b01009eff4d769b188e354588aa26b0ac0ae26b121113bced0d110e8104bf9b735ea004c9bd082d425c60",
    "coin_spends": [
      {
        "coin": {
          "amount": 1n,
          "parent_coin_info": "0x73004504e9a934143daed605d717e1fe76ddef2e6774ef1b02944b3bc0e046e9",
          "puzzle_hash": "0x95bc3ecb0cd8ec0ede3aa072893e9ff7ae9859e581fdbd97bc2638d2d9f7d65e"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa003c95fdb72f85248a564d3173fcb482683facda94ed61462c0119336338f37bba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff10ffff04ff81bfff808080ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff3affff04ff02ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff808080808080ffff04ff81bfffff01ff8080808080808080ffff04ffff01ffffff49ff0233ffff0401ff0102ffffffff02ffff03ff05ffff01ff02ff22ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ffff0181e880ffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff81a7ff80808080ff0580ffff01ff02ff81a7ffff04ff0bffff04ff05ffff04ff820167ff8080808080ffff01ff088080ff0180ffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ff0180ffff01ff04ffff04ff0bffff04ff05ff808080ffff01ff80808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff2affff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff02ff26ffff04ff02ffff04ffff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ff808080808080ffff04ff17ff8080808080ffffff04ff09ffff04ffff02ff2affff04ff02ffff04ff15ffff04ff0bff8080808080ff808080ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff22ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff2bffff01ff02ffff03ffff09ff818bff3880ffff01ff02ffff03ffff18ff8202cbff3480ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff4bff80808080808080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff808080808080808080ff0180ffff01ff02ffff03ffff15ff818bff8080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ff018080ff0180ffff01ff02ffff03ff2fffff01ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff81afffff04ffff0bff34ff5380ffff04ffff02ff2effff04ff02ffff04ff23ff80808080ffff04ffff0bff34ff0580ff8080808080808080ffff04ff17ff8201ef808080ff8080ffff01ff088080ff018080ff0180ff018080ffff04ffff01a0dd8135d546e291df295b376aa89fc409c8c50d7f655d1ff4e845637901bc2f8fffff04ffff01ffff75ffc06e68747470733a2f2f617773312e646973636f757273652d63646e2e636f6d2f627573696e657373342f75706c6f6164732f636869612f6f726967696e616c2f31582f363832373534646662353936653062346563303864633233343432636335613931393234313865332e706e6780ffff68a076a1900b6931f7bf5f07ab310733270838b040385f285423f49e2f551886733580ffff04ffff01a081970d352e6a39a241eaf8ca510a0e669e40d778ba612621c60a50ef6cf29c7bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0acfbc6b1da28c3059c47f9bddb13066f85610cfc827c0f42cd8d2860859d0acde310427d82e526daefa6bfce9c356b23ff018080ff018080808080ff01808080",
        "solution": "0xffffa04088aab6e6418dec8a47b8c342d12ec9d16604f71e26a90d6513b14759250f7dffa09dafdc208971b1b881b5fd2b61bc9cb30602613681cc9db129c79b95f8edcb84ff0180ff01ffffff80ffff01ffff33ffa0d26c36cfd99da03a18a7d47dddd7beb968ff63bd7d3ccc45205fadb6958a571dff01ffffa0d26c36cfd99da03a18a7d47dddd7beb968ff63bd7d3ccc45205fadb6958a571d808080ff8080ff01ff808080"
      }
    ]
  };

  const nftCoin: OriginCoin = {
    "amount": 1n,
    "parent_coin_info": "0x73004504e9a934143daed605d717e1fe76ddef2e6774ef1b02944b3bc0e046e9",
    "puzzle_hash": "0x95bc3ecb0cd8ec0ede3aa072893e9ff7ae9859e581fdbd97bc2638d2d9f7d65e"
  };
  const analysis: NftCoinAnalysisResult = {
    "metadata": {
      "uri": "https://aws1.discourse-cdn.com/business4/uploads/chia/original/1X/682754dfb596e0b4ec08dc23442cc5a9192418e3.png",
      "hash": "76a1900b6931f7bf5f07ab310733270838b040385f285423f49e2f5518867335"
    },
    "singletonModHash": "0xf1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3",
    "launcherId": "0x03c95fdb72f85248a564d3173fcb482683facda94ed61462c0119336338f37bb",
    "launcherPuzzleHash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
    "nftStateModHash": "0xdd8135d546e291df295b376aa89fc409c8c50d7f655d1ff4e845637901bc2f8f",
    "metadataUpdaterPuzzleHash": "0x81970d352e6a39a241eaf8ca510a0e669e40d778ba612621c60a50ef6cf29c7b",
    "p2InnerPuzzle": "(a (q 2 (q 2 (i 11 (q 2 (i (= 5 (point_add 11 (pubkey_for_exp (sha256 11 (a 6 (c 2 (c 23 ()))))))) (q 2 23 47) (q 8)) 1) (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 23 ()))) ()))) (a 23 47))) 1) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0x9609418cb2545f1faf0ec37359591012251f0e7e9b94bbad13ee79701307eb5b6b8d1f62646f925dcb6c24a132a71355) 1))",
    "hintPuzzle": "0x8ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbe"
  };

  const account = getTestAccount("4a3666e148799c0f23d5644f7dceabe2b97c689dddad68929c2ec7686d2e33fd");

  const change_hex = "0x8ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbe";
  const target_hex = "0xd26c36cfd99da03a18a7d47dddd7beb968ff63bd7d3ccc45205fadb6958a571d";

  const changeAddress = puzzle.getAddressFromPuzzleHash(change_hex, xchPrefix());
  const targetAddress = puzzle.getAddressFromPuzzleHash(target_hex, xchPrefix());

  const tokenPuzzles = await getAccountAddressDetails(account);
  const availcoins: SymbolCoins = {
    [xchSymbol()]: [
      {
        "amount": 100n,
        "parent_coin_info": "0xcf2a6632809099ab0e1b02685921e3be445abd453dd4e5e1ee145a153b8c8b46",
        "puzzle_hash": "0x8ade79ac76f8943283001758b659f83916e9a8b179b33b894d3d4bd65fd90fbe"
      }
    ]
  };

  const fee = 0n;
  const spendBundle = await generateTransferNftBundle(targetAddress, changeAddress, fee, nftCoin, analysis, availcoins, tokenPuzzles, xchSymbol(), localPuzzleApiCall);
  assertBundle(expect, spendBundle);
}

async function localPuzzleApiCall(parentCoinId: string): Promise<GetParentPuzzleResponse | undefined> {
  const knownCoins: GetParentPuzzleResponse[] = [
    {
      "parentCoinId": "0x73004504e9a934143daed605d717e1fe76ddef2e6774ef1b02944b3bc0e046e9",
      "amount": 1,
      "parentParentCoinId": "0x4088aab6e6418dec8a47b8c342d12ec9d16604f71e26a90d6513b14759250f7d",
      puzzleReveal: "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa003c95fdb72f85248a564d3173fcb482683facda94ed61462c0119336338f37bba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff10ffff04ff81bfff808080ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff3affff04ff02ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff808080808080ffff04ff81bfffff01ff8080808080808080ffff04ffff01ffffff49ff0233ffff0401ff0102ffffffff02ffff03ff05ffff01ff02ff22ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ffff0181e880ffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff81a7ff80808080ff0580ffff01ff02ff81a7ffff04ff0bffff04ff05ffff04ff820167ff8080808080ffff01ff088080ff0180ffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ff0180ffff01ff04ffff04ff0bffff04ff05ff808080ffff01ff80808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff2affff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff02ff26ffff04ff02ffff04ffff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ff808080808080ffff04ff17ff8080808080ffffff04ff09ffff04ffff02ff2affff04ff02ffff04ff15ffff04ff0bff8080808080ff808080ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff22ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff2bffff01ff02ffff03ffff09ff818bff3880ffff01ff02ffff03ffff18ff8202cbff3480ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff4bff80808080808080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff808080808080808080ff0180ffff01ff02ffff03ffff15ff818bff8080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ff018080ff0180ffff01ff02ffff03ff2fffff01ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff81afffff04ffff0bff34ff5380ffff04ffff02ff2effff04ff02ffff04ff23ff80808080ffff04ffff0bff34ff0580ff8080808080808080ffff04ff17ff8201ef808080ff8080ffff01ff088080ff018080ff0180ff018080ffff04ffff01a0dd8135d546e291df295b376aa89fc409c8c50d7f655d1ff4e845637901bc2f8fffff04ffff01ffff75ffc06e68747470733a2f2f617773312e646973636f757273652d63646e2e636f6d2f627573696e657373342f75706c6f6164732f636869612f6f726967696e616c2f31582f363832373534646662353936653062346563303864633233343432636335613931393234313865332e706e6780ffff68a076a1900b6931f7bf5f07ab310733270838b040385f285423f49e2f551886733580ffff04ffff01a081970d352e6a39a241eaf8ca510a0e669e40d778ba612621c60a50ef6cf29c7bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b09609418cb2545f1faf0ec37359591012251f0e7e9b94bbad13ee79701307eb5b6b8d1f62646f925dcb6c24a132a71355ff018080ff018080808080ff01808080",
    }
  ];
  const resp = knownCoins.find(_ => _.parentCoinId == parentCoinId);
  return resp;
}

function xchPrefix() { return "txch"; }
function xchSymbol() { return "TXCH"; }