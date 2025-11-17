package com.ordelyx.backend.services;

import com.ordelyx.backend.dtos.order.UpdateOrderItemRequest;
import com.ordelyx.backend.dtos.order.UpdateOrderRequest;
import com.ordelyx.backend.entities.Order;
import com.ordelyx.backend.entities.OrderItem;
import com.ordelyx.backend.entities.Product;
import com.ordelyx.backend.entities.User;
import com.ordelyx.backend.enums.OrderStatus;
import com.ordelyx.backend.repositories.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<Order> getOrdersByUser(UUID userId) {
        return orderRepository.findByUserId(userId);
    }

    public Optional<Order> findOrderById(UUID id) {
        return orderRepository.findById(id);
    }

    public Optional<Order> getOrderByIdAndUser(UUID orderId, UUID userId) {
        return orderRepository.findById(orderId)
                .filter(order -> order.getUser().getId().equals(userId));
    }

    public Order createOrder(Order order, User user) {
        order.setUser(user);
        order.calculateTotal();
        return orderRepository.save(order);
    }

    public Order updateStatus(UUID orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        order.setStatus(Enum.valueOf(OrderStatus.class, status.toUpperCase()));
        return orderRepository.save(order);
    }

    public void deleteOrder(UUID orderId, UUID userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Você não tem permissão para deletar este pedido.");
        }

        orderRepository.delete(order);
    }

    @Transactional
    public Optional<Order> updateOrder(UUID orderId, UUID userId, UpdateOrderRequest request) {
        Optional<Order> orderOpt = orderRepository.findById(orderId)
                .filter(order -> order.getUser().getId().equals(userId));

        if (orderOpt.isEmpty()) {
            return Optional.empty();
        }

        Order order = orderOpt.get();

        // Atualiza campos básicos
        if (request.customerName() != null) order.setCustomerName(request.customerName());
        if (request.customerAddress() != null) order.setCustomerAddress(request.customerAddress());
        if (request.status() != null)
            order.setStatus(Enum.valueOf(OrderStatus.class, request.status().toString().toUpperCase()));

        // Atualiza itens se enviados
        if (request.items() != null && !request.items().isEmpty()) {

            // Mapeia itens atuais por productId para facilitar acesso
            Map<UUID, OrderItem> existingItems = order.getItems().stream()
                    .collect(Collectors.toMap(i -> i.getProduct().getId(), i -> i));

            for (UpdateOrderItemRequest updateItem : request.items()) {
                UUID productId = updateItem.productId();
                int qty = updateItem.quantity();

                if (existingItems.containsKey(productId)) {
                    // Já existe no pedido
                    OrderItem existing = existingItems.get(productId);

                    if (qty == 0) {
                        // Se quantidade for 0 → remover
                        // Feito para fazer a remoção automática de OrderItems que sejam zerados
                        order.getItems().remove(existing);
                    } else {
                        // Atualizar quantidade
                        existing.setQuantity(qty);
                    }
                } else {
                    // Novo item (só adiciona se qty > 0)
                    if (qty > 0) {
                        Product product = new Product();
                        product.setId(productId);

                        OrderItem newItem = OrderItem.builder()
                                .order(order)
                                .product(product)
                                .quantity(qty)
                                .build();

                        order.getItems().add(newItem);
                    }
                }
            }
        }

        order.calculateTotal();
        return Optional.of(orderRepository.save(order));
    }
}
