package com.ordelyx.backend.advice;


import com.ordelyx.backend.advice.wrappers.ResponseWrapper;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice(basePackages = "com.ordelyx.backend.controllers")
public class GlobalResponseWrapperAdvice implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType,
                            Class<? extends HttpMessageConverter<?>> converterType) {
        return true; // aplica a todos os endpoints
    }

    @Override
    public Object beforeBodyWrite(Object body,
                                  MethodParameter returnType,
                                  MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType,
                                  ServerHttpRequest request,
                                  ServerHttpResponse response) {

        if (body == null) {
            return new ResponseWrapper<>(null, true);
        }

        if (body instanceof ResponseWrapper<?> || body instanceof String) {
            // evita dupla-embalagem e conflito com @ResponseBody String
            return body;
        }

        if (body instanceof ResponseEntity<?>) {
            ResponseEntity<?> responseEntity = (ResponseEntity<?>) body;
            Object entityBody = responseEntity.getBody();

            if (entityBody instanceof ResponseWrapper<?>) {
                return body;
            }

            return ResponseEntity
                    .status(responseEntity.getStatusCode())
                    .headers(responseEntity.getHeaders())
                    .body(new ResponseWrapper<>(entityBody, true));
        }

        return new ResponseWrapper<>(body, true);
    }
}
