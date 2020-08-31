package si.fri.uni.messenger;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloWorldController {

    final HelloWorldService helloWorldService;

    public HelloWorldController(HelloWorldService helloWorldService) {
        this.helloWorldService = helloWorldService;
    }

    @GetMapping("/hello-world")
    @ResponseBody
    public String sayHello() {
        return helloWorldService.sayHello();
    }

    @GetMapping("/hello-world-view")
    public String renderView(Model model) {
        model.addAttribute("message", "hello-world");
        return "hello-world-view";
    }

    @GetMapping("/home")
    public String renderViewHome(Model model) {
        return "home";
    }

    @GetMapping("/register")
    public String renderViewRegister(Model model) {
        return "register";
    }

    @GetMapping("/messages")
    public String renderViewMessages(Model model) {
        return "messages";
    }

    @GetMapping("/users")
    public String renderViewUsers(Model model) {
        return "users";
    }

    @GetMapping("/message")
    public String renderViewRead(Model model) {
        return "message";
    }

    @GetMapping("/send")
    public String renderViewSend(Model model) {
        return "send";
    }

}
