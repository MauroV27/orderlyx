package com.ordelyx.backend.enums;


public enum OrderStatus {
    PENDING,        // Pedido criado, aguardando processamento
    CONFIRMED,      // Pedido registrado
    PROCESSING,     // Em produção
    SHIPPED,        // Enviado
    DELIVERED,      // Entregue
    CONCLUDED,      // Confirmado pelo sistema/loja
    CANCELED        // Cancelado
}
