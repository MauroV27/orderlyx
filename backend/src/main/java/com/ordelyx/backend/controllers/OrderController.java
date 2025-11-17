package com.ordelyx.backend.controllers;

import com.ordelyx.backend.config.JwtUtil;
import com.ordelyx.backend.dtos.order.RegisterOrderRequest;
import com.ordelyx.backend.dtos.order.RegisterOrderResponse;
import com.ordelyx.backend.dtos.order.UpdateOrderRequest;
import com.ordelyx.backend.entities.Order;
import com.ordelyx.backend.entities.OrderItem;
import com.ordelyx.backend.entities.User;
import com.ordelyx.backend.enums.OrderStatus;
import com.ordelyx.backend.services.OrderService;
import com.ordelyx.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    // TODO : Melhoria - Criar DTO para listagem de orders
    @GetMapping
    public ResponseEntity<List<RegisterOrderResponse>> listOrders(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        UUID userId = jwtUtil.extractUserId(token);

        List<Order> orders = orderService.getOrdersByUser(userId);

        List<RegisterOrderResponse> response = orders.stream()
                .map(RegisterOrderResponse::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // TODO : Melhoria - Criar DTO para GET de order
    @GetMapping("/{id}")
    public ResponseEntity<RegisterOrderResponse> getOrder(
            @PathVariable UUID id,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        UUID userId = jwtUtil.extractUserId(token);

        Optional<Order> orderOpt = orderService.getOrderByIdAndUser(id, userId);

        if (orderOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Order order = orderOpt.get();
        RegisterOrderResponse response = RegisterOrderResponse.fromEntity(order);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RegisterOrderResponse> createOrder(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody RegisterOrderRequest orderRequest) {

        String token = authHeader.replace("Bearer ", "");
        UUID userId = jwtUtil.extractUserId(token);

        Optional<User> userOpt = userService.findUserById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).build();
        }

        User user = userOpt.get();

        Order order = Order.builder()
                .customerName(orderRequest.customerName())
                .customerAddress(orderRequest.customerAddress())
                .date(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .user(user)
                .items(orderRequest.items().stream()
                        .map(i -> OrderItem.builder()
                                .product(i.product())
                                .quantity(i.quantity())
                                .build())
                        .collect(Collectors.toList()))
                .build();

        // vincular os itens ao pedido
        order.getItems().forEach(item -> item.setOrder(order));

        Order saved = orderService.createOrder(order, user);

        return ResponseEntity.ok(RegisterOrderResponse.fromEntity(saved));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<RegisterOrderResponse> updateStatus(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id,
            @RequestParam String status) {

        String token = authHeader.replace("Bearer ", "");
        jwtUtil.extractUserId(token);

        Order updated = orderService.updateStatus(id, status);

        return ResponseEntity.ok(RegisterOrderResponse.fromEntity(updated));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegisterOrderResponse> updateOrder(
            @PathVariable UUID id,
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody UpdateOrderRequest request) {

        String token = authHeader.replace("Bearer ", "");
        UUID userId = jwtUtil.extractUserId(token);

        Optional<Order> updatedOpt = orderService.updateOrder(id, userId, request);

        if (updatedOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        RegisterOrderResponse response = RegisterOrderResponse.fromEntity(updatedOpt.get());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id) {

        String token = authHeader.replace("Bearer ", "");
        UUID userId = jwtUtil.extractUserId(token);

        try {
            orderService.deleteOrder(id, userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            if (e.getMessage().contains("não encontrado")) {
                return ResponseEntity.notFound().build();
            } else if (e.getMessage().contains("permissão")) {
                return ResponseEntity.status(403).build();
            }
            return ResponseEntity.internalServerError().build();
        }
    }
}