# Developer Test Prep

A free, local study application for developers preparing for technical assessments and the **AWS Certified Solutions Architect - Associate (SAA-C03)** exam.

I originally built this as part of my own preparation as a self-taught developer. Instead of bouncing between paid practice sites, coding challenge platforms, notes, and certification resources, I wanted one place where I could practice the material locally.

The project currently includes:

* AWS SAA-C03 practice questions
* Data Structures & Algorithms coding challenges
* DSA pattern-recognition exercises
* Real-world JavaScript challenges
* AI / red-team style code-review exercises

Everything runs locally in your browser.

There is **no backend, database server, account, subscription, or API key required**.

## Quick Start

### Requirements

You will need:

* [Node.js](https://nodejs.org/) with npm
* A modern desktop browser
* Git, or the ability to download the repository as a ZIP

### Clone the repository

```bash
git clone <YOUR-REPOSITORY-URL>
cd <YOUR-REPOSITORY-NAME>/client
```

### Install dependencies

```bash
npm install
```

### Start the application

```bash
npm run dev
```

Vite will display a local URL in your terminal, typically:

```text
http://localhost:5173
```

Open that URL in your browser.

To stop the development server:

```bash
Ctrl+C
```

## How It Works

The application is currently client-only.

Practice content is stored locally with JavaScript data files rather than through an external database.

User progress is stored in browser `localStorage`, which means:

* No account is required
* No information is sent to a backend
* Progress stays on the browser/device where you practiced
* Clearing browser site data will clear saved progress

## Practice Tracks

| Track            | Description                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| **AWS SAA**      | Multiple-choice and multiple-response practice for AWS Solutions Architect Associate concepts   |
| **DSA**          | JavaScript coding challenges evaluated against test cases                                       |
| **DSA Patterns** | Practice identifying the underlying data structure or algorithm before implementation           |
| **Real World**   | Applied JavaScript problems, debugging exercises, code review, and AI/red-team style challenges |

## Coding Challenges

The built-in coding environment currently supports **JavaScript only**.

For DSA and Real World coding challenges:

* Write the requested function or class
* Run the included tests
* Your code executes locally in the browser
* Solutions are evaluated based on whether they pass the provided tests
* You are not required to reproduce a specific reference solution

Code is executed inside a sandboxed Web Worker.

Python, Java, TypeScript, C++, and other languages are not currently supported by the in-app editor.

## AWS Practice

The AWS section is intended as an independent study resource for concepts relevant to the **AWS Certified Solutions Architect - Associate (SAA-C03)** exam.

This project is independently created and is **not affiliated with, endorsed by, or sponsored by Amazon Web Services**.

The questions in this repository are intended to be original practice material and should not contain confidential or reproduced AWS Certification exam questions.

AWS, Amazon Web Services, and related service names are trademarks of Amazon.com, Inc. or its affiliates.

## Useful Commands

Run these commands from the `client/` directory.

| Command            | Purpose                            |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Start the local development server |
| `npm run build`    | Create a production build          |
| `npm run lint`     | Run ESLint                         |
| `npm run validate` | Validate practice content          |
| `npm run test:dsa` | Run DSA reference/grader checks    |
| `npm run test:rw`  | Run Real World challenge checks    |

## Project Structure

The primary application lives inside:

```text
client/
```

Practice-question data is currently stored locally in JavaScript data files.

No external database is required.

## Who This Is For

This project may be useful if you are:

* Preparing for developer technical assessments
* Practicing common DSA patterns
* Preparing for AWS SAA-C03
* Learning JavaScript problem solving
* Practicing debugging and code review
* Preparing for AI-assisted coding or code-evaluation work
* A self-taught developer looking for structured practice without another subscription

It is not intended to replace LeetCode, AWS Skill Builder, official AWS documentation, or other dedicated training platforms.

It is simply another free tool you can run locally and use as much as you want.

## Contributions

This repository is publicly available, but I am **not currently accepting outside contributions or pull requests by default**.

I may open the project to broader community development in the future.

If you find a problem, have an idea, or are interested in contributing later, you can contact:

**[support@devheadllc.com](mailto:support@devheadllc.com)**

## License

Licensed under the **MIT License**.

See [`LICENSE`](LICENSE) for details.

## Disclaimer

This project is provided for educational and practice purposes.

Passing practice questions or coding challenges does not guarantee certification, employment, interview performance, or assessment results.
