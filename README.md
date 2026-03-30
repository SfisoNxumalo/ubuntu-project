# Ubuntu — Accessible Document Intelligence for Visually Impaired Users

![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white) ![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white) ![MicrosoftSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)  ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)  ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

- [Backend README.md](./ubuntu-docs/README.md)
- [Frontend README.md](./ubuntu-ui/README.md)
- [Alexa project README.md](./ubuntu_assist_amaz)

[Deployed App](https://ubuntu-frontend.azurewebsites.net/) Note: Sometimes you have to wait ~15 sec for the backend to respond from a cold start.

[Youtube Demo](https://youtu.be/CI7CypSTT4c?si=9I-0ivQ87Udi9dnZ)

## Problem Statement

Millions of visually impaired users struggle to access important documents such as insurance policies, banking statements, healthcare forms, academic records, and service agreements.

Traditional screen readers force users to consume content one element at a time, making it difficult to quickly scan, understand, and interact with long-form documents. In many real-world scenarios, users rely on other people to explain critical information, which reduces independence, privacy, and confidence.

Service providers such as insurance companies, banks, universities, and healthcare organizations also lack an easy way to deliver document content in a way that is truly accessible.

Ubuntu Assist solves this by turning static PDF documents into an interactive conversational experience.

---

##  Our Solution

Ubuntu Assist is an AI-powered accessible document platform that enables service providers to upload PDF documents and securely share them with visually impaired users.

What makes Ubuntu Assist unique is its multi-channel accessibility experience. Users can interact with their documents through both a web-based conversational interface and a voice-first experience powered by Amazon Alexa

Instead of forcing users to read entire documents line-by-line, Ubuntu allows them to:

* Receive documents from trusted service providers
* Ask natural language questions about a specific document
* Receive simple, accessible answers grounded in the document
* Interact hands-free using Alexa voice commands
* Consume information in a conversational and less overwhelming way

This improves:

* Accessibility
* Privacy
* User independence
* Faster understanding of important documents
* Hands-free access through voice interaction

---

## User Roles

### 1) User

Represents the visually impaired client or end user.

Users can be:

* Registered and manage their profile
* Grant or revoke service provider access
* View assigned documents
* Ask questions about documents
* Track read status

### 2) Service Provider

Represents organizations such as:

* Insurance companies
* Banks
* Universities
* Government departments
* Healthcare providers

Service providers can:

* Register their organization
* View users who granted them access
* Upload PDF documents
* Assign documents to authorized users
* Manage document delivery


##  Core Technical Flow
![alt text](<Screenshot 2026-03-30 011210-1.png>)
###  Document Upload Flow

1. Service provider selects an authorized user
2. PDF document is uploaded
3. Extracted content is saved in the database
4. Original PDF is stored in Azure Blob Storage

###  Document Q&A Flow

1. User selects an assigned document
2. User asks a question in natural language
6. Response is returned

---

## Cloud & Storage

##### Azure App Service

Used to deploy Frontend and Backend

##### Azure SQL

Used to store data.

##### Azure Blob Storage

Used to store original PDF files securely.

--- 
##  Why Ubuntu Matters

Ubuntu Assist does not replace existing assistive technologies.

Instead, it provides an alternative layer of document accessibility focused on:

* understanding
* interaction
* independence
* secure delivery

This makes important documents easier to navigate for users who would otherwise struggle with traditional screen reader workflows.

---

## Future Enhancements

* 🧠 document chunking and semantic search
* ☁️ Azure AI Search indexing
* 💬 chat history per document
* 📊 provider analytics
* 🌐 multilingual support
* 📝 Document completion

---

##  Hackathon Value Proposition

Ubuntu Assist combines:

* accessibility
* AI
* Voice
* privacy
* cloud storage
* real-world service provider workflows

into a practical solution that can improve how visually impaired users interact with essential documents.

Our goal is simple:
> Give visually impaired users independent, secure, and conversational access to documents that matter.
