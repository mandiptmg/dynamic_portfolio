package Backend.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = ConditionalNotNullValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ConditionalNotNull {
    String message() default "This field is required.";

    String conditionField(); // Field name to check for the condition

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
