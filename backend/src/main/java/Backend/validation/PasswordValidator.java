package Backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) return false;
        return password.matches(".*[A-Z].*")  // Contains at least one uppercase letter
                && password.matches(".*\\d.*")  // Contains at least one number
                && password.matches(".*[!@#$%^&*(),.?\":{}|<>].*");  // Contains at least one special character
    }
}
