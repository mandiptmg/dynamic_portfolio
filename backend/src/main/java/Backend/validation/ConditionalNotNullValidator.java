package Backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.reflect.Field;

public class ConditionalNotNullValidator implements ConstraintValidator<ConditionalNotNull, Object> {

    private String conditionField;

    @Override
    public void initialize(ConditionalNotNull annotation) {
        this.conditionField = annotation.conditionField();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        try {
            // Get the enclosing object (the DTO instance)
            Object enclosingObject = context.unwrap(Object.class);

            // Reflectively get the condition field
            Field field = enclosingObject.getClass().getDeclaredField(conditionField);
            field.setAccessible(true);

            // Check the value of the condition field
            Object conditionFieldValue = field.get(enclosingObject);

            // If the condition field is null, the annotated field must not be null
            if (conditionFieldValue == null) {
                return value != null; // Annotated field must not be null
            }

            // If the condition field is not null, no validation required
            return true;
        } catch (Exception e) {
            // If reflection fails, assume the field is valid
            return true;
        }
    }
}