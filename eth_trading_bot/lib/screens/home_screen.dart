import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../providers/trading_provider.dart';
import '../providers/auth_provider.dart';
import '../config/constants.dart';
import 'settings_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ETH Trading Bot'),
        actions: [
          Consumer<TradingProvider>(
            builder: (context, trading, _) => Chip(
              label: Text(trading.isLiveMode ? 'LIVE' : 'PAPER'),
              backgroundColor: trading.isLiveMode ? Colors.red : Colors.green,
            ),
          ),
          const SizedBox(width: 8),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const SettingsScreen()),
              );
            },
          ),
        ],
      ),
      body: Consumer<TradingProvider>(
        builder: (context, trading, _) {
          return SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildPriceCard(trading),
                const SizedBox(height: 16),
                _buildEMACard(trading),
                const SizedBox(height: 16),
                _buildSignalCard(trading),
                const SizedBox(height: 16),
                _buildPositionCard(trading),
                const SizedBox(height: 16),
                _buildPnLCard(trading),
                const SizedBox(height: 16),
                _buildControlButtons(context, trading),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildPriceCard(TradingProvider trading) {
    final formatter = NumberFormat.currency(symbol: '\$', decimalDigits: 2);
    
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              trading.selectedSymbol,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              trading.currentPrice != null
                  ? formatter.format(trading.currentPrice)
                  : 'Loading...',
              style: const TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(
                  Icons.circle,
                  size: 12,
                  color: trading.currentPrice != null ? Colors.green : Colors.grey,
                ),
                const SizedBox(width: 8),
                Text(
                  trading.currentPrice != null ? 'Live' : 'Connecting...',
                  style: const TextStyle(fontSize: 14, color: Colors.grey),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEMACard(TradingProvider trading) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Exponential Moving Averages',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildEMAIndicator('EMA 9', trading.ema9, Colors.blue),
                _buildEMAIndicator('EMA 34', trading.ema34, Colors.orange),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEMAIndicator(String label, double? value, Color color) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(fontSize: 14, color: color, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Text(
          value != null ? '\$${value.toStringAsFixed(2)}' : '--',
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildSignalCard(TradingProvider trading) {
    final signal = trading.currentSignal;
    
    return Card(
      color: signal.displayName == 'BUY'
          ? Colors.green.shade900.withOpacity(0.3)
          : signal.displayName == 'SELL'
              ? Colors.red.shade900.withOpacity(0.3)
              : null,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Current Signal',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Row(
              children: [
                Text(
                  signal.emoji,
                  style: const TextStyle(fontSize: 24),
                ),
                const SizedBox(width: 8),
                Text(
                  signal.displayName,
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPositionCard(TradingProvider trading) {
    final position = trading.activePosition;
    
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Active Position',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            if (position != null) ...[
              _buildPositionRow('Symbol', position.symbol),
              _buildPositionRow('Side', position.side),
              _buildPositionRow('Entry Price', '\$${position.entryPrice.toStringAsFixed(2)}'),
              _buildPositionRow('Quantity', position.quantity.toStringAsFixed(6)),
              _buildPositionRow('Entry Time', DateFormat('MMM dd, HH:mm').format(position.entryTime)),
              if (trading.currentPrice != null) ...[
                const Divider(),
                _buildPositionRow(
                  'Current P&L',
                  '\$${position.calculateCurrentPnL(trading.currentPrice!).toStringAsFixed(2)}',
                  valueColor: position.calculateCurrentPnL(trading.currentPrice!) >= 0
                      ? Colors.green
                      : Colors.red,
                ),
                _buildPositionRow(
                  'P&L %',
                  '${position.calculateCurrentPnLPercent(trading.currentPrice!).toStringAsFixed(2)}%',
                  valueColor: position.calculateCurrentPnLPercent(trading.currentPrice!) >= 0
                      ? Colors.green
                      : Colors.red,
                ),
              ],
            ] else
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text('No active position', style: TextStyle(color: Colors.grey)),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildPositionRow(String label, String value, {Color? valueColor}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.grey)),
          Text(
            value,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: valueColor,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPnLCard(TradingProvider trading) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Performance',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatColumn(
                  'Total P&L',
                  '\$${trading.totalPnL.toStringAsFixed(2)}',
                  trading.totalPnL >= 0 ? Colors.green : Colors.red,
                ),
                _buildStatColumn(
                  'Closed Trades',
                  trading.closedPositions.length.toString(),
                  Colors.blue,
                ),
                _buildStatColumn(
                  'Capital',
                  '₹${trading.capital.toStringAsFixed(0)}',
                  Colors.orange,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatColumn(String label, String value, Color color) {
    return Column(
      children: [
        Text(
          label,
          style: const TextStyle(fontSize: 14, color: Colors.grey),
        ),
        const SizedBox(height: 8),
        Text(
          value,
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
      ],
    );
  }

  Widget _buildControlButtons(BuildContext context, TradingProvider trading) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: trading.isTradingActive
                ? null
                : () async {
                    try {
                      await trading.startTrading();
                      if (context.mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Trading started')),
                        );
                      }
                    } catch (e) {
                      if (context.mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Failed to start: $e')),
                        );
                      }
                    }
                  },
            icon: const Icon(Icons.play_arrow),
            label: const Text('Start Trading'),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green,
              padding: const EdgeInsets.all(16),
            ),
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: trading.isTradingActive
                ? () {
                    trading.stopTrading();
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Trading stopped')),
                    );
                  }
                : null,
            icon: const Icon(Icons.stop),
            label: const Text('Stop Trading'),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.orange,
              padding: const EdgeInsets.all(16),
            ),
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: () async {
              final confirm = await showDialog<bool>(
                context: context,
                builder: (context) => AlertDialog(
                  title: const Text('Emergency Stop'),
                  content: const Text(
                    'This will cancel all open orders and stop trading immediately. Continue?',
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context, false),
                      child: const Text('Cancel'),
                    ),
                    TextButton(
                      onPressed: () => Navigator.pop(context, true),
                      child: const Text('STOP', style: TextStyle(color: Colors.red)),
                    ),
                  ],
                ),
              );
              
              if (confirm == true) {
                try {
                  await trading.emergencyStop();
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('🚨 Emergency stop executed')),
                    );
                  }
                } catch (e) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Emergency stop failed: $e')),
                    );
                  }
                }
              }
            },
            icon: const Icon(Icons.emergency),
            label: const Text('EMERGENCY STOP'),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              padding: const EdgeInsets.all(16),
            ),
          ),
        ),
      ],
    );
  }
}
