package si.fri.uni.messenger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HelloWorldService {

    private static final Logger log = LoggerFactory.getLogger(InitComponent.class);

    @Autowired
    private HelloWorldRepository helloWorldRepository;

    public List<HelloWorldMessage> getList() {
        return helloWorldRepository.findAll();
    }

    public String sayHello() {
        log.error("test debug message LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
        return "hello " + helloWorldRepository.findAll().size();
    }

}
