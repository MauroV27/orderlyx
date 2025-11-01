package com.ordelyx.backend.services;


import com.ordelyx.backend.dtos.user.RegisterAccountRequest;
import com.ordelyx.backend.dtos.user.RegisterAccountResponse;
import com.ordelyx.backend.entities.User;
import com.ordelyx.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void saveUser(User user)
    {
        this.userRepository.save(user);
    }

    public RegisterAccountResponse createUser(RegisterAccountRequest userToRegister) {
        if (userRepository.findByUsername(userToRegister.username()).isPresent()) {
            throw new IllegalArgumentException("Username já cadastrado");
        }

        if (userRepository.findByEmail(userToRegister.email()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        User newUser = new User();
        newUser.setEmail(userToRegister.email());
        newUser.setUsername(userToRegister.username());
        newUser.setPassword(passwordEncoder.encode(userToRegister.password()));

        this.saveUser(newUser);

        return new RegisterAccountResponse(newUser.getId().toString(), newUser.getEmail(), newUser.getUsername());
    }

    public List<User> getAllUsers(){
        return this.userRepository.findAll();
    }

    public Optional<User> findUserById (UUID id) {
        return this.userRepository.findUserById(id);
    }

    public Optional<User> findUserByEmail (String email) {
        return this.userRepository.findByEmail(email);
    }
}
