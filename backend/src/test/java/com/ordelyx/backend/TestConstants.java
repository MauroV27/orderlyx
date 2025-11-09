package com.ordelyx.backend;

public final class TestConstants {

    private TestConstants() {
        throw new UnsupportedOperationException("This is a constants class and cannot be instantiated");
    }

    // --- API Root :
    public static final String API_ROOT = "/api/v1";

    // --- Rotas Públicas (Auth) ---
    public static final String API_AUTH = API_ROOT + "/auth";
    public static final String API_AUTH_LOGIN = API_AUTH + "/login";

    // -- Rotas User :
    public static final String API_USER = API_ROOT + "/users";
    public static final String API_AUTH_REGISTER = API_USER + "/";

    // --- Rotas Protegidas (Product) ---
    public static final String API_PRODUCTS = API_ROOT + "/products";
    public static final String API_PRODUCTS_BY_ID = API_PRODUCTS + "/{id}";

    // --- Rotas de Saúde/Monitoramento ---
    public static final String API_ACTUATOR_HEALTH = "/actuator/health";

    // --- Headers Padrão ---
    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String HEADER_BEARER_PREFIX = "Bearer ";
    public static final String TOKEN_KEY = "access_token";
}