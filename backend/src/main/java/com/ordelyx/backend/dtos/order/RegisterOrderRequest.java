package com.ordelyx.backend.dtos.order;

import java.util.List;

public record RegisterOrderRequest(
        String customerName,
        String customerAddress,
        List<RegisterOrderItemRequest> items
) {}
