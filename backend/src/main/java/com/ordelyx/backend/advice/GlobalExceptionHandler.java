package com.ordelyx.backend.advice;

import com.ordelyx.backend.advice.wrappers.ResponseWrapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice(basePackages = "com.ordelyx.backend.controllers")
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ResponseWrapper<String>> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(404)
                .body(new ResponseWrapper<>(ex.getMessage(), false));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseWrapper<String>> handleGeneric(Exception ex) {
        return ResponseEntity.status(500)
                .body(new ResponseWrapper<>(ex.getMessage(), false));
    }
}
