package com.ftn.sit.constraints.validator;

import com.ftn.sit.constraints.annotation.ValidPassword;
import org.passay.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

@Component
public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {
    private final Properties props;

    public PasswordConstraintValidator(@Qualifier("passay") Properties props) {
        this.props = props;
    }

    @Override
    public void initialize(final ValidPassword arg0) {

    }


    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {

        MessageResolver resolver = new PropertiesMessageResolver(props);

        PasswordValidator validator = new PasswordValidator(resolver, Arrays.asList(

                // length between 6 and 16 characters
                new LengthRule(6, 16),

                // at least one upper-case character
                new CharacterRule(EnglishCharacterData.UpperCase, 1),

                // at least one lower-case character
                new CharacterRule(EnglishCharacterData.LowerCase, 1),

                // at least one digit character
                new CharacterRule(EnglishCharacterData.Digit, 1),

                // no whitespace
                new WhitespaceRule()
        ));

        RuleResult result = validator.validate(new PasswordData(password));

        if (result.isValid()) {
            return true;
        }

        List<String> messages = validator.getMessages(result);
        String messageTemplate = String.join(",", messages);
        context.buildConstraintViolationWithTemplate(messageTemplate)
                .addConstraintViolation()
                .disableDefaultConstraintViolation();
        return false;
    }

}