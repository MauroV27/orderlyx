package com.ordelyx.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.management.ManagementFactory;
import java.util.Map;

@RestController
public class ActuatorHealth {

    @GetMapping("/actuator/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = Map.of(
                "status", Map.of("server", true),
                "timestamp", System.currentTimeMillis(),
                "uptimeSeconds", ManagementFactory.getRuntimeMXBean().getUptime() / 1000,
                "version", "0.1.1"
        );
        return ResponseEntity.ok(response);
    }
}
