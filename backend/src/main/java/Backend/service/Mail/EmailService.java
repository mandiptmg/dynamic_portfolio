package Backend.service.Mail;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @SuppressWarnings("null")
    public void sendEmail(
            String to,
            String subject,
            String personalizedMessage,
            String fullName,
            String email,
            MultipartFile[] attachments) throws MessagingException, IOException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject); 

        Context context = new Context();
        context.setVariable("recipientName", "Mandip Tamang");
        context.setVariable("personalizedMessage", personalizedMessage);
        context.setVariable("name", fullName);
        context.setVariable("email", email);

        String htmlBody = templateEngine.process("email", context);
        helper.setText(htmlBody, true);

        if (attachments != null) {
            for (MultipartFile file : attachments) {
                if (file != null && !file.isEmpty()) {
                    helper.addAttachment(file.getOriginalFilename(), file);
                }
            }
        }

        mailSender.send(message);
    }

}
