package com.ordelyx.backend.controllers;


import com.ordelyx.backend.config.JwtUtil;
import com.ordelyx.backend.dtos.user.LoginAccountRequest;
import com.ordelyx.backend.dtos.user.LoginAccountResponse;
import com.ordelyx.backend.entities.User;
import com.ordelyx.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginAccountRequest request) {

        String INVALID_USER_LOGIN = "Email ou senha inválidos";

        User user = userService.findUserByEmail(request.email())
                .orElseThrow(() -> new RuntimeException(INVALID_USER_LOGIN));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            return ResponseEntity.status(401).body(INVALID_USER_LOGIN);
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("id", user.getId());

        String token = jwtUtil.generateToken(claims, request.email());
        return ResponseEntity.ok(new LoginAccountResponse(token));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Logout é feito no client (frontend remove o token).
        // Opcional: implementar blacklist aqui.
        return ResponseEntity.ok("Logout realizado com sucesso (invalide o token no cliente).");
    }
}
