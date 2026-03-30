# API Installation

Follow these steps to run the Ubuntu Docs .NET 10 API locally using Docker.

## Prerequisites

* Docker Desktop installed
* Visual Studio
* .NET 10 SDK (optional for local non-Docker runs)
* SQL Server or your configured database connection
* Access to required secrets:

  * `ConnectionStrings__DefaultConnection`
  * `Gemini__ApiKey`
  * `AzureBlob__ConnectionString`
  * `AzureBlob__ContainerName`
  * `JwtConfig__AccessTokenSecret`
  * `JwtConfig__RefreshTokenSecret`

## Project Structure

```text
UbuntuProject/
├── ubuntu-docs/
│   ├── Application/
│   │   ├── Constants/
│   │   ├── DTOs/
│   │   ├── Interfaces/
│   │   │   ├── IRepositories/
│   │   │   └── IServices/
│   │   └── Services/
│   ├── Controllers/
│   ├── Data/
│   ├── Domain/
│   │   └── Entities/
│   ├── Infrastructure/
│   │   ├── Integration/
│   │   │   ├── Auth/
│   │   │   └── GeminiService/
│   │   └── Repositories/
│   ├── Program.cs
```

## Build and Run with Docker

From the BE folder

```bash
UbuntuProject/ubuntu-docs/
```
run:
```bash
docker compose up --build
```

This will:

* Build the .NET 10 API image
* Start the API container
* Expose the API on port `8080`

## Access the API

Once running, open:

```text
http://localhost:8080/swagger
```

## Environment Variables

The API uses environment variables defined in `docker-compose.yml`.

Example:

```yaml
environment:
  ASPNETCORE_ENVIRONMENT: Production
  ConnectionStrings__DefaultConnection: "YOUR_CONNECTION_STRING"
  Gemini__ApiKey: "YOUR_GEMINI_KEY"
  AzureBlob__ConnectionString: "YOUR_BLOB_CONNECTION"
  AzureBlob__ContainerName: "YOUR_CONTAINER_NAME"
  JwtConfig__Issuer: "https://localhost:7114"
  JwtConfig__Audience: "http://localhost:5173"
  JwtConfig__AccessTokenSecret: "YOUR_ACCESS_SECRET"
  JwtConfig__RefreshTokenSecret: "YOUR_REFRESH_SECRET"
```

## Stop the API

To stop the running containers:

```bash
docker compose down
```

## Local Development Without Docker

To run directly with the .NET CLI:

```bash
cd ubuntu-docs
dotnet restore
dotnet run
```

The API will use the launch settings from `Properties/launchSettings.json`.
