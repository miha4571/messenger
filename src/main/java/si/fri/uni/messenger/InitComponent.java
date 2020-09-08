package si.fri.uni.messenger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class InitComponent {

    private static final Logger log = LoggerFactory.getLogger(InitComponent.class);

    private final HelloWorldRepository helloWorldRepository;
    private final UserService userService;

    public InitComponent(HelloWorldRepository helloWorldRepository, UserService userService) {
        this.helloWorldRepository = helloWorldRepository;
        this.userService = userService;
    }

    @PostConstruct
    private void init() {

        createTestUsers();

        log.debug("test debug message LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
        HelloWorldMessage test = new HelloWorldMessage();
        test.setMessage("test");
        helloWorldRepository.save(test);
    }

    private void createTestUsers() {
        userService.createUser("Franci", "1");
        userService.createUser("Poldi", "7");
        userService.createUser("Micka", "13");
    }
}
