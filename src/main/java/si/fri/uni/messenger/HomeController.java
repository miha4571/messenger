package si.fri.uni.messenger;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Controller
public class HomeController {

    @GetMapping("")
    public RedirectView redirectRoot() {
        return new RedirectView("home");
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
