import { Address, BigDecimal, BigInt, log} from '@graphprotocol/graph-ts'
import { HectorERC20 } from '../../generated/HectorStakingV1/HectorERC20';
import { sHectorERC20 } from '../../generated/HectorStakingV1/sHectorERC20';
import { CirculatingSupply } from '../../generated/HectorStakingV1/CirculatingSupply';
import { ERC20 } from '../../generated/HectorStakingV1/ERC20';
import { UniswapV2Pair } from '../../generated/HectorStakingV1/UniswapV2Pair';
import { HectorStaking } from '../../generated/HectorStakingV1/HectorStaking';
import { ethereum } from '@graphprotocol/graph-ts'

import { ProtocolMetric, LastBlock } from '../../generated/schema'
import {
    CIRCULATING_SUPPLY_CONTRACT,
    CIRCULATING_SUPPLY_CONTRACT_BLOCK,
    ERC20DAI_CONTRACT,
    HEC_ERC20_CONTRACT,
    SHEC_ERC20_CONTRACT_V1,
    STAKING_CONTRACT_V1,
    TREASURY_ADDRESS,
    USDC_ERC20_CONTRACT,
    WFTM_ERC20_CONTRACT,
    SPIRIT_HECUSDC_PAIR,
    SPIRIT_HECUSDC_PAIR_BLOCK,
    SPOOKY_HECDAI_PAIR,
    STAKING_CONTRACT_V2_BLOCK,
    STAKING_CONTRACT_V2,
    SHEC_ERC20_CONTRACT_V2_BLOCK,
    SHEC_ERC20_CONTRACT_V2, LOCKED_ADDRESS, MIM_ERC20_CONTRACT
} from './Constants';
import { toDecimal } from './Decimals';
import { getHECUSDRate, getDiscountedPairUSD, getPairUSD, getFTMUSDRate } from './Price';


export function loadOrCreateProtocolMetric(blockNumber: BigInt): ProtocolMetric{
    let id = blockNumber.minus(blockNumber.mod(BigInt.fromString("16000")));

    let protocolMetric = ProtocolMetric.load(id.toString())
    if (protocolMetric == null) {
        protocolMetric = new ProtocolMetric(id.toString())
        protocolMetric.timestamp = blockNumber
        protocolMetric.hecCirculatingSupply = BigDecimal.fromString("0")
        protocolMetric.sHecCirculatingSupply = BigDecimal.fromString("0")
        protocolMetric.totalSupply = BigDecimal.fromString("0")
        protocolMetric.hecPrice = BigDecimal.fromString("0")
        protocolMetric.marketCap = BigDecimal.fromString("0")
        protocolMetric.totalValueLocked = BigDecimal.fromString("0")
        protocolMetric.treasuryRiskFreeValue = BigDecimal.fromString("0")
        protocolMetric.treasuryMarketValue = BigDecimal.fromString("0")
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
        protocolMetric.treasuryHecDaiPOL = BigDecimal.fromString("0")
        protocolMetric.treasuryHecUsdcPOL = BigDecimal.fromString("0")

        protocolMetric.save()
    }
    return protocolMetric as ProtocolMetric
}


function getTotalSupply(): BigDecimal{
    let hec_contract = HectorERC20.bind(Address.fromString(HEC_ERC20_CONTRACT))
    let total_supply = toDecimal(hec_contract.totalSupply(), 9)
    log.debug("Total Supply {}", [total_supply.toString()])
    return total_supply
}

function getCriculatingSupply(blockNumber: BigInt, total_supply: BigDecimal): BigDecimal{
    let circ_supply: BigDecimal
    if(blockNumber.gt(BigInt.fromString(CIRCULATING_SUPPLY_CONTRACT_BLOCK))){
        let circulatingsupply_contract = CirculatingSupply.bind(Address.fromString(CIRCULATING_SUPPLY_CONTRACT))
        circ_supply = toDecimal(circulatingsupply_contract.HECCirculatingSupply(), 9)
    } else {
        circ_supply = total_supply;
    }
    log.debug("Circulating Supply {}", [circ_supply.toString()])
    return circ_supply
}

function getShecSupply(blockNumber: BigInt): BigDecimal{
    let shec_contract_v1 = sHectorERC20.bind(Address.fromString(SHEC_ERC20_CONTRACT_V1))
    let shec_supply = toDecimal(shec_contract_v1.circulatingSupply(), 9)

    if(blockNumber.gt(BigInt.fromString(SHEC_ERC20_CONTRACT_V2_BLOCK))){
        let shec_contract_v2 = sHectorERC20.bind(Address.fromString(SHEC_ERC20_CONTRACT_V2))
        shec_supply = shec_supply.plus(toDecimal(shec_contract_v2.circulatingSupply(), 9))
    }
    
    log.debug("sHEC Supply {}", [shec_supply.toString()])
    return shec_supply
}

