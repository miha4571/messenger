package si.fri.uni.messenger;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

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

        Cookie usernameCookie = WebUtils.getCookie(request, "username");
        String username = usernameCookie != null ? usernameCookie.getValue() : null;

        if(!StringUtils.isEmpty(username)) {
            model.addAttribute("greeting", "Hello " + username + "!");
            model.addAttribute("username", username);
        }

        return "homepage";
    }

}
