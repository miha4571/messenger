package si.fri.uni.messenger;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
public class MessageController {

    @GetMapping("/messages")
    public String renderViewMessages(Model model) {
        return "messages-list";
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
