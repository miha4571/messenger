package si.fri.uni.messenger;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@Controller
public class HomeController {

    @GetMapping("")
    public RedirectView redirectRoot() {
        return new RedirectView("home");
    }

    @GetMapping("/home")
    public String renderViewHome(Model model, HttpServletRequest request, Authentication authentication, Principal principal) {

        if(authentication != null && authentication.isAuthenticated()) {
            model.addAttribute("greeting", "You are logged in! Hello "+principal.getName());
        }

        return "homepage";
    }

}
