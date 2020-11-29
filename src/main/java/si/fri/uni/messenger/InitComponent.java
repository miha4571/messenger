package si.fri.uni.messenger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class InitComponent {

    private static final Logger log = LoggerFactory.getLogger(InitComponent.class);

    private final UserService userService;
    private final MessageService messageService;

    public InitComponent(UserService userService, MessageService messageService) {
        this.userService = userService;
        this.messageService = messageService;
    }

    @PostConstruct
    private void init() {

        createTestUsers();
        createTestMessages();

    }

    private void createTestUsers() {
        userService.createUser("Franci", "1", "test");
        userService.createUser("Poldi", "7", "test");
        userService.createUser("Micka", "13", "test");
    }

    private void createTestMessages() {
        List<User> users = userService.getUsers();
        User franci = users.get(0);
        User poldi = users.get(1);
        User micka = users.get(2);

        messageService.createMessage(franci, micka, "How you doin?");
        messageService.createMessage(franci, poldi, "Živjo kolega!");
        messageService.createMessage(poldi, franci, "Živjo nazaj tebi kolega!");
    }
}
