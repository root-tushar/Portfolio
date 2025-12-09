class Position {
  final String symbol;
  final String side; // LONG or SHORT
  final double entryPrice;
  final double quantity;
  final DateTime entryTime;
  
  double? exitPrice;
  DateTime? exitTime;

  Position({
    required this.symbol,
    required this.side,
    required this.entryPrice,
    required this.quantity,
    required this.entryTime,
    this.exitPrice,
    this.exitTime,
  });

  bool get isOpen => exitPrice == null;
  
  double get unrealizedPnL {
    if (exitPrice == null) return 0.0;
    return (exitPrice! - entryPrice) * quantity;
  }
  
  double get unrealizedPnLPercent {
    if (exitPrice == null) return 0.0;
    return ((exitPrice! - entryPrice) / entryPrice) * 100;
  }
  
  double calculateCurrentPnL(double currentPrice) {
    return (currentPrice - entryPrice) * quantity;
  }
  
  double calculateCurrentPnLPercent(double currentPrice) {
    return ((currentPrice - entryPrice) / entryPrice) * 100;
  }

  Map<String, dynamic> toJson() {
    return {
      'symbol': symbol,
      'side': side,
      'entryPrice': entryPrice,
      'quantity': quantity,
      'entryTime': entryTime.toIso8601String(),
      'exitPrice': exitPrice,
      'exitTime': exitTime?.toIso8601String(),
    };
  }

  factory Position.fromJson(Map<String, dynamic> json) {
    return Position(
      symbol: json['symbol'],
      side: json['side'],
      entryPrice: json['entryPrice'],
      quantity: json['quantity'],
      entryTime: DateTime.parse(json['entryTime']),
      exitPrice: json['exitPrice'],
      exitTime: json['exitTime'] != null ? DateTime.parse(json['exitTime']) : null,
    );
  }
}
