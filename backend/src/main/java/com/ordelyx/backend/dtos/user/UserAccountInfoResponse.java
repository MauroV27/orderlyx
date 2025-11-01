package com.ordelyx.backend.dtos.user;

public record UserAccountInfoResponse (
    String id,
    String username,
    String email
){}
