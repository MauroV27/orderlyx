package com.ordelyx.backend.integration.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ordelyx.backend.dtos.user.LoginAccountRequest;
import com.ordelyx.backend.dtos.user.RegisterAccountRequest;
import com.ordelyx.backend.integration.AbstractIntegrationTest;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import static com.ordelyx.backend.TestConstants.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class AuthControllerTest extends AbstractIntegrationTest {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private static String globalAuthToken = null;

    private final RegisterAccountRequest userDataForTest = new RegisterAccountRequest(
            "teste.user@email.com",
            "User Teste",
            "securePassword123"
    );

    @Test
    public void shouldRegisterAndLoginUserSuccessfully() throws Exception {
        // --- 1. REGISTRO ---
        RegisterAccountRequest registerDto = new RegisterAccountRequest(userDataForTest.email(), userDataForTest.username(), userDataForTest.password());

        mockMvc.perform(post(API_USER)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.errorMessage").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.data.id").exists());

        // --- 2. LOGIN ---
        LoginAccountRequest loginDto = new LoginAccountRequest("teste.user@email.com", "securePassword123");

        MvcResult result = mockMvc.perform(post(API_AUTH_LOGIN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.errorMessage").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.data."+TOKEN_KEY).exists())
                .andReturn();

        // EXTRAÇÃO DO TOKEN
        String responseBody = result.getResponse().getContentAsString();
        String token = this.objectMapper.readTree(responseBody).get("data").get(TOKEN_KEY).asText();

        assertNotNull(token, "O token JWT não deve ser nulo após o login.");

        globalAuthToken = token;
        System.out.println("Token JWT Armazenado: " + globalAuthToken);
    }

    @Test
    void shouldFailToAccessProtectedRouteWithoutToken() throws Exception {
        this.mockMvc.perform(post(API_PRODUCTS)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldAccessProtectedRouteWithStoredToken() throws Exception {
        if (globalAuthToken == null) {
            System.err.println("Aviso: O teste de login/registro não foi executado ou falhou. Tentando executar o fluxo de login/registro...");
            shouldRegisterAndLoginUserSuccessfully();
        }

        assertNotNull(globalAuthToken, "Token não deve ser nulo para acessar a rota protegida.");

        this.mockMvc.perform(get(API_PRODUCTS)
                        .header("Authorization", "Bearer " + globalAuthToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andReturn();
    }
}