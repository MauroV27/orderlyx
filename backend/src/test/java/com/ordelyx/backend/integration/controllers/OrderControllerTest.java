package com.ordelyx.backend.integration.controllers;

import com.ordelyx.backend.integration.AbstractIntegrationTest;
import com.ordelyx.backend.repositories.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

@AutoConfigureMockMvc
public class OrderControllerTest  extends AbstractIntegrationTest {

    @Test
    void shouldCreateOrderSuccessfully() throws Exception {
        String authToken = this.performLoginAndGetToken("teste.user@email.com", "securePassword123");

    }

}
