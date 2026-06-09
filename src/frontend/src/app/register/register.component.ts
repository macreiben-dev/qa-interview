import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

// ---------------------------------------------------------------------------
// Custom validator: password rules
// ---------------------------------------------------------------------------
function passwordRulesValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  const errors: string[] = [];

  if (value.length < 8)  errors.push('minLength');
  if (value.length > 64) errors.push('maxLength');
  if (!/[A-Z]/.test(value)) errors.push('noUppercase');
  if (!/[a-z]/.test(value)) errors.push('noLowercase');
  if (!/[0-9]/.test(value)) errors.push('noDigit');
  if (!/[!@#$%^&*]/.test(value)) errors.push('noSpecial');
  if (/\s/.test(value))  errors.push('hasSpace');
  if (/(.)\1\1/.test(value)) errors.push('consecutiveChars');

  return errors.length ? { passwordRules: errors } : null;
}

// ---------------------------------------------------------------------------
// Custom validator: passwords must match (cross-field)
// ---------------------------------------------------------------------------
function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password    = group.get('password')?.value;
  const confirm     = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordsMismatch: true };
}

// ---------------------------------------------------------------------------
// Strength helper — purely presentational
// ---------------------------------------------------------------------------
function passwordStrength(password: string): 'weak' | 'medium' | 'strong' {
  // BUG F4: Only checks length — ignores the other rules entirely.
  // A password like "aaaaaaaa" (8 chars, all lowercase, no digit/special/upper)
  // is shown as "Medium" when it should be "Weak".
  if (password.length >= 12) return 'strong';
  if (password.length >= 8)  return 'medium';
  return 'weak';
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  successMessage = '';
  apiErrors: string[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]+$/)],
        ],
        password: ['', [Validators.required, passwordRulesValidator]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordsMatchValidator }
    );

    // BUG F1: Only listens to confirmPassword changes.
    // If the user fills in confirmPassword first and then changes the password,
    // the mismatch is never re-evaluated and no error is shown.
    this.registerForm.get('confirmPassword')!.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')!.updateValueAndValidity({ onlySelf: true });
    });
  }

  get passwordCtrl() { return this.registerForm.get('password')!; }
  get confirmCtrl()  { return this.registerForm.get('confirmPassword')!; }
  get usernameCtrl() { return this.registerForm.get('username')!; }

  get strength(): { label: string; css: string } {
    const pw = this.passwordCtrl.value ?? '';
    const s = passwordStrength(pw);
    return {
      label: s.charAt(0).toUpperCase() + s.slice(1),
      css: s,
    };
  }

  hasPasswordError(code: string): boolean {
    const errs: string[] = this.passwordCtrl.getError('passwordRules') ?? [];
    return this.passwordCtrl.touched && errs.includes(code);
  }

  onSubmit(): void {
    // BUG F2: Checks registerForm.pristine instead of registerForm.invalid.
    // A form that has been touched but is still invalid will NOT be blocked —
    // the request fires even though the frontend validation failed.
    if (this.registerForm.pristine) return;

    this.successMessage = '';
    this.apiErrors = [];

    const { username, password, confirmPassword } = this.registerForm.value;

    this.authService.register({ username, password, confirmPassword }).subscribe(response => {
      if (response?.message) {
        this.successMessage = response.message;
        this.registerForm.reset();
      }
      // Note: when the service returns null (due to BUG F3), nothing happens here.
    });
  }
}
