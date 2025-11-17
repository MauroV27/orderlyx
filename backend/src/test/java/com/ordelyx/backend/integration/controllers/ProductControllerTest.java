package com.ordelyx.backend.integration.controllers;

import com.ordelyx.backend.config.JwtUtil;
import com.ordelyx.backend.dtos.product.RegisterProductRequest;
import com.ordelyx.backend.dtos.user.RegisterAccountRequest;
import com.ordelyx.backend.dtos.user.RegisterAccountResponse;
import com.ordelyx.backend.entities.Product;
import com.ordelyx.backend.entities.User;
import com.ordelyx.backend.integration.AbstractIntegrationTest;
import com.ordelyx.backend.repositories.ProductRepository;
import com.ordelyx.backend.repositories.UserRepository;
import com.ordelyx.backend.services.UserService;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static java.util.UUID.randomUUID;

import static com.ordelyx.backend.TestConstants.API_PRODUCTS;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
public class ProductControllerTest extends AbstractIntegrationTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    ProductRepository productRepository = null;

    @Test
    void shouldCreateProductSuccessfully() throws Exception {
        RegisterProductRequest request = new RegisterProductRequest("Produto Teste", BigDecimal.valueOf(100.0));
        String authToken = this.performLoginAndGetToken("teste.user@email.com", "securePassword123");

        mockMvc.perform(post(API_PRODUCTS)
                        .header("Authorization", "Bearer " + authToken)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.errorMessage").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.data.name").value("Produto Teste"));
    }

    @Test
    void shouldListProductsFromUserSuccessfully() throws Exception {
        // 1. Cria usuário no repositório
        User user = new User("user2@email.com", "user2@email.com", passwordEncoder.encode("securePassword123"));
        user = userRepository.saveAndFlush(user);
        userRepository.flush();

        // 2. Faz login para obter token real

        // 3. Cria produtos associados ao usuário
        List<Product> listProducts = List.of(
                new Product(UUID.randomUUID(), "Produto Teste 2", BigDecimal.valueOf(20.0), user),
                new Product(UUID.randomUUID(), "Produto Teste 3", BigDecimal.valueOf(50.0), user),
                new Product(UUID.randomUUID(), "Produto Teste 5", BigDecimal.valueOf(30.0), user)
        );

        productRepository.saveAllAndFlush(listProducts);
        productRepository.flush();

        String authToken = this.performLoginAndGetToken("user2@email.com", "securePassword123");

        mockMvc.perform(get(API_PRODUCTS)
                        .header("Authorization", "Bearer " + authToken)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.errorMessage").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(listProducts.size()));
    }

}
