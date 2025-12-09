class Order {
  final String symbol;
  final int orderId;
  final String clientOrderId;
  final String price;
  final String origQty;
  final String executedQty;
  final String status;
  final String type;
  final String side;
  final int transactTime;

  Order({
    required this.symbol,
    required this.orderId,
    required this.clientOrderId,
    required this.price,
    required this.origQty,
    required this.executedQty,
    required this.status,
    required this.type,
    required this.side,
    required this.transactTime,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      symbol: json['symbol'] ?? '',
      orderId: json['orderId'] ?? 0,
      clientOrderId: json['clientOrderId'] ?? '',
      price: json['price']?.toString() ?? '0',
      origQty: json['origQty']?.toString() ?? '0',
      executedQty: json['executedQty']?.toString() ?? '0',
      status: json['status'] ?? '',
      type: json['type'] ?? '',
      side: json['side'] ?? '',
      transactTime: json['transactTime'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'symbol': symbol,
      'orderId': orderId,
      'clientOrderId': clientOrderId,
      'price': price,
      'origQty': origQty,
      'executedQty': executedQty,
      'status': status,
      'type': type,
      'side': side,
      'transactTime': transactTime,
    };
  }
}
