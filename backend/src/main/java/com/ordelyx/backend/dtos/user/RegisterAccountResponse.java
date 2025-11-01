package com.ordelyx.backend.dtos.user;

public record RegisterAccountResponse (
        String id,
        String username,
        String email
){}
