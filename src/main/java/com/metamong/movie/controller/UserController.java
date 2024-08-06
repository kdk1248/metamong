package com.metamong.movie.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/sign-up")
    public String signUp(@RequestBody SignUpRequest signUpRequest) {
        return "회원 가입 성공";
    }

    @GetMapping("/{id}")
    public UserInfoResponse getUserInfo(@PathVariable Long id) {
        return new UserInfoResponse();
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        return "회원이 삭제 되었습니다.";
    }
}


class SignUpRequest {
    private String name;
    private String email;
    private String password;

}

class UserInfoResponse {
    private String name;
    private String email;

}
