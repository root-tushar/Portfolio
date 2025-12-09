class AccountInfo {
  final double makerCommission;
  final double takerCommission;
  final double buyerCommission;
  final double sellerCommission;
  final bool canTrade;
  final bool canWithdraw;
  final bool canDeposit;
  final List<Balance> balances;

  AccountInfo({
    required this.makerCommission,
    required this.takerCommission,
    required this.buyerCommission,
    required this.sellerCommission,
    required this.canTrade,
    required this.canWithdraw,
    required this.canDeposit,
    required this.balances,
  });

  factory AccountInfo.fromJson(Map<String, dynamic> json) {
    return AccountInfo(
      makerCommission: (json['makerCommission'] ?? 0).toDouble(),
      takerCommission: (json['takerCommission'] ?? 0).toDouble(),
      buyerCommission: (json['buyerCommission'] ?? 0).toDouble(),
      sellerCommission: (json['sellerCommission'] ?? 0).toDouble(),
      canTrade: json['canTrade'] ?? false,
      canWithdraw: json['canWithdraw'] ?? false,
      canDeposit: json['canDeposit'] ?? false,
      balances: (json['balances'] as List?)
              ?.map((b) => Balance.fromJson(b))
              .toList() ??
          [],
    );
  }
}

class Balance {
  final String asset;
  final double free;
  final double locked;

  Balance({
    required this.asset,
    required this.free,
    required this.locked,
  });

  factory Balance.fromJson(Map<String, dynamic> json) {
    return Balance(
      asset: json['asset'] ?? '',
      free: double.tryParse(json['free']?.toString() ?? '0') ?? 0.0,
      locked: double.tryParse(json['locked']?.toString() ?? '0') ?? 0.0,
    );
  }

  double get total => free + locked;
}
