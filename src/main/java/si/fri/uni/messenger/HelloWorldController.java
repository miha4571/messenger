package si.fri.uni.messenger;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    public String renderViewHome(Model model, HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if("username".equals(cookie.getName()) && !StringUtils.isEmpty(cookie.getValue())) {
                model.addAttribute("greeting", "Hello " + cookie.getValue() + "!");
            }
        }

        return "homepage";
    }

    @GetMapping("/register")
    public String renderViewRegister(Model model, HttpServletResponse response) {
        return "register";
    }

    @PostMapping("/register")
    public void doRegister(Model model, HttpServletResponse response) {
        response.addCookie(new Cookie("userId", "1"));
        response.addCookie(new Cookie("username", "Miha"));

        response.setHeader("Location", "/home");
        response.setStatus(302);
    }

    @GetMapping("/unregister")
    public void doUnregister(Model model, HttpServletResponse response) {

        response.addCookie(new Cookie("userId", null));
        response.addCookie(new Cookie("username", null));

        response.setHeader("Location", "/home");
        response.setStatus(302);
    }

    @GetMapping("/messages")
    public String renderViewMessages(Model model) {
        return "messages-list";
    }

    @GetMapping("/users")
    public String renderViewUsers(Model model) {
        return "users-list";
    }

    @GetMapping("/message/{messageId}")
    public String renderViewRead(Model model, @PathVariable(name = "messageId") String messageId) {
        return "view-message";
    }

    @GetMapping("/send/{userId}")
    public String renderViewSend(Model model, @PathVariable(name = "userId") String messageId) {
        return "send-message";
    }

    @PostMapping("/send/{userId}")
    public void doSend(Model model, HttpServletResponse response, @PathVariable(name = "userId") String messageId) {
        response.setHeader("Location", "/users");
        response.setStatus(302);
    }

}
