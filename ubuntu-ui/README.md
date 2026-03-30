# React + TypeScript + Vite

# Ubuntu UI Installation

Follow these steps to run the Ubuntu UI frontend locally

## Tech Stack

* React 19
* Vite 8
* TypeScript
* Tailwind CSS
* React Router DOM
* Axios
* Zustand
* Recharts
* i18next
* Text-to-Speech support


## Available Scripts

From the `ubuntu-ui` folder:

```bash
npm install
npm run dev
```

### Other scripts

```bash
npm run build
npm run lint
npm run preview
```

## Local Development

Start the Vite development server:

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:5173
```

## Docker Setup

Build the frontend container:

```bash
docker build -t ubuntu-ui .
```

Run the container:

```bash
docker run -p 5173:80 ubuntu-ui
```

Open:

```text
http://localhost:5173
```