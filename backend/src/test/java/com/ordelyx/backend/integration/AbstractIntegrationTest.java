package com.ordelyx.backend.integration;

import com.ordelyx.backend.BackendApplication;
import com.ordelyx.backend.dtos.user.LoginAccountRequest;
import com.ordelyx.backend.dtos.user.RegisterAccountRequest;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import com.fasterxml.jackson.databind.ObjectMapper;

import static com.ordelyx.backend.TestConstants.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = BackendApplication.class)
@ActiveProfiles("test")
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@EnableConfigurationProperties
public abstract class AbstractIntegrationTest {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    protected String performLoginAndGetToken(String email, String password) throws Exception {
        LoginAccountRequest loginDto = new LoginAccountRequest(email, password);

        MvcResult result = mockMvc.perform(post(API_AUTH_LOGIN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        return objectMapper.readTree(responseBody).get("data").get(TOKEN_KEY).asText();
    }
}