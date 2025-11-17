package com.ordelyx.backend.dtos.order;

import com.ordelyx.backend.enums.OrderStatus;

import java.util.List;

public record UpdateOrderRequest(
        String customerName,
        String customerAddress,
        OrderStatus status,
        List<UpdateOrderItemRequest> items
) {}

