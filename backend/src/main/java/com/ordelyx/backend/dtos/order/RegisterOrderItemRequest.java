package com.ordelyx.backend.dtos.order;

import com.ordelyx.backend.entities.Product;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record RegisterOrderItemRequest(
        Product product,

        @NotNull
        @Min(1) // Impede de criar um OrderItem com quantidade 0
        int quantity
) {}