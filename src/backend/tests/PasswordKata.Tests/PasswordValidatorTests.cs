using FluentAssertions;
using PasswordKata.Api.Services;
using Xunit;

namespace PasswordKata.Tests;

/// <summary>
/// Candidate test scaffold — add your test cases here.
///
/// Run with:   dotnet test
///
/// Hint: think in terms of equivalence classes and boundary values.
/// For each rule, ask yourself:
///   - What is the exact boundary? (e.g. exactly 8 chars, exactly 64 chars)
///   - What is one value just inside the boundary?
///   - What is one value just outside the boundary?
///   - What edge cases exist? (null, empty, Unicode, mixed-case, etc.)
/// </summary>
public class PasswordValidatorTests
{
    private readonly PasswordValidatorService _sut = new();

    // -----------------------------------------------------------------------
    // Happy path
    // -----------------------------------------------------------------------

    [Fact]
    public void Valid_password_should_pass()
    {
        // Arrange
        var password = "Secure!9";
        var username = "alice";

        // Act
        var result = _sut.Validate(password, username);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }

    // -----------------------------------------------------------------------
    // Minimum length (rule: >= 8)
    // -----------------------------------------------------------------------

    // TODO: Add a test for a password with exactly 8 characters — should PASS.
    // TODO: Add a test for a password with 7 characters — should FAIL.
    // TODO: Add a test for an empty string — what should happen?

    // -----------------------------------------------------------------------
    // Maximum length (rule: <= 64)
    // -----------------------------------------------------------------------

    // TODO: Add a test for a password with exactly 64 characters — should PASS.
    // TODO: Add a test for a password with 65 characters — should FAIL.

    // -----------------------------------------------------------------------
    // Character class rules
    // -----------------------------------------------------------------------

    // TODO: Password with no uppercase — should fail with appropriate message.
    // TODO: Password with no lowercase — should fail.
    // TODO: Password with no digit — should fail.
    // TODO: Password with no special char — should fail.
    // TODO: Password with a space — should fail.

    // -----------------------------------------------------------------------
    // Consecutive characters (rule: no more than 2 in a row)
    // -----------------------------------------------------------------------

    // TODO: "aaPass1!" (2 consecutive 'a') — should PASS.
    // TODO: "aaaPass1!" (3 consecutive 'a') — should FAIL.
    // TODO: "aaaaPas1!" (4 consecutive 'a') — should FAIL.

    // -----------------------------------------------------------------------
    // Username containment (rule: case-insensitive)
    // -----------------------------------------------------------------------

    // TODO: Password contains username in exact case — should FAIL.
    // TODO: Password contains username in different case — should FAIL.
    // TODO: Password contains a partial username — what should happen? (flag as ambiguous)

    // -----------------------------------------------------------------------
    // Multiple failures
    // -----------------------------------------------------------------------

    // TODO: A password that violates 3 rules — should return all 3 errors.

    // -----------------------------------------------------------------------
    // Edge / error cases
    // -----------------------------------------------------------------------

    // TODO: What happens if password is null? Document expected behaviour.
    // TODO: Unicode characters — are they counted as special chars? Clarify with spec.
}
