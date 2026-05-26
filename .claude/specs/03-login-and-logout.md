# Spec: Login and Logout

## Overview
Implement session-based login and logout so registered users can authenticate with Spendly. A user submits their email and password via the existing `/login` form; the server verifies the credentials against the hashed password in the database and, on success, stores the user's `id` and `name` in a Flask session cookie. The `/logout` route clears the session and redirects to the landing page. This completes the core authentication loop and gates all future logged-in features behind a real session check.

## Depends on
- Step 01: Database Setup — `users` table and `get_db()` must exist.
- Step 02: Registration — at least one real user must be in the database.

## Routes
- `POST /login` — Accept login form, verify credentials, set session, redirect to `/profile` — public
- `GET /logout` — Clear the Flask session, redirect to `/` — logged-in

## Database changes
No database changes. The `users` table already stores `id`, `email`, and `password_hash` which are all that is needed.

## Templates
- Modify: `templates/login.html` — preserve the submitted email in the input on error (add `value="{{ email or '' }}"`)
- Modify: `templates/base.html` — update the nav to show "Sign out" link (`/logout`) when the user is logged in, and "Sign in" / "Get started" when logged out; use `session.get('user_id')` to determine state

## Files to change
- `app.py` — add `app.secret_key`; implement POST handler for `/login`; implement GET `/logout`; import `check_password_hash` from werkzeug; import `session` from flask

## Files to create
No new files.

## New dependencies
No new dependencies. `werkzeug.security` and `flask.session` are already available.

## Rules for implementation
- No SQLAlchemy or ORMs
- Parameterised queries only — never use string formatting in SQL
- Passwords hashed with werkzeug (`check_password_hash` for verification)
- Use CSS variables — never hardcode hex values
- All templates extend `base.html`
- `secret_key` must be a hard-coded string for now (environment variable support comes later); use a non-trivial string (not "secret" or "dev")
- Store only `user_id` (int) and `user_name` (str) in the session — never store the password hash
- On login failure (wrong email or wrong password), show a single generic error "Invalid email or password" — do not reveal which field is wrong
- After successful login, redirect to `/profile`
- `/logout` must clear the entire session (`session.clear()`) then redirect to `/`

## Definition of done
- [ ] Submitting correct email and password sets a session and redirects to `/profile`
- [ ] Submitting a wrong password re-renders `/login` with the error "Invalid email or password" and the email pre-filled
- [ ] Submitting an email that does not exist re-renders `/login` with the same generic error
- [ ] After login, `session['user_id']` and `session['user_name']` are set
- [ ] Visiting `/logout` clears the session and redirects to `/`
- [ ] After logout, `session.get('user_id')` returns `None`
- [ ] The nav in `base.html` shows "Sign out" when logged in and "Sign in" / "Get started" when logged out
- [ ] The demo user (`demo@spendly.com` / `demo123`) can log in successfully
