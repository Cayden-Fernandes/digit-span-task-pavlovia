````markdown
# Digit Span Task (JavaScript + Pavlovia)

A browser-based **Digit Span Task** implemented in **JavaScript** using **PsychoJS**, designed for online cognitive psychology experiments and deployment through **Pavlovia**.

---

## 📖 Overview

This project implements a browser-based **Digit Span Task**, a cognitive psychology experiment used to assess **short-term memory** and **working memory capacity**.

Participants are presented with sequences of digits one at a time and must recall them in the correct order using an on-screen numeric keypad. The application automatically records participant responses, response times, and trial accuracy before securely saving the data through Pavlovia.

This project was developed as an **independent educational side project** exploring web technologies, PsychoJS, and online behavioural experiment development.

---

## ✨ Features

- Browser-based experiment
- Built with PsychoJS
- Compatible with Pavlovia
- Anonymous participant ID validation
- Auto-generated study codes
- Random digit sequence generation
- Multiple span lengths
- Interactive numeric keypad
- Trial-by-trial scoring
- Response time measurement
- Automatic data recording
- Debrief screen
- Responsive interface

---

## 🧠 Experiment Workflow

1. Enter Participant ID
2. Generate anonymous Study Code
3. Display experiment instructions
4. Present digit sequence
5. Participant recalls digits
6. Record response and response time
7. Score trial accuracy
8. Save data
9. Display debrief page
10. Submit results

---

## 📊 Data Recorded

Each trial stores:

- Study Code
- Participant ID
- Trial Number
- Span Length
- Presented Digit Sequence
- Participant Response
- Accuracy
- Response Time (seconds)
- Trials Completed
- Session Status

---

## 🛠 Technologies

- JavaScript (ES6)
- PsychoJS 2025.1.1
- HTML5
- CSS3
- Pavlovia

---

## 📂 Project Structure

```text
digit-span-task-js-pavlovia/
│
├── digit-span-task.js      # Main experiment logic
├── index.html              # Entry point
├── lib/                    # PsychoJS library
├── resources/              # Optional resources
└── README.md
````

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/digit-span-task-pavlovia.git
```

Move into the project directory:

```bash
cd digit-span-task-js-pavlovia
```

Serve the project using a local web server.

> **Note:** PsychoJS experiments should not be opened directly via `index.html`. Please deploy through Pavlovia.

---

## 🌐 Deploying to Pavlovia

1. Create a Pavlovia project.
2. Upload the project files.
3. Synchronise with GitLab.
4. Pilot/ Run the experiment.
5. Publish the study.

---

## 📥 Downloading Experiment Data

After participants have completed the experiment, the collected data can be downloaded directly from **Pavlovia**.

### Steps

1. Log in to your Pavlovia account.
2. Open your experiment.
3. Navigate to **Experiments → Results**.
4. Download the experiment data as a **CSV (.csv)** file.

### Viewing the Data

The downloaded CSV file can be opened using:

- **Microsoft Excel** – for viewing, sorting, filtering, and basic statistical analysis.
- **DB Browser for SQLite** – if you wish to import the CSV into a SQLite database for querying and analysis using SQL.

### Importing into DB Browser for SQLite

1. Open **DB Browser for SQLite**.
2. Create a new SQLite database (or open an existing one).
3. Select **File → Import → Table from CSV file...**
4. Choose the downloaded Pavlovia CSV file.
5. Import the data into a new table.
6. Run SQL queries to analyse participant responses, accuracy, response times, and other recorded variables.

### Recorded Variables

The CSV contains one row per trial and includes variables such as:

| Variable | Description |
|----------|-------------|
| `study_code` | Anonymous study identifier |
| `participant_id` | Participant ID entered at the start |
| `trial_number` | Trial number |
| `span_length` | Number of digits presented |
| `digit_sequence` | Presented digit sequence |
| `response` | Participant's recalled sequence |
| `correct` | Accuracy (1 = Correct, 0 = Incorrect) |
| `response_time` | Response time in seconds |
| `trials_completed` | Number of completed trials |
| `session_status` | Experiment completion status |

The CSV format allows the data to be analysed using Microsoft Excel, SQL databases, SPSS, R, Python, or other statistical software.

---

## 📈 Future Improvements

* Adaptive digit span
* Backward digit span mode
* Keyboard input support
* Mobile optimisation
* Progress indicator
* Enhanced data export
* Additional cognitive tasks

---

## 👨‍💻 Author

**Cayden Fernandes**

Computer Science Student

Independent Research & Software Development Project

2026

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for educational and research purposes.

---

## ⭐ Acknowledgements

* PsychoJS
* Pavlovia
* Open-source JavaScript community

```
```
