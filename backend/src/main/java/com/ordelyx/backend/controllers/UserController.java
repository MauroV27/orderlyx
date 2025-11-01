package com.ordelyx.backend.controllers;

import com.ordelyx.backend.dtos.user.RegisterAccountRequest;
import com.ordelyx.backend.dtos.user.RegisterAccountResponse;
import com.ordelyx.backend.dtos.user.UserAccountInfoResponse;
import com.ordelyx.backend.entities.User;
import com.ordelyx.backend.services.UserService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<ResponseWrapper<?>> createUser(@RequestBody @NonNull RegisterAccountRequest user) {
        try {
            RegisterAccountResponse newUser =  userService.createUser(user);
            ResponseWrapper<RegisterAccountResponse> response = new ResponseWrapper<>(newUser, true);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            ResponseWrapper<String> response = new ResponseWrapper<>(e.getMessage(), false);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserAccountInfoResponse> getUsersById (@PathVariable String id) throws Exception {
        Optional<User> user = userService.findUserById(UUID.fromString(id));
        UserAccountInfoResponse response = new UserAccountInfoResponse(
                user.get().getId().toString(),
                user.get().getUsername(),
                user.get().getEmail()
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