function getHECDAIReserves(pair: UniswapV2Pair): BigDecimal[] {
    let hecReserves = toDecimal(pair.getReserves().value0, 9)
    let daiReserves = toDecimal(pair.getReserves().value1, 18)
    return [hecReserves, daiReserves]
}

function getHECUSDCReserves(pair: UniswapV2Pair): BigDecimal[] {
    let usdcReserves = toDecimal(pair.getReserves().value0, 6)
    let hecReserves = toDecimal(pair.getReserves().value1, 9)
    return [hecReserves, usdcReserves]
}

function getMV_RFV(blockNumber: BigInt): BigDecimal[]{
    let daiERC20 = ERC20.bind(Address.fromString(ERC20DAI_CONTRACT))
    let usdcERC20 = ERC20.bind(Address.fromString(USDC_ERC20_CONTRACT))
    let wftmERC20 = ERC20.bind(Address.fromString(WFTM_ERC20_CONTRACT))
    let mimERC20 = ERC20.bind(Address.fromString(MIM_ERC20_CONTRACT))

    let hecdaiPair = UniswapV2Pair.bind(Address.fromString(SPOOKY_HECDAI_PAIR))
    let hecusdcPair = UniswapV2Pair.bind(Address.fromString(SPIRIT_HECUSDC_PAIR))

    let daiBalance = daiERC20.balanceOf(Address.fromString(TREASURY_ADDRESS))
    let usdcBalance = usdcERC20.balanceOf(Address.fromString(TREASURY_ADDRESS))
    let mimBalance = mimERC20.balanceOf(Address.fromString(TREASURY_ADDRESS))
    let wftmBalance = wftmERC20.balanceOf(Address.fromString(TREASURY_ADDRESS))
    let wftmValue = toDecimal(wftmBalance, 18).times(getFTMUSDRate())

    //HECDAI
    let hecdaiBalance = hecdaiPair.balanceOf(Address.fromString(TREASURY_ADDRESS))
    let hecdaiLockedBalance = hecdaiPair.balanceOf(Address.fromString(LOCKED_ADDRESS))
    let hecdaiTotalLP = toDecimal(hecdaiPair.totalSupply(), 18)
    let hecdaiPOL = toDecimal(hecdaiBalance.plus(hecdaiLockedBalance), 18).div(hecdaiTotalLP).times(BigDecimal.fromString("100"))
    let hecdaiValue = getPairUSD(hecdaiBalance, SPOOKY_HECDAI_PAIR, getHECDAIReserves)
    let hecdaiRFV = getDiscountedPairUSD(hecdaiBalance, SPOOKY_HECDAI_PAIR, getHECDAIReserves)

    //HECUSDC
    let hecusdcValue = BigDecimal.fromString('0');
    let hecusdcRFV = BigDecimal.fromString('0')
    let hecusdcPOL = BigDecimal.fromString('0')
    if(blockNumber.gt(BigInt.fromString(SPIRIT_HECUSDC_PAIR_BLOCK))){
        let hecusdcBalance = hecusdcPair.balanceOf(Address.fromString(TREASURY_ADDRESS))
        let hecusdcTotalLP = toDecimal(hecusdcPair.totalSupply(), 18)
        hecusdcPOL = toDecimal(hecusdcBalance, 18).div(hecusdcTotalLP).times(BigDecimal.fromString("100"))
        hecusdcValue = getPairUSD(hecusdcBalance, SPIRIT_HECUSDC_PAIR, getHECUSDCReserves)
        hecusdcRFV = getDiscountedPairUSD(hecusdcBalance, SPIRIT_HECUSDC_PAIR, getHECUSDCReserves)
    }

    let stableValueDecimal = toDecimal(daiBalance, 18).plus(toDecimal(usdcBalance, 6)).plus(toDecimal(mimBalance, 18))

    let lpValue = hecdaiValue.plus(hecusdcValue)
    let rfvLpValue = hecdaiRFV.plus(hecusdcRFV)

    let mv = stableValueDecimal.plus(lpValue).plus(wftmValue)
    let rfv = stableValueDecimal.plus(rfvLpValue)

    log.debug("Treasury Market Value {}", [mv.toString()])
    log.debug("Treasury RFV {}", [rfv.toString()])
    log.debug("Treasury DAI value {}", [toDecimal(daiBalance, 18).toString()])
    log.debug("Treasury USDC value {}", [toDecimal(usdcBalance, 6).toString()])
    log.debug("Treasury WFTM value {}", [wftmValue.toString()])
    log.debug("Treasury HEC-DAI RFV {}", [hecdaiRFV.toString()])
    log.debug("Treasury HEC-USDC RFV {}", [hecusdcRFV.toString()])

    return [
        mv, 
        rfv,
        // treasuryDaiRiskFreeValue = DAI RFV + DAI
        hecdaiRFV.plus(toDecimal(daiBalance, 18)),
        // treasuryFraxRiskFreeValue = USDC RFV + USDC
        hecusdcRFV.plus(toDecimal(usdcBalance, 6)),
        // treasuryDaiMarketValue = DAI LP + DAI
        hecdaiValue.plus(toDecimal(daiBalance, 18)),
        // treasuryFraxMarketValue = USDC LP + USDC
        hecusdcValue.plus(toDecimal(usdcBalance, 6)),
        wftmValue,
        wftmValue,
        toDecimal(mimBalance, 18),
        toDecimal(mimBalance, 18),
        // POL
        hecdaiPOL,
        hecusdcPOL,
    ]
}

