using Microsoft.AspNetCore.Mvc;
using PasswordKata.Api.Models;
using PasswordKata.Api.Services;

namespace PasswordKata.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IPasswordValidatorService _validator;

    // In-memory store — not production-grade, purely for the kata.
    private static readonly HashSet<string> _registeredUsers = new(StringComparer.OrdinalIgnoreCase);

    public AuthController(IPasswordValidatorService validator)
    {
        _validator = validator;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        // BUG B5: No null / empty guard — a request with null Password throws
        // NullReferenceException inside the validator instead of returning 400.
        var result = _validator.Validate(request.Password, request.Username);

        if (request.Password != request.ConfirmPassword)
            result.Errors.Add("Passwords do not match.");

        if (_registeredUsers.Contains(request.Username))
            result.Errors.Add("Username is already taken.");

        if (result.Errors.Any())
            return BadRequest(new { errors = result.Errors });

        _registeredUsers.Add(request.Username);
        return Ok(new { message = "Registration successful." });
    }
}
