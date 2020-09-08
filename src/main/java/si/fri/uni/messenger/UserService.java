package si.fri.uni.messenger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User createUser(String username, String publicKey) {
        User user = new User();
        user.setUsername(username);
        user.setPublicKey(publicKey);
        user = userRepository.save(user);
        return user;
    }

}
