package si.fri.uni.messenger;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Objects;

@Controller
public class UserController {

    final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public String renderViewUsers(Model model) {

        List<User> users = userService.getUsers();

        model.addAttribute("users", users);

        return "users-list";
    }

    @GetMapping("/register")
    public String renderViewRegister(Model model, HttpServletResponse response) {
        return "register";
    }

    @PostMapping("/register")
    public String doRegister(Model model, HttpServletResponse response, @RequestParam("username") String username, @RequestParam("publicKey") String publicKey) {

        User user = null;
        try {
            user = userService.createUser(username, publicKey);
        } catch (Throwable t) {
            model.addAttribute("message", "Username already exists.");
            return "register";
        }

        response.addCookie(new Cookie("userId", Objects.toString(user.getId(), null)));
        response.addCookie(new Cookie("username", user.getUsername()));
        response.addCookie(new Cookie("publicKey", user.getPublicKey()));

        response.setHeader("Location", "/home");
        response.setStatus(302);
        return null;
    }

    @GetMapping("/unregister")
    public void doUnregister(Model model, HttpServletResponse response) {

        response.addCookie(new Cookie("userId", null));
        response.addCookie(new Cookie("username", null));

        response.setHeader("Location", "/home");
        response.setStatus(302);
    }

}
