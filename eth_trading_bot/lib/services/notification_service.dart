import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:logger/logger.dart';

class NotificationService {
  static final Logger _logger = Logger();

  static Future<void> initialize(FlutterLocalNotificationsPlugin plugin) async {
    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosSettings = DarwinInitializationSettings();
    
    const initSettings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );

    await plugin.initialize(initSettings);
    _logger.i('Notification service initialized');
  }

  static Future<void> showNotification({
    required FlutterLocalNotificationsPlugin plugin,
    required String title,
    required String body,
    int id = 0,
  }) async {
    const androidDetails = AndroidNotificationDetails(
      'trading_bot_channel',
      'Trading Bot Notifications',
      channelDescription: 'Notifications for trading bot events',
      importance: Importance.high,
      priority: Priority.high,
    );

    const iosDetails = DarwinNotificationDetails();

    const details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );

    await plugin.show(id, title, body, details);
  }

  static Future<void> showTradeNotification({
    required FlutterLocalNotificationsPlugin plugin,
    required String action,
    required String symbol,
    required double price,
    required double quantity,
  }) async {
    await showNotification(
      plugin: plugin,
      title: '🔔 Trade Executed',
      body: '$action $quantity $symbol @ \$$price',
      id: DateTime.now().millisecondsSinceEpoch % 100000,
    );
  }

  static Future<void> showErrorNotification({
    required FlutterLocalNotificationsPlugin plugin,
    required String error,
  }) async {
    await showNotification(
      plugin: plugin,
      title: '⚠️ Trading Error',
      body: error,
      id: DateTime.now().millisecondsSinceEpoch % 100000,
    );
  }

  static Future<void> showSlippageAlert({
    required FlutterLocalNotificationsPlugin plugin,
    required double slippage,
  }) async {
    await showNotification(
      plugin: plugin,
      title: '⚠️ High Slippage Detected',
      body: 'Slippage: ${slippage.toStringAsFixed(2)}%',
      id: DateTime.now().millisecondsSinceEpoch % 100000,
    );
  }
}
