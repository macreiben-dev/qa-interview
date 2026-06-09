# QA Interview Kata — Password Registration

## Your Mission

The team has just shipped a user registration feature. The backend dev implemented the API, and the frontend dev wired up the Angular form. **You are the first QA engineer to look at this code.**

Your goal over the next 90 minutes:

1. **List test you intend to execute** — list test cases you'd want to cover
2. **Find defects** — run the app and document any bugs you find
3. **Automate** — write automated tests (unit and/or e2e)
4. **Ask questions** — flag any requirements you find ambiguous

We're evaluating your thinking, not just your output. A well-reasoned test plan with 3 bugs found beats a rushed one with 1.

---

## Requirements

### Password Rules

A valid password **must**:

| Rule | Detail |
|------|--------|
| Minimum length | At least 8 characters |
| Maximum length | No more than 64 characters |
| Uppercase | At least one letter A–Z |
| Lowercase | At least one letter a–z |
| Digit | At least one digit 0–9 |
| Special character | At least one of: `!@#$%^&*` |
| No spaces | Must not contain a space character |
| No consecutive repeats | Must not contain more than 2 consecutive identical characters (e.g. `aaa` is invalid, `aa` is fine) |
| No username | Must not contain the username (comparison is case-insensitive) |

### Registration Form

| Field | Rules |
|-------|-------|
| Username | 3–20 characters, letters and numbers only |
| Password | Must pass all rules above |
| Confirm Password | Must match the password exactly |

**Behaviour:**
- The Submit button must be disabled until all fields are valid
- On successful registration: display a success message
- On failure: display all validation errors clearly
- Password rules should give the user real-time feedback as they type

### API

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "alice",
  "password": "S3cure!pw",
  "confirmPassword": "S3cure!pw"
}
```

**Success response** `200 OK`:

```json
{ "message": "Registration successful." }
```

**Validation failure response** `400 Bad Request`:

```json
{
  "errors": [
    "Password must be at least 8 characters long.",
    "Password must contain at least one digit."
  ]
}
```

---

## Setup

### Prerequisites

- .NET 8 SDK
- Node 18+ and Angular CLI (`npm install -g @angular/cli`)

### Docker (alternative)

```bash
docker compose up --build
# Frontend available at http://localhost:4200
# API available at http://localhost:5000
```

### Backend

```bash
cd backend
dotnet restore
dotnet run --project src/PasswordKata.Api
# API available at https://localhost:5001
```

### Frontend

```bash
cd frontend
npm install
ng serve
# App available at http://localhost:4200
```

### Run backend tests

```bash
cd backend
dotnet test
```

### Run e2e tests

```bash
cd frontend
npx playwright test
```

---

## Deliverables

By the end of the session, please share:

- [ ] The tests you intend to execute (any format — Markdown, spreadsheet, notes)
- [ ] Bug reports for any defects found (one report per bug, with steps to reproduce)
- [ ] Automated tests you wrote
- [ ] A list of questions or ambiguities you noticed

---

## Notes

- Don't worry about authentication, database persistence, or deployment — this is a stub implementation
- The backend stores registrations in memory only
- CORS is pre-configured for `localhost:4200`
- If something looks wrong, it might be a bug — or it might be intentional design. Either way, document it.

## Credits

- Prompted by [Christian Finel](https://www.linkedin.com/in/christian-finel-88b46461/) with Claude with Claude Code
- Reviewed by [Rose Lutz](https://www.linkedin.com/in/rose-lutz/)
