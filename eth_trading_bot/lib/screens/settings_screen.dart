import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/trading_provider.dart';
import '../providers/auth_provider.dart';
import '../config/constants.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  late TextEditingController _capitalController;
  late TextEditingController _riskController;
  late TextEditingController _slippageController;

  @override
  void initState() {
    super.initState();
    final trading = context.read<TradingProvider>();
    _capitalController = TextEditingController(text: trading.capital.toString());
    _riskController = TextEditingController(text: trading.riskPercent.toString());
    _slippageController = TextEditingController(text: trading.maxSlippagePct.toString());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: Consumer2<TradingProvider, AuthProvider>(
        builder: (context, trading, auth, _) {
          return ListView(
            padding: const EdgeInsets.all(16.0),
            children: [
              _buildSection('Trading Parameters'),
              _buildSymbolSelector(trading),
              const SizedBox(height: 16),
              _buildCapitalInput(trading),
              const SizedBox(height: 16),
              _buildRiskInput(trading),
              const SizedBox(height: 16),
              _buildSlippageInput(trading),
              const SizedBox(height: 32),
              _buildSection('Account'),
              _buildAccountInfo(auth),
              const SizedBox(height: 32),
              _buildSection('Data Management'),
              _buildExportButton(trading),
              const SizedBox(height: 16),
              _buildClearDataButton(auth),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSection(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Text(
        title,
        style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildSymbolSelector(TradingProvider trading) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Trading Pair', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            DropdownButton<String>(
              value: trading.selectedSymbol,
              isExpanded: true,
              items: BinanceConfig.allowedPairs.map((symbol) {
                return DropdownMenuItem(
                  value: symbol,
                  child: Text(symbol),
                );
              }).toList(),
              onChanged: trading.isTradingActive
                  ? null
                  : (value) {
                      if (value != null) {
                        try {
                          trading.setSymbol(value);
                        } catch (e) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text(e.toString())),
                          );
                        }
                      }
                    },
            ),
            if (trading.isTradingActive)
              const Text(
                'Cannot change symbol while trading is active',
                style: TextStyle(fontSize: 12, color: Colors.orange),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildCapitalInput(TradingProvider trading) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Trading Capital (₹)', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            TextField(
              controller: _capitalController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                hintText: 'Min: ${TradingConfig.minCapital}, Max: ${TradingConfig.maxCapital}',
                border: const OutlineInputBorder(),
              ),
              enabled: !trading.isTradingActive,
              onSubmitted: (value) {
                try {
                  trading.setCapital(double.parse(value));
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Capital updated')),
                  );
                } catch (e) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(e.toString())),
                  );
                }
              },
            ),
            const SizedBox(height: 8),
            Text(
              'Current: ₹${trading.capital.toStringAsFixed(2)}',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRiskInput(TradingProvider trading) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Risk Per Trade (%)', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            TextField(
              controller: _riskController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                hintText: 'Min: ${TradingConfig.minRiskPercent}, Max: ${TradingConfig.maxRiskPercent}',
                border: const OutlineInputBorder(),
              ),
              enabled: !trading.isTradingActive,
              onSubmitted: (value) {
                try {
                  trading.setRiskPercent(double.parse(value));
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Risk updated')),
                  );
                } catch (e) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(e.toString())),
                  );
                }
              },
            ),
            const SizedBox(height: 8),
            Text(
              'Current: ${trading.riskPercent.toStringAsFixed(2)}%',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSlippageInput(TradingProvider trading) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Max Slippage (%)', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            TextField(
              controller: _slippageController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                hintText: 'Maximum allowed slippage',
                border: OutlineInputBorder(),
              ),
              enabled: !trading.isTradingActive,
              onSubmitted: (value) {
                trading.setMaxSlippage(double.parse(value));
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Slippage limit updated')),
                );
              },
            ),
            const SizedBox(height: 8),
            Text(
              'Current: ${trading.maxSlippagePct.toStringAsFixed(2)}%',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAccountInfo(AuthProvider auth) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildInfoRow('API Key ID', auth.apiKeyId ?? 'Not set'),
            const Divider(),
            _buildInfoRow('Live Mode', auth.isLiveModeEnabled ? 'Enabled' : 'Disabled'),
            const Divider(),
            _buildInfoRow('Authentication', auth.isAuthenticated ? 'Active' : 'Inactive'),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.grey)),
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildExportButton(TradingProvider trading) {
    return ElevatedButton.icon(
      onPressed: () {
        final csv = trading.exportTradesToCSV();
        // In a real app, save this to a file or share it
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Exported ${trading.closedPositions.length} trades')),
        );
      },
      icon: const Icon(Icons.download),
      label: const Text('Export Trade History (CSV)'),
    );
  }

  Widget _buildClearDataButton(AuthProvider auth) {
    return ElevatedButton.icon(
      onPressed: () async {
        final confirm = await showDialog<bool>(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Clear All Data'),
            content: const Text(
              'This will delete all credentials and trading data. This action cannot be undone.',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context, false),
                child: const Text('Cancel'),
              ),
              TextButton(
                onPressed: () => Navigator.pop(context, true),
                child: const Text('DELETE', style: TextStyle(color: Colors.red)),
              ),
            ],
          ),
        );

        if (confirm == true) {
          await auth.clearAllCredentials();
          if (mounted) {
            Navigator.pushNamedAndRemoveUntil(context, '/onboarding', (route) => false);
          }
        }
      },
      icon: const Icon(Icons.delete_forever),
      label: const Text('Clear All Data (Factory Reset)'),
      style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
    );
  }

  @override
  void dispose() {
    _capitalController.dispose();
    _riskController.dispose();
    _slippageController.dispose();
    super.dispose();
  }
}
