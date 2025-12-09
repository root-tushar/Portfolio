enum TradeSignal {
  buy,
  sell,
  hold,
}

extension TradeSignalExtension on TradeSignal {
  String get displayName {
    switch (this) {
      case TradeSignal.buy:
        return 'BUY';
      case TradeSignal.sell:
        return 'SELL';
      case TradeSignal.hold:
        return 'HOLD';
    }
  }
  
  String get emoji {
    switch (this) {
      case TradeSignal.buy:
        return '🟢';
      case TradeSignal.sell:
        return '🔴';
      case TradeSignal.hold:
        return '⚪';
    }
  }
}
