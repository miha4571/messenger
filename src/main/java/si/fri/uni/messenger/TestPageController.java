package si.fri.uni.messenger;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class TestPageController {

    @GetMapping("/test")
    public String renderTestPage(Model model) {
        return "test-page";
    }

}
