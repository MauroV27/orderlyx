package com.ordelyx.backend.services;

import com.ordelyx.backend.config.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private final JwtUtil jwtUtil;

    public JwtService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public String createToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return jwtUtil.generateToken(claims, username);
    }

    public boolean validateToken(String token, String username) {
        return jwtUtil.isTokenValid(token, username);
    }

    public String extractUsername(String token) {
        return jwtUtil.extractUsername(token);
    }
}