package com.ordelyx.backend.dtos.product;

import java.math.BigDecimal;

public record RegisterProductRequest (
        String name,
        BigDecimal price
) {}
