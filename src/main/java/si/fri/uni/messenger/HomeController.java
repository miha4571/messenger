package si.fri.uni.messenger;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@Controller
public class HomeController {

    private final UserDetailsService userDetailsService;

    public HomeController(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

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
