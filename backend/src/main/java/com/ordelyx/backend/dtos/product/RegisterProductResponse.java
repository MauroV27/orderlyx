package com.ordelyx.backend.dtos.product;

import java.math.BigDecimal;

public record RegisterProductResponse (
        String name,
        BigDecimal price,
        String id
) {}
