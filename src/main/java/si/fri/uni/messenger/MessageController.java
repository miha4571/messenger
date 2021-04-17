package si.fri.uni.messenger;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Comparator;
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
    public String renderViewMessages(Model model, Authentication authentication, Principal principal) {

        User user = null;
        List<Message> messages = new ArrayList<>();

        if(authentication != null && authentication.isAuthenticated()) {
            user = userService.getUserByUsername(principal.getName());
            model.addAttribute("user", user);
        } else {
            model.addAttribute("user", null);
            model.addAttribute("messages", messages);
            return "messages-list";
        }


        messages = messageService.getMessagesForUser(user);
        messages.sort(Comparator.comparing(Message::getDateSent).reversed());

        model.addAttribute("messages", messages);

        return "messages-list";
    }

    @GetMapping("/messages/{messageId}")
    public String renderViewRead(Model model, @PathVariable(name = "messageId") Long messageId, Authentication authentication, Principal principal) {

        Message message = messageService.getMessageById(messageId);

        model.addAttribute("message", message);

        if(authentication != null && authentication.isAuthenticated()) {
            User user = userService.getUserByUsername(principal.getName());
            Long userId = user == null ? null : user.getId();
            model.addAttribute("loggedInUserId", userId);
            model.addAttribute("user", user);
        } else {
            model.addAttribute("loggedInUserId", "Not logged in.");
        }

        return "view-message";
    }

    @GetMapping("/send/{userId}")
    public String renderViewSend(Model model, @PathVariable(name = "userId") String userId, Authentication authentication, Principal principal) {
        model.addAttribute("userId", userId);
        model.addAttribute("message", new Message());

        User user = userService.getUserById(Long.valueOf(userId));
        model.addAttribute("receiverUserId", user.getId());
        model.addAttribute("receiverPublicKey", user.getPublicKey());

        if(authentication != null && authentication.isAuthenticated()) {
            User user1 = userService.getUserByUsername(principal.getName());
            Long userId1 = user1 == null ? null : user1.getId();
            model.addAttribute("loggedInUserId", userId1);
        } else {
            model.addAttribute("loggedInUserId", "Not logged in.");
        }

        return "send-message";
    }

    @PostMapping("/send/{userId}")
    public void doSend(@ModelAttribute Message message, Model model, HttpServletResponse response, @PathVariable(name = "userId") Long userId, Authentication authentication, Principal principal) {

        User fromUser = userService.getUserByUsername(principal.getName());
        User toUser = userService.getUserById(userId);

        messageService.createMessage(fromUser, toUser, message.getMessageContent());

        response.setHeader("Location", "/users");
        response.setStatus(302);
    }

}
