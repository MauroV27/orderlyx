package com.ordelyx.backend.dtos.user;

public record LoginAccountRequest(
        String email,
        String password
){}
