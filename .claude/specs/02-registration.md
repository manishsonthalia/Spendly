# Spec: Registration

## Overview
Implement user registration so new visitors can create a Spendly account. This is the first step in the authentication flow: a user submits name, email, and password via the existing `/register` form; the server validates the input, hashes the password, inserts the user into the database, and redirects on success. Without this step no real users can exist in the system, making every subsequent authenticated feature impossible.

## Depends on
- Step 01: Database Setup — `users` table and `get_db()` must exist and be working.

## Routes
- `POST /register` — Accept registration form submission, validate, insert user, redirect — public

## Database changes
No database changes. The `users` table (id, name, email, password_hash, created_at) was defined in Step 01 and is used as-is.

## Templates
- Modify: `templates/register.html` — add inline validation error display per field (already has `{% if error %}` block; extend to support per-field errors if needed)

## Files to change
- `app.py` — add POST handler for `/register`; import `generate_password_hash` from werkzeug; import `get_db`

## Files to create
No new files.

## New dependencies
No new dependencies.

## Rules for implementation
- No SQLAlchemy or ORMs
- Parameterised queries only — never use string formatting in SQL
- Passwords hashed with `werkzeug.security.generate_password_hash`
- Use CSS variables — never hardcode hex values
- All templates extend `base.html`
- Validate server-side: name required, valid email format, password minimum 8 characters
- On duplicate email, catch the `IntegrityError` and re-render the form with a clear error message — do not crash
- On success, redirect to `/login` (session management comes in a later step)
- Strip and lowercase the email before storing

## Definition of done
- [ ] Submitting the form with valid data inserts a new row in `users` with a hashed password
- [ ] The stored password is never plaintext — `generate_password_hash` output is visible in the DB
- [ ] Submitting with a duplicate email re-renders the form with an error message, no crash
- [ ] Submitting with an empty name, invalid email, or password shorter than 8 characters re-renders the form with an error message
- [ ] Successful registration redirects to `/login`
- [ ] The `GET /register` route still renders the empty form unchanged
- [ ] No raw SQL string interpolation anywhere in the handler
