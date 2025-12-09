import 'dart:typed_data';
import 'package:flutter/foundation.dart';
import 'package:logger/logger.dart';
import '../services/secure_storage_service.dart';
import '../services/session_auth_service.dart';

class AuthProvider with ChangeNotifier {
  final Logger _logger = Logger();
  final SecureStorageService _secureStorage = SecureStorageService();
  final SessionAuthService _sessionAuth = SessionAuthService();

  bool _isAuthenticated = false;
  bool _hasCredentials = false;
  bool _isLiveModeEnabled = false;
  String? _apiKeyId;
  Uint8List? _privateKey;
  String? _sessionToken;

  bool get isAuthenticated => _isAuthenticated;
  bool get hasCredentials => _hasCredentials;
  bool get isLiveModeEnabled => _isLiveModeEnabled;
  String? get apiKeyId => _apiKeyId;
  Uint8List? get privateKey => _privateKey;

  // Initialize and check for existing credentials
  Future<void> initialize() async {
    try {
      _hasCredentials = await _secureStorage.hasCredentials();
      if (_hasCredentials) {
        _apiKeyId = await _secureStorage.getApiKeyId();
        _sessionToken = await _secureStorage.getSessionToken();
        
        // Verify session token if exists
        if (_sessionToken != null) {
          final isValid = await _sessionAuth.verifySessionToken(_sessionToken!);
          _isLiveModeEnabled = isValid;
        }
      }
      notifyListeners();
    } catch (e) {
      _logger.e('Failed to initialize auth: $e');
    }
  }

  // Authenticate with biometric/PIN
  Future<bool> authenticate() async {
    try {
      final success = await _secureStorage.authenticate();
      if (success) {
        _isAuthenticated = true;
        _privateKey = await _secureStorage.getPrivateKey();
        notifyListeners();
      }
      return success;
    } catch (e) {
      _logger.e('Authentication failed: $e');
      return false;
    }
  }

  // Store Ed25519 credentials
  Future<void> storeCredentials({
    required String apiKeyId,
    required Uint8List privateKey,
  }) async {
    try {
      await _secureStorage.storeApiKeyId(apiKeyId);
      await _secureStorage.storePrivateKey(privateKey);
      
      _apiKeyId = apiKeyId;
      _privateKey = privateKey;
      _hasCredentials = true;
      
      notifyListeners();
      _logger.i('Credentials stored successfully');
    } catch (e) {
      _logger.e('Failed to store credentials: $e');
      rethrow;
    }
  }

  // Store session token
  Future<void> storeSessionToken(String token) async {
    try {
      // Verify token with server
      final isValid = await _sessionAuth.verifySessionToken(token);
      if (!isValid) {
        throw Exception('Invalid session token');
      }
      
      await _secureStorage.storeSessionToken(token);
      _sessionToken = token;
      _isLiveModeEnabled = true;
      
      notifyListeners();
      _logger.i('Session token stored and verified');
    } catch (e) {
      _logger.e('Failed to store session token: $e');
      rethrow;
    }
  }

  // Refresh session token
  Future<void> refreshSessionToken() async {
    try {
      if (_sessionToken == null) return;
      
      final newToken = await _sessionAuth.refreshSessionToken(_sessionToken!);
      if (newToken != null) {
        await _secureStorage.storeSessionToken(newToken);
        _sessionToken = newToken;
        _logger.i('Session token refreshed');
      }
    } catch (e) {
      _logger.e('Failed to refresh session token: $e');
    }
  }

  // Validate Ed25519 key type (ensure not HMAC)
  bool validateKeyType(Uint8List privateKey) {
    // Ed25519 private keys are 32 bytes
    if (privateKey.length != 32) {
      _logger.e('Invalid Ed25519 key length: ${privateKey.length}');
      return false;
    }
    return true;
  }

  // Logout
  Future<void> logout() async {
    _isAuthenticated = false;
    _privateKey = null;
    notifyListeners();
  }

  // Clear all credentials (factory reset)
  Future<void> clearAllCredentials() async {
    try {
      await _secureStorage.clearAll();
      _isAuthenticated = false;
      _hasCredentials = false;
      _isLiveModeEnabled = false;
      _apiKeyId = null;
      _privateKey = null;
      _sessionToken = null;
      
      notifyListeners();
      _logger.w('All credentials cleared');
    } catch (e) {
      _logger.e('Failed to clear credentials: $e');
      rethrow;
    }
  }
}