function getNextHECRebase(blockNumber: BigInt): BigDecimal{
    let staking_contract_v1 = HectorStaking.bind(Address.fromString(STAKING_CONTRACT_V1))
    let distribution_v1 = toDecimal(staking_contract_v1.epoch().value3,9)
    log.debug("next_distribution v1 {}", [distribution_v1.toString()])
    let next_distribution = distribution_v1

    if(blockNumber.gt(BigInt.fromString(STAKING_CONTRACT_V2_BLOCK))) {
        let staking_contract_v2 = HectorStaking.bind(Address.fromString(STAKING_CONTRACT_V2))
        let distribution_v2 = toDecimal(staking_contract_v2.epoch().value3,9)
        log.debug("next_distribution v2 {}", [distribution_v2.toString()])
        next_distribution = next_distribution.plus(distribution_v2)
    }

    log.debug("next_distribution total {}", [next_distribution.toString()])

    return next_distribution
}

function getAPY_Rebase(sHEC: BigDecimal, distributedHEC: BigDecimal): BigDecimal[]{
    let nextEpochRebase = sHEC.gt(BigDecimal.fromString('0'))
        ? distributedHEC.div(sHEC).times(BigDecimal.fromString("100"))
        : BigDecimal.fromString('0');

    let nextEpochRebase_number = parseFloat(nextEpochRebase.toString())
    let currentAPY = Math.pow(((Math.min(90,nextEpochRebase_number) / 100) + 1), (365*3)-1)*100

    let currentAPYdecimal = BigDecimal.fromString(currentAPY.toString())

    log.debug("next_rebase {}", [nextEpochRebase.toString()])
    log.debug("current_apy total {}", [currentAPYdecimal.toString()])

    return [currentAPYdecimal, nextEpochRebase]
}

function getRunway(sHec: BigDecimal, rfv: BigDecimal, rebase: BigDecimal): BigDecimal{
    let runwayCurrent = BigDecimal.fromString("0")

    if(sHec.gt(BigDecimal.fromString("0")) && rfv.gt(BigDecimal.fromString("0")) &&  rebase.gt(BigDecimal.fromString("0"))){
        let treasury_runway = parseFloat(rfv.div(sHec).toString())

        let nextEpochRebase_number = parseFloat(rebase.toString())/100
        let runwayCurrent_num = (Math.log(treasury_runway) / Math.log(1+nextEpochRebase_number))/3;

        runwayCurrent = BigDecimal.fromString(runwayCurrent_num.toString())
    }

    return runwayCurrent
}


export function updateProtocolMetrics(blockNumber: BigInt): void{
    let pm = loadOrCreateProtocolMetric(blockNumber);

    //Total Supply
    pm.totalSupply = getTotalSupply()

    //Circ Supply
    pm.hecCirculatingSupply = getCriculatingSupply(blockNumber, pm.totalSupply)

    //sHec Supply
    pm.sHecCirculatingSupply = getShecSupply(blockNumber)

    //HEC Price
    pm.hecPrice = getHECUSDRate()

    //HEC Market Cap
    pm.marketCap = pm.hecCirculatingSupply.times(pm.hecPrice)

    //Total Value Locked
    pm.totalValueLocked = pm.sHecCirculatingSupply.times(pm.hecPrice)

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
    pm.treasuryHecDaiPOL = mv_rfv[10]
    pm.treasuryHecUsdcPOL = mv_rfv[11]

    // Rebase rewards, APY, rebase
    pm.nextDistributedHec = getNextHECRebase(blockNumber)
    let apy_rebase = getAPY_Rebase(pm.sHecCirculatingSupply, pm.nextDistributedHec)
    pm.currentAPY = apy_rebase[0]
    pm.nextEpochRebase = apy_rebase[1]

    //Runway
    pm.runwayCurrent = getRunway(pm.sHecCirculatingSupply, pm.treasuryRiskFreeValue, pm.nextEpochRebase)

    pm.save()
}

export function handleBlock(block: ethereum.Block): void {
    let lastBlock = LastBlock.load('0')
    if (lastBlock == null || block.number.minus(lastBlock.number).gt(BigInt.fromString('300'))) {
        lastBlock = new LastBlock('0')
        lastBlock.number = block.number
        lastBlock.timestamp = block.timestamp
        lastBlock.save()
        updateProtocolMetrics(block.number)
    }
}