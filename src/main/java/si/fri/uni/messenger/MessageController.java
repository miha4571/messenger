package si.fri.uni.messenger;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
public class MessageController {

    private final MessageService messageService;
    private final UserService userService;

    public MessageController(MessageService messageService, UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }

    @GetMapping("/messages")
    public String renderViewMessages(Model model) {

        List<Message> messages = messageService.getMessages();

        model.addAttribute("messages", messages);

        return "messages-list";
    }

    @GetMapping("/messages/{messageId}")
    public String renderViewRead(Model model, @PathVariable(name = "messageId") Long messageId) {

        Message message = messageService.getMessageById(messageId);

        model.addAttribute("message", message);

        return "view-message";
    }

    @GetMapping("/send/{userId}")
    public String renderViewSend(Model model, @PathVariable(name = "userId") String userId) {
        model.addAttribute("userId", userId);
        model.addAttribute("message", new Message());
        return "send-message";
    }

    @PostMapping("/send/{userId}")
    public void doSend(@ModelAttribute Message message, Model model, HttpServletResponse response, @PathVariable(name = "userId") Long userId) {

        User fromUser = userService.getUserById(1L);
        User toUser = userService.getUserById(userId);

        messageService.createMessage(fromUser, toUser, message.getMessageContent());

        response.setHeader("Location", "/users");
        response.setStatus(302);
    }

}