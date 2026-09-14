# API Test Commands (curl)

Backend must be running on `http://localhost:5000` before running these.

---

## B1 — Health Check

```bash
curl -i http://localhost:5000/
```

**Expected:** `200 OK`, body `{ "status": "ok" }`

---

## B2 — GET all projects

```bash
curl -i http://localhost:5000/api/projects
```

**Expected:** `200 OK`, JSON array of at least 3 project objects.

---

## B3 — GET a single project

### Success case
```bash
curl -i http://localhost:5000/api/projects/weather
```
**Expected:** `200 OK`, JSON object for the "weather" project.

### Failure case — unknown id
```bash
curl -i http://localhost:5000/api/projects/does-not-exist
```
**Expected:** `404 Not Found`, body `{ "error": "Project not found" }`

---

## B4 — POST a contact submission

### Success case
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "message": "Hello from curl"}'
```
**Expected:** `201 Created`, body includes `message` and the saved `submission`.

### Failure case — missing name
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "message": "Hello"}'
```
**Expected:** `400 Bad Request`, body `{ "error": "Name is required" }`

### Failure case — missing email
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "message": "Hello"}'
```
**Expected:** `400 Bad Request`, body `{ "error": "Email is required" }`

### Failure case — invalid email format
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "not-an-email", "message": "Hello"}'
```
**Expected:** `400 Bad Request`, body `{ "error": "Enter a valid email" }`

### Failure case — missing message
```bash
curl -i -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}'
```
**Expected:** `400 Bad Request`, body `{ "error": "Message is required" }`

---

## B5 — GET all contact submissions

```bash
curl -i http://localhost:5000/api/contact
```
**Expected:** `200 OK`, JSON array including the submission created in B4's success case above.

---

## B6 — Centralized error handling / undefined route

```bash
curl -i http://localhost:5000/api/doesnotexist
```
**Expected:** `404 Not Found`, JSON body `{ "error": "Route /api/doesnotexist not found" }` — not an HTML error page. Server should still be running and responsive after this request (verify by re-running the B1 health check).

---

## B7 — CORS check

CORS cannot be fully verified via curl (it's a browser-enforced policy), but you can confirm the header is present:

```bash
curl -i -H "Origin: http://localhost:5173" http://localhost:5000/api/projects
```
**Expected:** Response headers include `Access-Control-Allow-Origin: http://localhost:5173`.

The full CORS check is done in the browser: open the frontend at `http://localhost:5173`, load the Projects and Contact pages, and confirm no CORS errors appear in the DevTools console.
