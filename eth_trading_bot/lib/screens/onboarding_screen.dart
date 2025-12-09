import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  
  final TextEditingController _apiKeyIdController = TextEditingController();
  final TextEditingController _privateKeyController = TextEditingController();
  final TextEditingController _sessionTokenController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Setup Trading Bot'),
      ),
      body: PageView(
        controller: _pageController,
        onPageChanged: (page) => setState(() => _currentPage = page),
        children: [
          _buildWelcomePage(),
          _buildEd25519InstructionsPage(),
          _buildCredentialsInputPage(),
          _buildSessionTokenPage(),
        ],
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            if (_currentPage > 0)
              TextButton(
                onPressed: () => _pageController.previousPage(
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeInOut,
                ),
                child: const Text('Back'),
              )
            else
              const SizedBox(),
            ElevatedButton(
              onPressed: _currentPage == 3 ? _completeSetup : () {
                _pageController.nextPage(
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeInOut,
                );
              },
              child: Text(_currentPage == 3 ? 'Complete Setup' : 'Next'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildWelcomePage() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.security,
            size: 100,
            color: Theme.of(context).colorScheme.primary,
          ),
          const SizedBox(height: 32),
          const Text(
            'Welcome to ETH Trading Bot',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          const Text(
            'This bot trades Ethereum pairs (ETH/INR, ETH/EUR, ETH/USDT) on Binance using secure Ed25519 authentication.',
            style: TextStyle(fontSize: 16),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 32),
          const Card(
            child: Padding(
              padding: EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('✅ Ed25519 authentication only', style: TextStyle(fontSize: 14)),
                  SizedBox(height: 8),
                  Text('✅ Capital limits: ₹1,000 - ₹10,000', style: TextStyle(fontSize: 14)),
                  SizedBox(height: 8),
                  Text('✅ EMA(9)/EMA(34) strategy', style: TextStyle(fontSize: 14)),
                  SizedBox(height: 8),
                  Text('✅ 24/7 automated trading', style: TextStyle(fontSize: 14)),
                  SizedBox(height: 8),
                  Text('✅ Secure local key storage', style: TextStyle(fontSize: 14)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEd25519InstructionsPage() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Generate Ed25519 API Keys',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          const Text(
            'Follow these steps to create Ed25519 keys on Binance:',
            style: TextStyle(fontSize: 16),
          ),
          const SizedBox(height: 24),
          _buildStep('1', 'Log in to Binance', 'Go to binance.com and log in to your account'),
          _buildStep('2', 'Navigate to API Management', 'Account → API Management'),
          _buildStep('3', 'Create API Key', 'Click "Create API" and choose "System generated"'),
          _buildStep('4', 'Select Ed25519', 'Choose Ed25519 as the key type (NOT HMAC)'),
          _buildStep('5', 'Set Permissions', 'Enable "Enable Spot & Margin Trading"'),
          _buildStep('6', 'Save Keys', 'Copy your API Key ID and Private Key'),
          const SizedBox(height: 24),
          Card(
            color: Colors.orange.shade900.withOpacity(0.3),
            child: const Padding(
              padding: EdgeInsets.all(16.0),
              child: Row(
                children: [
                  Icon(Icons.warning, color: Colors.orange),
                  SizedBox(width: 16),
                  Expanded(
                    child: Text(
                      'IMPORTANT: This app only accepts Ed25519 keys. HMAC keys will be rejected for live trading.',
                      style: TextStyle(fontSize: 14),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: () {
              Clipboard.setData(const ClipboardData(text: 'https://www.binance.com/en/my/settings/api-management'));
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Binance API URL copied to clipboard')),
              );
            },
            icon: const Icon(Icons.copy),
            label: const Text('Copy Binance API URL'),
          ),
        ],
      ),
    );
  }

  Widget _buildStep(String number, String title, String description) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 16,
            child: Text(number),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: const TextStyle(fontSize: 14, color: Colors.grey),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCredentialsInputPage() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Enter Your Ed25519 Credentials',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 24),
          TextField(
            controller: _apiKeyIdController,
            decoration: const InputDecoration(
              labelText: 'API Key ID',
              hintText: 'Your Binance API Key ID',
              border: OutlineInputBorder(),
              prefixIcon: Icon(Icons.key),
            ),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _privateKeyController,
            decoration: const InputDecoration(
              labelText: 'Private Key (Base64 or Hex)',
              hintText: 'Your Ed25519 private key',
              border: OutlineInputBorder(),
              prefixIcon: Icon(Icons.lock),
            ),
            maxLines: 3,
            obscureText: true,
          ),
          const SizedBox(height: 24),
          Card(
            color: Colors.blue.shade900.withOpacity(0.3),
            child: const Padding(
              padding: EdgeInsets.all(16.0),
              child: Row(
                children: [
                  Icon(Icons.info, color: Colors.blue),
                  SizedBox(width: 16),
                  Expanded(
                    child: Text(
                      'Your private key will be encrypted and stored securely on your device. It will never be transmitted to any server.',
                      style: TextStyle(fontSize: 14),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSessionTokenPage() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Session Token (Optional)',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          const Text(
            'To enable live trading, you need a session token from the administrator.',
            style: TextStyle(fontSize: 16),
          ),
          const SizedBox(height: 24),
          TextField(
            controller: _sessionTokenController,
            decoration: const InputDecoration(
              labelText: 'Session Token',
              hintText: 'Enter session token (optional)',
              border: OutlineInputBorder(),
              prefixIcon: Icon(Icons.token),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'You can skip this step and add the session token later in settings. Without a session token, you can only use paper trading mode.',
            style: TextStyle(fontSize: 14, color: Colors.grey),
          ),
        ],
      ),
    );
  }

  Future<void> _completeSetup() async {
    try {
      final authProvider = context.read<AuthProvider>();
      
      // Validate inputs
      if (_apiKeyIdController.text.isEmpty || _privateKeyController.text.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please enter API Key ID and Private Key')),
        );
        return;
      }
      
      // Parse private key
      Uint8List privateKey;
      try {
        // Try base64 first
        privateKey = base64Decode(_privateKeyController.text.trim());
      } catch (e) {
        // Try hex
        final hex = _privateKeyController.text.trim().replaceAll(' ', '');
        privateKey = Uint8List.fromList(
          List.generate(hex.length ~/ 2, (i) => int.parse(hex.substring(i * 2, i * 2 + 2), radix: 16)),
        );
      }
      
      // Validate Ed25519 key
      if (!authProvider.validateKeyType(privateKey)) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Invalid Ed25519 key. Must be 32 bytes.')),
        );
        return;
      }
      
      // Store credentials
      await authProvider.storeCredentials(
        apiKeyId: _apiKeyIdController.text.trim(),
        privateKey: privateKey,
      );
      
      // Store session token if provided
      if (_sessionTokenController.text.isNotEmpty) {
        await authProvider.storeSessionToken(_sessionTokenController.text.trim());
      }
      
      if (!mounted) return;
      
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Setup complete!')),
      );
      
      Navigator.pushReplacementNamed(context, '/auth');
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Setup failed: $e')),
      );
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    _apiKeyIdController.dispose();
    _privateKeyController.dispose();
    _sessionTokenController.dispose();
    super.dispose();
  }
}
