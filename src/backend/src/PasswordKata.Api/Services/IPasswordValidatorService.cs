using PasswordKata.Api.Models;

namespace PasswordKata.Api.Services;

public interface IPasswordValidatorService
{
    ValidationResult Validate(string password, string username);
}
