package com.ordelyx.backend.controllers;

import com.ordelyx.backend.config.JwtUtil;
import com.ordelyx.backend.dtos.product.RegisterProductRequest;
import com.ordelyx.backend.dtos.product.RegisterProductResponse;
import com.ordelyx.backend.entities.Product;
import com.ordelyx.backend.entities.User;
import com.ordelyx.backend.services.ProductService;
import com.ordelyx.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public ProductController(ProductService productService, UserService userService, JwtUtil jwtUtil) {
        this.productService = productService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<RegisterProductResponse>> listProducts(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        UUID userId = jwtUtil.extractUserId(token);

        List<Product> products = productService.getProductsByUser(userId);

        List<RegisterProductResponse> response = products.stream()
                .map(p -> new RegisterProductResponse(
                        p.getName(),
                        p.getPrice(),
                        p.getId().toString()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RegisterProductResponse> createProduct(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody RegisterProductRequest productToRegister) {

        String token = authHeader.replace("Bearer ", "");
        UUID userId = jwtUtil.extractUserId(token);

        Optional<User> user = userService.findUserById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(404).build();
        }

        Product product = Product.builder()
                .name(productToRegister.name())
                .price(productToRegister.price())
                .user(user.get())
                .build();

        Product savedProduct = productService.createProduct(product, user.get());

        RegisterProductResponse response = new RegisterProductResponse(
                savedProduct.getName(),
                savedProduct.getPrice(),
                savedProduct.getId().toString()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegisterProductResponse> updateProduct(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id,
            @RequestBody RegisterProductRequest updatedProductRequest) {

        String token = authHeader.replace("Bearer ", "");
        UUID userId = jwtUtil.extractUserId(token);

        Optional<Product> existingProduct = productService.getProductById(id);
        if (existingProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = existingProduct.get();

        if (!product.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }

        product.setName(updatedProductRequest.name());
        product.setPrice(updatedProductRequest.price());

        Product updatedProduct = productService.updateProduct(product);

        RegisterProductResponse response = new RegisterProductResponse(
                updatedProduct.getName(),
                updatedProduct.getPrice(),
                updatedProduct.getId().toString()
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id) {

        String token = authHeader.replace("Bearer ", "");
        UUID userId = jwtUtil.extractUserId(token);

        productService.deleteProduct(id, userId);
        return ResponseEntity.noContent().build();
    }
}