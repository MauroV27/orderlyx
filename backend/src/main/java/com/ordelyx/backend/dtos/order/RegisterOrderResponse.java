package com.ordelyx.backend.dtos.order;

import com.ordelyx.backend.entities.Order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record RegisterOrderResponse(
        String id,
        String customerName,
        String customerAddress,
        LocalDateTime date,
        String status,
        BigDecimal total,
        List<RegisterOrderItemResponse> items
) {
    public static RegisterOrderResponse fromEntity(Order order) {
        return new RegisterOrderResponse(
                order.getId().toString(),
                order.getCustomerName(),
                order.getCustomerAddress(),
                order.getDate(),
                order.getStatus().name(),
                order.getTotal(),
                order.getItems().stream()
                        .map(RegisterOrderItemResponse::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}