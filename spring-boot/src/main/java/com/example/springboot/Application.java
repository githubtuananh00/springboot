package com.example.springboot;

// import com.example.springboot.Repo.UserRepository;
// import com.example.springboot.module.User;
// import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// @Bean
	// CommandLineRunner runner(UserRepository userRepository){
	//
	// return args -> {
	// User user = new User(
	// "User 4",
	// "123456"
	// );
	//
	// userRepository.save(user);
	// };
	// }
}
