package com.ordelyx.backend.dtos.order;

import com.ordelyx.backend.entities.OrderItem;

import java.math.BigDecimal;

public record RegisterOrderItemResponse(
        String productName,
        int quantity,
        BigDecimal price
) {
    public static RegisterOrderItemResponse fromEntity(OrderItem item) {
        return new RegisterOrderItemResponse(
                item.getProduct().getName(),
                item.getQuantity(),
                item.getProduct().getPrice()
        );
    }
}