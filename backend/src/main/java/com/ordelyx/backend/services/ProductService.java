package com.ordelyx.backend.services;

import com.ordelyx.backend.entities.Product;
import com.ordelyx.backend.entities.User;
import com.ordelyx.backend.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProductsByUser(UUID userId) {
        return productRepository.findByUserId(userId);
    }

    @Transactional
    public Product createProduct(Product product, User user) {
        product.setUser(user);
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(UUID productId, UUID userId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));
        if (!product.getUser().getId().equals(userId)) {
            throw new SecurityException("Usuário não autorizado a deletar este produto");
        }
        productRepository.delete(product);
    }

    public Optional<Product> getProductById(UUID id) {
        return productRepository.findById(id);
    }

    public Product updateProduct(Product product) {
        if (!productRepository.existsById(product.getId())) {
            throw new EntityNotFoundException("Produto não encontrado para atualização.");
        }
        return productRepository.save(product);
    }
}