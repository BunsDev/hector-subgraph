import { Address, bigDecimal, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
// import { CurveGaugeAllocator } from '../../generated/LuxorStakingV1/CurveGaugeAllocator'
import { LuxorERC20 } from '../../generated/LuxorStakingV1/LuxorERC20';
import { LumensERC20 } from '../../generated/LuxorStakingV1/LumensERC20';
import { CirculatingSupply } from '../../generated/LuxorStakingV1/CirculatingSupply';
import { ERC20 } from '../../generated/LuxorStakingV1/ERC20';
import { UniswapV2Pair } from '../../generated/LuxorStakingV1/UniswapV2Pair';
import { LuxorStaking } from '../../generated/LuxorStakingV1/LuxorStaking';
// import { bank } from '../../generated/LuxorStakingV2/bank';
// import { SorLPPool } from '../../generated/LuxorStakingV2/SorLPPool';

import { ethereum } from '@graphprotocol/graph-ts'

import { ProtocolMetric, LastBlock } from '../../generated/schema'
import {
    CIRCULATING_SUPPLY_CONTRACT,
    CIRCULATING_SUPPLY_CONTRACT_BLOCK,
    ERC20DAI_CONTRACT,
    LUX_ERC20_CONTRACT,
    LUM_ERC20_CONTRACT_V1,
    STAKING_CONTRACT_V1,
    TREASURY_ADDRESS,
    // USDC_ERC20_CONTRACT,
    WFTM_ERC20_CONTRACT,
    LUX_USDC_PAIR,
    // LUX_USDC_PAIR_BLOCK,
    LUX_DAI_PAIR,
    STAKING_CONTRACT_V2_BLOCK,
    STAKING_CONTRACT_V2,
    LUM_ERC20_CONTRACT_V2_BLOCK,
    LUM_ERC20_CONTRACT_V2,
    // LOCKED_ADDRESS,
    // MIM_ERC20_CONTRACT,
    // FRAX_ERC20_CONTRACT,
    // LUX_WLUM_PAIR_BLOCK,
    // LUX_WLUM_PAIR_BLOCK,
    // LUX_WLUM_PAIR_BLOCK,
    // LUX_WLUM_PAIR_BLOCK,
    // WETH_ERC20_CONTRACT,
    // BANK_UNITROLLER,
    // BANK_CONTRACT,
} from './Constants';
import { toDecimal } from './Decimals';
import {
    getLUXUSDRate, getDiscountedPairUSD, getPairUSD, getFTMUSDRate,
    getWLUMUSDRate, getBOOUSDRate
} from './Price';
const TOR_LP_POOL_BLOCK = '28731023';
const BANK_BLOCK = '29042732';
const FANTOM_VALIDATOR_AMOUNT = '838870';
const FANTOM_VALIDATOR_BLOCK = '31262749';

export function loadOrCreateProtocolMetric(blockNumber: BigInt, timestamp: BigInt): ProtocolMetric {
    let id = blockNumber.minus(blockNumber.mod(BigInt.fromString("16000")));

    let protocolMetric = ProtocolMetric.load(id.toString())
    if (protocolMetric == null) {
        protocolMetric = new ProtocolMetric(id.toString())
        protocolMetric.timestamp = timestamp
        protocolMetric.luxCirculatingSupply = BigDecimal.fromString("0")
        protocolMetric.lumCirculatingSupply = BigDecimal.fromString("0")
        protocolMetric.totalSupply = BigDecimal.fromString("0")
        protocolMetric.luxPrice = BigDecimal.fromString("0")
        protocolMetric.marketCap = BigDecimal.fromString("0")
        protocolMetric.totalValueLocked = BigDecimal.fromString("0")
        protocolMetric.treasuryRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryMarketValue = BigDecimal.fromString("0")
        protocolMetric.treasuryInvestments = BigDecimal.fromString("0")
        protocolMetric.nextEpochRebase = BigDecimal.fromString("0")
        protocolMetric.nextDistributedHec = BigDecimal.fromString("0")
        protocolMetric.currentAPY = BigDecimal.fromString("0")
        protocolMetric.treasuryDaiRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryUsdcRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryDaiMarketValue = BigDecimal.fromString("0")
        protocolMetric.treasuryUsdcMarketValue = BigDecimal.fromString("0")
        protocolMetric.treasuryWFTMRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryWFTMMarketValue = BigDecimal.fromString("0")
        protocolMetric.treasuryMIMRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryMIMMarketValue = BigDecimal.fromString("0")
        protocolMetric.treasuryFRAXRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryFRAXMarketValue = BigDecimal.fromString("0")
        protocolMetric.treasuryWLUMRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryWLUMMarketValue = BigDecimal.fromString("0")
        protocolMetric.treasuryHecDaiPOL = BigDecimal.fromString("0")
        protocolMetric.treasuryHecUsdcPOL = BigDecimal.fromString("0")
        protocolMetric.treasuryHecFraxPOL = BigDecimal.fromString("0")
        protocolMetric.treasuryBOORiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryBOOMarketValue = BigDecimal.fromString("0")
        protocolMetric.treasuryCRVRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryCRVMarketValue = BigDecimal.fromString("0")
        protocolMetric.treasuryWETHRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryWETHMarketValue = BigDecimal.fromString("0")
        protocolMetric.bankBorrowed = bigDecimal.fromString('0');
        protocolMetric.bankSupplied = bigDecimal.fromString('0');
        protocolMetric.treasuryDaiLPMarketValue = bigDecimal.fromString('0');
        protocolMetric.treasuryUsdcLPMarketValue = bigDecimal.fromString('0');
        protocolMetric.treasuryFantomValidatorValue = bigDecimal.fromString('0');
        protocolMetric.treasuryTORLPValue = bigDecimal.fromString('0');
        protocolMetric.treasuryDaiTokenAmount = BigDecimal.fromString("0")
        protocolMetric.treasuryUsdcTokenAmount = BigDecimal.fromString("0")
        protocolMetric.treasuryWFTMTokenAmount = BigDecimal.fromString("0")
        protocolMetric.treasuryFRAXTokenAmount = BigDecimal.fromString("0")
        protocolMetric.treasuryBOOTokenAmount = BigDecimal.fromString("0")
        protocolMetric.treasuryCRVTokenAmount = BigDecimal.fromString("0")
        protocolMetric.treasuryWETHTokenAmount = BigDecimal.fromString("0")
        protocolMetric.hecDaiTokenAmount = BigDecimal.fromString("0")
        protocolMetric.hecUsdcTokenAmount = BigDecimal.fromString("0")
        protocolMetric.hecFraxTokenAmount = BigDecimal.fromString("0")

        protocolMetric.save()
    }
    return protocolMetric as ProtocolMetric
}



function getTotalSupply(): BigDecimal {
    let hec_contract = LuxorERC20.bind(Address.fromString(LUX_ERC20_CONTRACT))
    let total_supply = toDecimal(hec_contract.totalSupply(), 9)
    log.debug("Total Supply {}", [total_supply.toString()])
    return total_supply
}

// function getBankLendingValues(): BigDecimal[] {
//     const bankContract = bank.bind(Address.fromString(BANK_CONTRACT));
//     const bankValues = bankContract.viewLendingNetwork(Address.fromString(BANK_UNITROLLER));
//     return [toDecimal(bankValues.value0), toDecimal(bankValues.value1)];
// }

function getCirculatingSupply(blockNumber: BigInt, total_supply: BigDecimal): BigDecimal {
    let circ_supply: BigDecimal
    if (blockNumber.gt(BigInt.fromString(CIRCULATING_SUPPLY_CONTRACT_BLOCK))) {
        let circulatingsupply_contract = CirculatingSupply.bind(Address.fromString(CIRCULATING_SUPPLY_CONTRACT))
        circ_supply = toDecimal(circulatingsupply_contract.LUXCirculatingSupply(), 9)
    } else {
        circ_supply = total_supply;
    }
    log.debug("Circulating Supply {}", [circ_supply.toString()])
    return circ_supply
}

function getLumSupply(blockNumber: BigInt): BigDecimal {
    let lum_contract_v1 = LumensERC20.bind(Address.fromString(LUM_ERC20_CONTRACT_V1))
    let lum_supply = toDecimal(lum_contract_v1.circulatingSupply(), 9)

    if (blockNumber.gt(BigInt.fromString(LUM_ERC20_CONTRACT_V2_BLOCK))) {
        let lum_contract_v2 = LumensERC20.bind(Address.fromString(LUM_ERC20_CONTRACT_V2))
        lum_supply = lum_supply.plus(toDecimal(lum_contract_v2.circulatingSupply(), 9))
    }

    log.debug("LUM Supply {}", [lum_supply.toString()])
    return lum_supply
}

function getLUXDAIReserves(pair: UniswapV2Pair): BigDecimal[] {
    let reserves = pair.getReserves()
    let hecReserves = toDecimal(reserves.value0, 9)
    let daiReserves = toDecimal(reserves.value1, 18)
    return [hecReserves, daiReserves]
}

function getLUXUSDCReserves(pair: UniswapV2Pair): BigDecimal[] {
    let reserves = pair.getReserves()
    let usdcReserves = toDecimal(reserves.value0, 6)
    let hecReserves = toDecimal(reserves.value1, 9)
    return [hecReserves, usdcReserves]
}

function getLUXFRAXReserves(pair: UniswapV2Pair): BigDecimal[] {
    let reserves = pair.getReserves()
    let hecReserves = toDecimal(reserves.value0, 9)
    let fraxReserves = toDecimal(reserves.value1, 18)
    return [hecReserves, fraxReserves]
}

function getLUXWLUMReserves(pair: UniswapV2Pair): BigDecimal[] {
    let reserves = pair.getReserves()
    let hecReserves = toDecimal(reserves.value0, 9)
    let gohmReserves = toDecimal(reserves.value1, 18)
    return [hecReserves, gohmReserves]
}

// function getSorLpValue(): BigDecimal {
//     let torLPERC20 = ERC20.bind(Address.fromString(SOR_LP_ADDRESS))
//     let sorLpContract = SorLPPool.bind(Address.fromString(TOR_LP_POOL_ADDRESS));
//     let sorVirtualPrice = toDecimal(sorLpContract.get_virtual_price(), 18);

//     const getSorLpBalance = torLPERC20.try_balanceOf(Address.fromString(TREASURY_ADDRESS));
//     if (getSorLpBalance.reverted) {
//         const getSorLp = torLPERC20.try_balanceOf(Address.fromString(TREASURY_ADDRESS));
//         if (getSorLp.reverted) {
//             return BigDecimal.fromString('0');
//         }
//         return toDecimal(getSorLp.value, 18).times(sorVirtualPrice);
//     }
//     let torLPBalance = toDecimal(getSorLpBalance.value, 18);
//     return torLPBalance.times(sorVirtualPrice);
// }

function getMV_RFV(blockNumber: BigInt): BigDecimal[] {
    const rfvRatio = BigDecimal.fromString('0.5')
    let daiERC20 = ERC20.bind(Address.fromString(ERC20DAI_CONTRACT))
    // let usdcERC20 = ERC20.bind(Address.fromString(USDC_ERC20_CONTRACT))
    let wftmERC20 = ERC20.bind(Address.fromString(WFTM_ERC20_CONTRACT))
    // let wethERC20 = ERC20.bind(Address.fromString(WETH_ERC20_CONTRACT))

    let hecdaiPair = UniswapV2Pair.bind(Address.fromString(LUX_DAI_PAIR))
    // let luxusdcPair = UniswapV2Pair.bind(Address.fromString(LUX_USDC_PAIR))
    // let luxwlumPair = UniswapV2Pair.bind(Address.fromString(LUX_WLUM_PAIR_BLOCK))

    let daiBalance = daiERC20.balanceOf(Address.fromString(TREASURY_ADDRESS))
    // let usdcBalance = usdcERC20.balanceOf(Address.fromString(TREASURY_ADDRESS))

    // Calculate wftm value
    let wftmBalance = wftmERC20.balanceOf(Address.fromString(TREASURY_ADDRESS))
    let wftmValue = toDecimal(wftmBalance, 18).times(getFTMUSDRate())
    let wftmRFV = wftmValue.times(rfvRatio)
    let fantomValidatorValue = BigDecimal.fromString('0');
    if (blockNumber.gt(BigInt.fromString(FANTOM_VALIDATOR_BLOCK))) {
        fantomValidatorValue = BigDecimal.fromString(FANTOM_VALIDATOR_AMOUNT).times(getFTMUSDRate())
    }

    let luxusdRate = getLUXUSDRate()

    //LUXDAI
    let hecdaiBalance = hecdaiPair.balanceOf(Address.fromString(TREASURY_ADDRESS))
    // let hecdaiLockedBalance = hecdaiPair.balanceOf(Address.fromString(LOCKED_ADDRESS))
    let hecdaiTotalLP = toDecimal(hecdaiPair.totalSupply(), 18)
    let hecdaiReserves = getLUXDAIReserves(hecdaiPair)
    // let hecdaiPOL = toDecimal(hecdaiBalance.plus(hecdaiLockedBalance), 18).div(hecdaiTotalLP).times(BigDecimal.fromString("100"))
    let hecdaiPOL = toDecimal(hecdaiBalance, 18).div(hecdaiTotalLP).times(BigDecimal.fromString("100"))
    let hecdaiValue = getPairUSD(hecdaiBalance, hecdaiTotalLP, hecdaiReserves, luxusdRate, BigDecimal.fromString('1'))
    let hecdaiRFV = getDiscountedPairUSD(hecdaiBalance, hecdaiTotalLP, hecdaiReserves, BigDecimal.fromString('1'))

    //LUXWLUM
    // let luxwlumValue = BigDecimal.fromString("0")
    // let luxwlumRFV = BigDecimal.fromString("0")
    // let luxwlumPOL = BigDecimal.fromString('0')
    // let luxwlumBalance: BigInt = BigInt.fromString('0');
    // if (blockNumber.gt(BigInt.fromString(LUX_WLUM_PAIR_BLOCK))) {
    //     luxwlumBalance = luxwlumPair.balanceOf(Address.fromString(TREASURY_ADDRESS))
    //     let luxwlumTotalLP = toDecimal(luxwlumPair.totalSupply(), 18)
    //     let luxwlumReserves = getLUXWLUMReserves(luxwlumPair)
    //     luxwlumPOL = toDecimal(luxwlumBalance, 18).div(luxwlumTotalLP).times(BigDecimal.fromString('100'))
    //     luxwlumValue = getPairUSD(luxwlumBalance, luxwlumTotalLP, luxwlumReserves, luxusdRate, getWLUMUSDRate())
    //     luxwlumRFV = getDiscountedPairUSD(luxwlumBalance, luxwlumTotalLP, luxwlumReserves, BigDecimal.fromString('48')) // NOTE: There is no way to get OHM index on other chains :(
    // }

    let daiInvestments = BigDecimal.fromString('0')
    let usdcInvestments = BigDecimal.fromString('0')
    let investments = BigDecimal.fromString('0')

    let stableValueDecimal = toDecimal(daiBalance, 18)
        // .plus(toDecimal(usdcBalance, 6))
        // .plus(toDecimal(mimBalance, 18))
        // .plus(toDecimal(fraxBalance, 18))
        .plus(investments)

    // let lpValue = hecdaiValue.plus(luxwlumValue)
    // let rfvLpValue = hecdaiRFV.plus(luxwlumRFV)

    let mv = stableValueDecimal.plus(wftmValue);
    let sorLpValue = bigDecimal.fromString('0');
    // if (blockNumber.gt(BigInt.fromString(TOR_LP_POOL_BLOCK))) {
    //     log.debug('TOR LP VALUE {}', [getSorLpValue().toString()])
    //     sorLpValue = getSorLpValue();
    //     mv = mv.plus(sorLpValue);
    // }
    let rfv = stableValueDecimal.plus(wftmRFV)

    log.debug("Treasury Market Value {}", [mv.toString()])
    log.debug("Treasury RFV {}", [rfv.toString()])
    log.debug("Treasury Investments {}", [investments.toString()])
    log.debug("Treasury DAI value {}", [toDecimal(daiBalance, 18).toString()])
    // log.debug("Treasury USDC value {}", [toDecimal(usdcBalance, 6).toString()])
    log.debug("Treasury WFTM value {}", [wftmValue.toString()])
    log.debug("Treasury WFTM RFV {}", [wftmRFV.toString()])
    log.debug("Treasury LUX-DAI RFV {}", [hecdaiRFV.toString()])
    // log.debug("Treasury LUX-WLUM RFV {}", [luxwlumRFV.toString()])

    return [
        mv,
        rfv,
        // treasuryDaiRiskFreeValue = DAI RFV 
        hecdaiRFV,
        // treasuryDaiMarketValue = DAI
        toDecimal(daiBalance, 18),
        // treasuryUsdcMarketValue = USDC
        // toDecimal(usdcBalance, 6),
        wftmRFV,
        wftmValue,
        // treasuryFraxMarketValue = Frax LP + FRAX
        // treasuryFraxRiskFreeValue = FRAX RFV + FRAX
        // luxwlumValue,
        // luxwlumRFV,
        // POL
        hecdaiPOL,
        // Investing
        investments,
        hecdaiValue,,
        fantomValidatorValue,
        // sorLpValue,
        toDecimal(daiBalance, 18),
        toDecimal(wftmBalance, 18),
        // toDecimal(hecdaiBalance.plus(hecdaiLockedBalance), 18),
        toDecimal(hecdaiBalance, 18),
    ]
}

function getNextLUXRebase(blockNumber: BigInt): BigDecimal {
    let staking_contract_v1 = LuxorStaking.bind(Address.fromString(STAKING_CONTRACT_V1))
    let distribution_v1 = toDecimal(staking_contract_v1.epoch().value3, 9)
    log.debug("next_distribution v1 {}", [distribution_v1.toString()])
    let next_distribution = distribution_v1

    if (blockNumber.gt(BigInt.fromString(STAKING_CONTRACT_V2_BLOCK))) {
        let staking_contract_v2 = LuxorStaking.bind(Address.fromString(STAKING_CONTRACT_V2))
        let distribution_v2 = toDecimal(staking_contract_v2.epoch().value3, 9)
        log.debug("next_distribution v2 {}", [distribution_v2.toString()])
        next_distribution = next_distribution.plus(distribution_v2)
    }

    log.debug("next_distribution total {}", [next_distribution.toString()])

    return next_distribution
}

function getAPY_Rebase(LUM: BigDecimal, distributedLUX: BigDecimal): BigDecimal[] {
    let nextEpochRebase = LUM.gt(BigDecimal.fromString('0'))
        ? distributedLUX.div(LUM).times(BigDecimal.fromString("100"))
        : BigDecimal.fromString('0');

    let nextEpochRebase_number = parseFloat(nextEpochRebase.toString())
    let currentAPY = Math.pow(((Math.min(90, nextEpochRebase_number) / 100) + 1), (365 * 3) - 1) * 100

    let currentAPYdecimal = BigDecimal.fromString(currentAPY.toString())

    log.debug("next_rebase {}", [nextEpochRebase.toString()])
    log.debug("current_apy total {}", [currentAPYdecimal.toString()])

    return [currentAPYdecimal, nextEpochRebase]
}

function getRunway(lum: BigDecimal, rfv: BigDecimal, rebase: BigDecimal): BigDecimal {
    let runwayCurrent = BigDecimal.fromString("0")

    if (lum.gt(BigDecimal.fromString("0")) && rfv.gt(BigDecimal.fromString("0")) && rebase.gt(BigDecimal.fromString("0"))) {
        let treasury_runway = parseFloat(rfv.div(lum).toString())

        let nextEpochRebase_number = parseFloat(rebase.toString()) / 100
        let runwayCurrent_num = (Math.log(treasury_runway) / Math.log(1 + nextEpochRebase_number)) / 3;

        runwayCurrent = BigDecimal.fromString(runwayCurrent_num.toString())
    }

    return runwayCurrent
}


export function updateProtocolMetrics(blockNumber: BigInt, timestamp: BigInt): void {
    let pm = loadOrCreateProtocolMetric(blockNumber, timestamp);

    //Total Supply
    pm.totalSupply = getTotalSupply()

    //Circ Supply
    pm.luxCirculatingSupply = getCirculatingSupply(blockNumber, pm.totalSupply)

    //lum Supply
    pm.lumCirculatingSupply = getLumSupply(blockNumber)

    //LUX Price
    pm.luxPrice = getLUXUSDRate()

    //LUX Market Cap
    pm.marketCap = pm.luxCirculatingSupply.times(pm.luxPrice)

    //Total Value Locked
    pm.totalValueLocked = pm.lumCirculatingSupply.times(pm.luxPrice)

    // if (blockNumber.gt(BigInt.fromString(BANK_BLOCK))) {
    //     pm.bankSupplied = getBankLendingValues()[0];
    //     pm.bankBorrowed = getBankLendingValues()[1]
    // }

    //Treasury RFV and MV
    let mv_rfv = getMV_RFV(blockNumber)
    pm.treasuryMarketValue = mv_rfv[0]
    pm.treasuryRiskFreeValue = mv_rfv[1]
    pm.treasuryDaiRiskFreeValue = mv_rfv[2]
    pm.treasuryUsdcRiskFreeValue = mv_rfv[3]
    pm.treasuryDaiMarketValue = mv_rfv[4]
    pm.treasuryUsdcMarketValue = mv_rfv[5]
    pm.treasuryWFTMRiskFreeValue = mv_rfv[6]
    pm.treasuryWFTMMarketValue = mv_rfv[7]
    pm.treasuryMIMRiskFreeValue = mv_rfv[8]
    pm.treasuryMIMMarketValue = mv_rfv[9]
    pm.treasuryFRAXMarketValue = mv_rfv[10]
    pm.treasuryFRAXRiskFreeValue = mv_rfv[11]
    pm.treasuryWLUMMarketValue = mv_rfv[12]
    pm.treasuryWLUMRiskFreeValue = mv_rfv[13]
    pm.treasuryHecDaiPOL = mv_rfv[14]
    pm.treasuryHecUsdcPOL = mv_rfv[15]
    pm.treasuryHecFraxPOL = mv_rfv[16]
    pm.treasuryInvestments = mv_rfv[17]
    pm.treasuryBOORiskFreeValue = mv_rfv[18]
    pm.treasuryBOOMarketValue = mv_rfv[19]
    pm.treasuryCRVRiskFreeValue = mv_rfv[20]
    pm.treasuryCRVMarketValue = mv_rfv[21]
    pm.treasuryWETHRiskFreeValue = mv_rfv[22]
    pm.treasuryWETHMarketValue = mv_rfv[23]
    pm.treasuryDaiLPMarketValue = mv_rfv[24]
    pm.treasuryUsdcLPMarketValue = mv_rfv[25]
    pm.treasuryFantomValidatorValue = mv_rfv[26];
    pm.treasuryTORLPValue = mv_rfv[27];
    pm.treasuryDaiTokenAmount = mv_rfv[28];
    pm.treasuryUsdcTokenAmount = mv_rfv[29];
    pm.treasuryWFTMTokenAmount = mv_rfv[30];
    pm.treasuryFRAXTokenAmount = mv_rfv[31];
    pm.treasuryBOOTokenAmount = mv_rfv[32];
    pm.treasuryCRVTokenAmount = mv_rfv[33];
    pm.treasuryWETHTokenAmount = mv_rfv[34];
    pm.hecDaiTokenAmount = mv_rfv[35];
    pm.hecUsdcTokenAmount = mv_rfv[36];
    pm.hecFraxTokenAmount = mv_rfv[37];


    // Rebase rewards, APY, rebase
    pm.nextDistributedHec = getNextLUXRebase(blockNumber)
    let apy_rebase = getAPY_Rebase(pm.lumCirculatingSupply, pm.nextDistributedHec)
    pm.currentAPY = apy_rebase[0]
    pm.nextEpochRebase = apy_rebase[1]

    //Runway
    pm.runwayCurrent = getRunway(pm.lumCirculatingSupply, pm.treasuryRiskFreeValue, pm.nextEpochRebase)

    pm.save()
}

export function handleBlock(block: ethereum.Block): void {
    let lastBlock = LastBlock.load('0')
    if (lastBlock == null || block.number.minus(lastBlock.number).gt(BigInt.fromString('300'))) {
        lastBlock = new LastBlock('0')
        lastBlock.number = block.number
        lastBlock.timestamp = block.timestamp
        lastBlock.save()
        updateProtocolMetrics(block.number, block.timestamp)
    }
}
