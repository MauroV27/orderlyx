package com.ordelyx.backend.advice.wrappers;

import lombok.Getter;

@Getter
public class ResponseWrapper<T> {
    private final T data;
    private final String errorMessage;
    private final boolean success;

    public ResponseWrapper(T data, boolean success) {
        this.data = data;
        this.success = success;
        this.errorMessage = null;
    }

    public ResponseWrapper(String errorMessage, boolean success) {
        this.errorMessage = errorMessage;
        this.success = success;
        this.data = null;
    }
}