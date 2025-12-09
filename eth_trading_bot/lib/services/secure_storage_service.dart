import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:local_auth/local_auth.dart';
import 'package:crypto/crypto.dart';
import 'package:logger/logger.dart';
import '../config/constants.dart';

class SecureStorageService {
  final Logger _logger = Logger();
  final FlutterSecureStorage _storage = const FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
    iOptions: IOSOptions(accessibility: KeychainAccessibility.first_unlock),
  );
  final LocalAuthentication _localAuth = LocalAuthentication();

  // Check if biometric authentication is available
  Future<bool> isBiometricAvailable() async {
    try {
      return await _localAuth.canCheckBiometrics;
    } catch (e) {
      _logger.e('Biometric check failed: $e');
      return false;
    }
  }

  // Authenticate with biometric or PIN
  Future<bool> authenticate() async {
    try {
      final canAuth = await isBiometricAvailable();
      if (!canAuth) {
        _logger.w('Biometric authentication not available');
        return false;
      }

      return await _localAuth.authenticate(
        localizedReason: SecurityConfig.biometricReason,
        options: const AuthenticationOptions(
          stickyAuth: true,
          biometricOnly: false,
        ),
      );
    } catch (e) {
      _logger.e('Authentication failed: $e');
      return false;
    }
  }

  // Store Ed25519 private key
  Future<void> storePrivateKey(Uint8List privateKey) async {
    try {
      final authenticated = await authenticate();
      if (!authenticated) {
        throw Exception('Authentication required to store private key');
      }

      final base64Key = base64Encode(privateKey);
      await _storage.write(
        key: SecurityConfig.privateKeyStorageKey,
        value: base64Key,
      );
      
      _logger.i('Private key stored securely');
    } catch (e) {
      _logger.e('Failed to store private key: $e');
      rethrow;
    }
  }

  // Retrieve Ed25519 private key
  Future<Uint8List?> getPrivateKey() async {
    try {
      final authenticated = await authenticate();
      if (!authenticated) {
        throw Exception('Authentication required to access private key');
      }

      final base64Key = await _storage.read(key: SecurityConfig.privateKeyStorageKey);
      if (base64Key == null) return null;

      return base64Decode(base64Key);
    } catch (e) {
      _logger.e('Failed to retrieve private key: $e');
      rethrow;
    }
  }

  // Store API key ID
  Future<void> storeApiKeyId(String apiKeyId) async {
    try {
      await _storage.write(
        key: SecurityConfig.apiKeyIdStorageKey,
        value: apiKeyId,
      );
      _logger.i('API key ID stored');
    } catch (e) {
      _logger.e('Failed to store API key ID: $e');
      rethrow;
    }
  }

  // Retrieve API key ID
  Future<String?> getApiKeyId() async {
    try {
      return await _storage.read(key: SecurityConfig.apiKeyIdStorageKey);
    } catch (e) {
      _logger.e('Failed to retrieve API key ID: $e');
      rethrow;
    }
  }

  // Store session token
  Future<void> storeSessionToken(String sessionToken) async {
    try {
      await _storage.write(
        key: SecurityConfig.sessionTokenStorageKey,
        value: sessionToken,
      );
      _logger.i('Session token stored');
    } catch (e) {
      _logger.e('Failed to store session token: $e');
      rethrow;
    }
  }

  // Retrieve session token
  Future<String?> getSessionToken() async {
    try {
      return await _storage.read(key: SecurityConfig.sessionTokenStorageKey);
    } catch (e) {
      _logger.e('Failed to retrieve session token: $e');
      rethrow;
    }
  }

  // Store PIN hash
  Future<void> storePinHash(String pin) async {
    try {
      final hash = sha256.convert(utf8.encode(pin)).toString();
      await _storage.write(
        key: SecurityConfig.pinHashStorageKey,
        value: hash,
      );
      _logger.i('PIN hash stored');
    } catch (e) {
      _logger.e('Failed to store PIN hash: $e');
      rethrow;
    }
  }

  // Verify PIN
  Future<bool> verifyPin(String pin) async {
    try {
      final storedHash = await _storage.read(key: SecurityConfig.pinHashStorageKey);
      if (storedHash == null) return false;

      final inputHash = sha256.convert(utf8.encode(pin)).toString();
      return storedHash == inputHash;
    } catch (e) {
      _logger.e('Failed to verify PIN: $e');
      return false;
    }
  }

  // Check if credentials exist
  Future<bool> hasCredentials() async {
    try {
      final apiKeyId = await getApiKeyId();
      final privateKey = await _storage.read(key: SecurityConfig.privateKeyStorageKey);
      return apiKeyId != null && privateKey != null;
    } catch (e) {
      _logger.e('Failed to check credentials: $e');
      return false;
    }
  }

  // Clear all stored data (factory reset)
  Future<void> clearAll() async {
    try {
      await _storage.deleteAll();
      _logger.w('All secure storage cleared');
    } catch (e) {
      _logger.e('Failed to clear storage: $e');
      rethrow;
    }
  }

  // Delete specific key
  Future<void> deleteKey(String key) async {
    try {
      await _storage.delete(key: key);
    } catch (e) {
      _logger.e('Failed to delete key: $e');
      rethrow;
    }
  }
}
