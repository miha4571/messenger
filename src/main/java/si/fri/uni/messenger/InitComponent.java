package si.fri.uni.messenger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class InitComponent {

    private static final Logger log = LoggerFactory.getLogger(InitComponent.class);

    @Autowired
    private HelloWorldRepository helloWorldRepository;

    @PostConstruct
    private void init() {
        log.debug("test debug message LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
        HelloWorldMessage test = new HelloWorldMessage();
        test.setMessage("test");
        helloWorldRepository.save(test);
    }
}
