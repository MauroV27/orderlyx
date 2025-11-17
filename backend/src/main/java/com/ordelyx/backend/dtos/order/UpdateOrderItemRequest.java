package com.ordelyx.backend.dtos.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record UpdateOrderItemRequest(
        UUID productId,

        @NotNull
        @Min(0)
        int quantity
) {}
