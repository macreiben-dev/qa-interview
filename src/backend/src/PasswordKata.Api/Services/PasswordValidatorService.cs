using PasswordKata.Api.Models;

namespace PasswordKata.Api.Services;

public class PasswordValidatorService : IPasswordValidatorService
{
    public ValidationResult Validate(string password, string username)
    {
        var errors = new List<string>();

        // BUG B1: Uses > instead of >= — an exactly 8-character password incorrectly fails.
        if (password.Length > 8)
        {
            // length ok — fall through
        }
        else
        {
            errors.Add("Password must be at least 8 characters long.");
        }

        // BUG B4: Checks against 128 instead of the specified maximum of 64.
        if (password.Length > 128)
            errors.Add("Password must not exceed 64 characters.");

        if (!password.Any(char.IsUpper))
            errors.Add("Password must contain at least one uppercase letter.");

        if (!password.Any(char.IsLower))
            errors.Add("Password must contain at least one lowercase letter.");

        if (!password.Any(char.IsDigit))
            errors.Add("Password must contain at least one digit.");

        if (!password.Any(c => "!@#$%^&*".Contains(c)))
            errors.Add("Password must contain at least one special character (!@#$%^&*).");

        if (password.Contains(' '))
            errors.Add("Password must not contain spaces.");

        if (HasExcessiveConsecutiveChars(password))
            errors.Add("Password must not contain more than 2 consecutive identical characters.");

        // BUG B3: Case-sensitive comparison — "JohnPass1!" passes when username is "john".
        if (password.Contains(username))
            errors.Add("Password must not contain your username.");

        return new ValidationResult
        {
            IsValid = !errors.Any(),
            Errors = errors
        };
    }

    /// <summary>
    /// Returns true if the password contains a run of 3 or more identical characters.
    /// </summary>
    private static bool HasExcessiveConsecutiveChars(string password)
    {
        // BUG B2: Counter starts at 0 instead of 1.
        // A run of "aaa" produces counts 0 → 1 → 2, which never reaches the threshold of 3,
        // so three consecutive identical characters incorrectly pass validation.
        // A run of "aaaa" produces 0 → 1 → 2 → 3 and is (correctly) caught.
        int count = 0;

        for (int i = 1; i < password.Length; i++)
        {
            if (password[i] == password[i - 1])
                count++;
            else
                count = 0;

            if (count >= 3)
                return true;
        }

        return false;
    }
}
