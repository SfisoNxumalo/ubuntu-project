# Ubuntu Alexa Skill – Local Setup & Troubleshooting Guide

This README explains how to run and test the Ubuntu Alexa Skill locally using the Alexa Developer Console simulator or a physical device.

---

### Flow

` User → Alexa → Ubuntu Backend API → AI Document Service → Alexa Response`

The Alexa skill acts as the voice interface layer on top of the backend APIs.

---

## Prerequisites

Before running the Alexa skill, make sure you have:

* Amazon Developer account
* Node.js installed
* ASK CLI *(optional but recommended)*
* Ubuntu backend API running locally
* ngrok installed
* Alexa-enabled device or Alexa Simulator in browser

---

## 1) Run the Backend API

Start the backend first.

```bash
cd ubuntu-docs
# run your .NET backend
 dotnet run
```

Example local API:

```text
https://localhost:5001/api/alexa
```

> Alexa cannot access localhost directly, so the next step is required.

---

## 2) Expose Local API Using ngrok

Run ngrok against your backend port.

```bash
ngrok http 5001
```

You will get a public HTTPS URL like:

```text
https://abc123.ngrok-free.app
```

Your Alexa endpoint becomes:

```text
https://abc123.ngrok-free.app/api/alexa
```

---

## 3) Create the Alexa Skill

1. Open the **Amazon Alexa Developer Console**
2. Click **Create Skill**
3. Name it: `Ubuntu`
4. Choose:

   * **Custom Skill**
   * **Node.js / Alexa-hosted** *(or provision your own backend webhook)*
5. Create the skill

---

## 4) Configure the Endpoint

Go to:

**Build → Endpoint**

Select:

* **HTTPS**
* Paste your ngrok HTTPS URL

Example:

```text
https://abc123.ngrok-free.app/api/alexa
```

For certificates choose:

* **My development endpoint has a certificate from a trusted CA**

---

## 5) Add Sample Intents

Recommended intents:

* `GetDocumentsIntent`
* `ReadDocumentIntent`
* `AskQuestionIntent`

### Sample Utterances

```text
open ubuntu assist
show my documents
read my insurance plan
ask what are the benefits
```
---

## 6) Test Using Alexa Simulator

Go to:

Test → Alexa Simulator

Enable testing and try:

```text
Alexa, open Ubuntu
```

Example journey:

1. Open skill
2. Request available documents
3. Select a document
4. Ask a natural language question
5. Receive spoken AI response

---

# Common Issues & Fixes

## Issue 1: Alexa says endpoint is not responding

### Cause

* Backend not running
* Wrong ngrok URL
* ngrok session expired

### Fix

* Restart backend
* Restart ngrok
* Update endpoint URL in Alexa Console

---

## Issue 2: Alexa cannot reach localhost

### Cause

Alexa services cannot call `localhost`

### Fix

Always expose local API with:

```bash
ngrok http 5001
```

---

## Issue 3: SSL certificate error

### Fix

Use the **HTTPS ngrok URL only**, never HTTP.

Correct:

```text
https://abc123.ngrok-free.app
```

Wrong:

```text
http://localhost:5001
```

## Issue 4: Alexa intent not matching

### Fix

* Rebuild interaction model
* Save model changes
* Retrain the skill
* Use exact sample utterances

---

## Notes for Hackathon Submission

The skill can be tested locally using the Alexa Developer Console simulator

For judging convenience, a recorded demo video of the live device experience is also included.
