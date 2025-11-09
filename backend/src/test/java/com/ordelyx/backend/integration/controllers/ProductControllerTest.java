package com.ordelyx.backend.integration.controllers;

import com.ordelyx.backend.dtos.product.RegisterProductRequest;
import com.ordelyx.backend.integration.AbstractIntegrationTest;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import java.math.BigDecimal;

import static com.ordelyx.backend.TestConstants.API_PRODUCTS;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
public class ProductControllerTest extends AbstractIntegrationTest {

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

}
