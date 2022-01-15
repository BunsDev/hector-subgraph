// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Rebase extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("transaction", Value.fromString(""));
    this.set("amount", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("stakedHecs", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("percentage", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("contract", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("value", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Rebase entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Rebase entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Rebase", id.toString(), this);
    }
  }

  static load(id: string): Rebase | null {
    return changetype<Rebase | null>(store.get("Rebase", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value!.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value!.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get stakedHecs(): BigDecimal {
    let value = this.get("stakedHecs");
    return value!.toBigDecimal();
  }

  set stakedHecs(value: BigDecimal) {
    this.set("stakedHecs", Value.fromBigDecimal(value));
  }

  get percentage(): BigDecimal {
    let value = this.get("percentage");
    return value!.toBigDecimal();
  }

  set percentage(value: BigDecimal) {
    this.set("percentage", Value.fromBigDecimal(value));
  }

  get contract(): string {
    let value = this.get("contract");
    return value!.toString();
  }

  set contract(value: string) {
    this.set("contract", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get value(): BigDecimal {
    let value = this.get("value");
    return value!.toBigDecimal();
  }

  set value(value: BigDecimal) {
    this.set("value", Value.fromBigDecimal(value));
  }
}

export class ProtocolMetric extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("hecCirculatingSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("sHecCirculatingSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("hecPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("marketCap", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalValueLocked", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("treasuryRiskFreeValue", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("treasuryMarketValue", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("treasuryInvestments", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("nextEpochRebase", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("nextDistributedHec", Value.fromBigDecimal(BigDecimal.zero()));
    this.set(
      "treasuryDaiRiskFreeValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "treasuryUsdcRiskFreeValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "treasuryWFTMRiskFreeValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "treasuryMIMRiskFreeValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "treasuryFRAXRiskFreeValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "treasuryGOHMRiskFreeValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set("treasuryDaiMarketValue", Value.fromBigDecimal(BigDecimal.zero()));
    this.set(
      "treasuryUsdcMarketValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "treasuryWFTMMarketValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set("treasuryMIMMarketValue", Value.fromBigDecimal(BigDecimal.zero()));
    this.set(
      "treasuryFRAXMarketValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "treasuryGOHMMarketValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set("currentAPY", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("treasuryHecDaiPOL", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("treasuryHecUsdcPOL", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("treasuryHecFraxPOL", Value.fromBigDecimal(BigDecimal.zero()));
    this.set(
      "treasuryBOORiskFreeValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set("treasuryBOOMarketValue", Value.fromBigDecimal(BigDecimal.zero()));
    this.set(
      "treasuryCRVRiskFreeValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set("treasuryCRVMarketValue", Value.fromBigDecimal(BigDecimal.zero()));
    this.set(
      "treasuryWETHRiskFreeValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "treasuryWETHMarketValue",
      Value.fromBigDecimal(BigDecimal.zero())
    );
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ProtocolMetric entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ProtocolMetric entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ProtocolMetric", id.toString(), this);
    }
  }

  static load(id: string): ProtocolMetric | null {
    return changetype<ProtocolMetric | null>(store.get("ProtocolMetric", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get hecCirculatingSupply(): BigDecimal {
    let value = this.get("hecCirculatingSupply");
    return value!.toBigDecimal();
  }

  set hecCirculatingSupply(value: BigDecimal) {
    this.set("hecCirculatingSupply", Value.fromBigDecimal(value));
  }

  get sHecCirculatingSupply(): BigDecimal {
    let value = this.get("sHecCirculatingSupply");
    return value!.toBigDecimal();
  }

  set sHecCirculatingSupply(value: BigDecimal) {
    this.set("sHecCirculatingSupply", Value.fromBigDecimal(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get hecPrice(): BigDecimal {
    let value = this.get("hecPrice");
    return value!.toBigDecimal();
  }

  set hecPrice(value: BigDecimal) {
    this.set("hecPrice", Value.fromBigDecimal(value));
  }

  get marketCap(): BigDecimal {
    let value = this.get("marketCap");
    return value!.toBigDecimal();
  }

  set marketCap(value: BigDecimal) {
    this.set("marketCap", Value.fromBigDecimal(value));
  }

  get totalValueLocked(): BigDecimal {
    let value = this.get("totalValueLocked");
    return value!.toBigDecimal();
  }

  set totalValueLocked(value: BigDecimal) {
    this.set("totalValueLocked", Value.fromBigDecimal(value));
  }

  get treasuryRiskFreeValue(): BigDecimal {
    let value = this.get("treasuryRiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryRiskFreeValue(value: BigDecimal) {
    this.set("treasuryRiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryMarketValue(): BigDecimal {
    let value = this.get("treasuryMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryMarketValue(value: BigDecimal) {
    this.set("treasuryMarketValue", Value.fromBigDecimal(value));
  }

  get treasuryInvestments(): BigDecimal {
    let value = this.get("treasuryInvestments");
    return value!.toBigDecimal();
  }

  set treasuryInvestments(value: BigDecimal) {
    this.set("treasuryInvestments", Value.fromBigDecimal(value));
  }

  get nextEpochRebase(): BigDecimal {
    let value = this.get("nextEpochRebase");
    return value!.toBigDecimal();
  }

  set nextEpochRebase(value: BigDecimal) {
    this.set("nextEpochRebase", Value.fromBigDecimal(value));
  }

  get nextDistributedHec(): BigDecimal {
    let value = this.get("nextDistributedHec");
    return value!.toBigDecimal();
  }

  set nextDistributedHec(value: BigDecimal) {
    this.set("nextDistributedHec", Value.fromBigDecimal(value));
  }

  get treasuryDaiRiskFreeValue(): BigDecimal {
    let value = this.get("treasuryDaiRiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryDaiRiskFreeValue(value: BigDecimal) {
    this.set("treasuryDaiRiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryUsdcRiskFreeValue(): BigDecimal {
    let value = this.get("treasuryUsdcRiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryUsdcRiskFreeValue(value: BigDecimal) {
    this.set("treasuryUsdcRiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryWFTMRiskFreeValue(): BigDecimal {
    let value = this.get("treasuryWFTMRiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryWFTMRiskFreeValue(value: BigDecimal) {
    this.set("treasuryWFTMRiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryMIMRiskFreeValue(): BigDecimal {
    let value = this.get("treasuryMIMRiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryMIMRiskFreeValue(value: BigDecimal) {
    this.set("treasuryMIMRiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryFRAXRiskFreeValue(): BigDecimal {
    let value = this.get("treasuryFRAXRiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryFRAXRiskFreeValue(value: BigDecimal) {
    this.set("treasuryFRAXRiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryGOHMRiskFreeValue(): BigDecimal {
    let value = this.get("treasuryGOHMRiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryGOHMRiskFreeValue(value: BigDecimal) {
    this.set("treasuryGOHMRiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryDaiMarketValue(): BigDecimal {
    let value = this.get("treasuryDaiMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryDaiMarketValue(value: BigDecimal) {
    this.set("treasuryDaiMarketValue", Value.fromBigDecimal(value));
  }

  get treasuryUsdcMarketValue(): BigDecimal {
    let value = this.get("treasuryUsdcMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryUsdcMarketValue(value: BigDecimal) {
    this.set("treasuryUsdcMarketValue", Value.fromBigDecimal(value));
  }

  get treasuryWFTMMarketValue(): BigDecimal {
    let value = this.get("treasuryWFTMMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryWFTMMarketValue(value: BigDecimal) {
    this.set("treasuryWFTMMarketValue", Value.fromBigDecimal(value));
  }

  get treasuryMIMMarketValue(): BigDecimal {
    let value = this.get("treasuryMIMMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryMIMMarketValue(value: BigDecimal) {
    this.set("treasuryMIMMarketValue", Value.fromBigDecimal(value));
  }

  get treasuryFRAXMarketValue(): BigDecimal {
    let value = this.get("treasuryFRAXMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryFRAXMarketValue(value: BigDecimal) {
    this.set("treasuryFRAXMarketValue", Value.fromBigDecimal(value));
  }

  get treasuryGOHMMarketValue(): BigDecimal {
    let value = this.get("treasuryGOHMMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryGOHMMarketValue(value: BigDecimal) {
    this.set("treasuryGOHMMarketValue", Value.fromBigDecimal(value));
  }

  get currentAPY(): BigDecimal {
    let value = this.get("currentAPY");
    return value!.toBigDecimal();
  }

  set currentAPY(value: BigDecimal) {
    this.set("currentAPY", Value.fromBigDecimal(value));
  }

  get runwayCurrent(): BigDecimal | null {
    let value = this.get("runwayCurrent");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set runwayCurrent(value: BigDecimal | null) {
    if (!value) {
      this.unset("runwayCurrent");
    } else {
      this.set("runwayCurrent", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get treasuryHecDaiPOL(): BigDecimal {
    let value = this.get("treasuryHecDaiPOL");
    return value!.toBigDecimal();
  }

  set treasuryHecDaiPOL(value: BigDecimal) {
    this.set("treasuryHecDaiPOL", Value.fromBigDecimal(value));
  }

  get treasuryHecUsdcPOL(): BigDecimal {
    let value = this.get("treasuryHecUsdcPOL");
    return value!.toBigDecimal();
  }

  set treasuryHecUsdcPOL(value: BigDecimal) {
    this.set("treasuryHecUsdcPOL", Value.fromBigDecimal(value));
  }

  get treasuryHecFraxPOL(): BigDecimal {
    let value = this.get("treasuryHecFraxPOL");
    return value!.toBigDecimal();
  }

  set treasuryHecFraxPOL(value: BigDecimal) {
    this.set("treasuryHecFraxPOL", Value.fromBigDecimal(value));
  }

  get treasuryBOORiskFreeValue(): BigDecimal {
    let value = this.get("treasuryBOORiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryBOORiskFreeValue(value: BigDecimal) {
    this.set("treasuryBOORiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryBOOMarketValue(): BigDecimal {
    let value = this.get("treasuryBOOMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryBOOMarketValue(value: BigDecimal) {
    this.set("treasuryBOOMarketValue", Value.fromBigDecimal(value));
  }

  get treasuryCRVRiskFreeValue(): BigDecimal {
    let value = this.get("treasuryCRVRiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryCRVRiskFreeValue(value: BigDecimal) {
    this.set("treasuryCRVRiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryCRVMarketValue(): BigDecimal {
    let value = this.get("treasuryCRVMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryCRVMarketValue(value: BigDecimal) {
    this.set("treasuryCRVMarketValue", Value.fromBigDecimal(value));
  }

  get treasuryWETHRiskFreeValue(): BigDecimal {
    let value = this.get("treasuryWETHRiskFreeValue");
    return value!.toBigDecimal();
  }

  set treasuryWETHRiskFreeValue(value: BigDecimal) {
    this.set("treasuryWETHRiskFreeValue", Value.fromBigDecimal(value));
  }

  get treasuryWETHMarketValue(): BigDecimal {
    let value = this.get("treasuryWETHMarketValue");
    return value!.toBigDecimal();
  }

  set treasuryWETHMarketValue(value: BigDecimal) {
    this.set("treasuryWETHMarketValue", Value.fromBigDecimal(value));
  }
}

export class LastBlock extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("number", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LastBlock entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save LastBlock entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("LastBlock", id.toString(), this);
    }
  }

  static load(id: string): LastBlock | null {
    return changetype<LastBlock | null>(store.get("LastBlock", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get number(): BigInt {
    let value = this.get("number");
    return value!.toBigInt();
  }

  set number(value: BigInt) {
    this.set("number", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
