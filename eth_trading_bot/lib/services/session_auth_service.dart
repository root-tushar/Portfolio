import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:logger/logger.dart';
import '../config/constants.dart';

class SessionAuthService {
  final Logger _logger = Logger();
  
  // Verify session token with server
  Future<bool> verifySessionToken(String sessionToken) async {
    try {
      final url = Uri.parse('${AppConfig.serverBaseUrl}${AppConfig.verifySessionEndpoint}');
      
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'session_token': sessionToken}),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['valid'] == true;
      } else {
        _logger.e('Session verification failed: ${response.statusCode}');
        return false;
      }
    } catch (e) {
      _logger.e('Session verification error: $e');
      return false;
    }
  }
  
  // Refresh session token
  Future<String?> refreshSessionToken(String oldToken) async {
    try {
      final url = Uri.parse('${AppConfig.serverBaseUrl}/refresh-session');
      
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'session_token': oldToken}),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['new_token'];
      } else {
        _logger.e('Session refresh failed: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      _logger.e('Session refresh error: $e');
      return null;
    }
  }
  
  // Check server health
  Future<bool> checkServerHealth() async {
    try {
      final url = Uri.parse('${AppConfig.serverBaseUrl}${AppConfig.healthEndpoint}');
      final response = await http.get(url);
      return response.statusCode == 200;
    } catch (e) {
      _logger.e('Health check failed: $e');
      return false;
    }
  }
}
