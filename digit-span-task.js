/*****************
 * Digit Span Task 
 *****************/
import { core, util, visual } from './lib/psychojs-2025.1.1.js';

const { PsychoJS, Mouse } = core;
const { Scheduler } = util;

let expName = 'digit-span-task';

// ADDED FOR DATA TRACKING
let trialStartTime = 0;
let responseTime = 0;
let session_status = "ABORTED";

let expInfo = {
    'Study code (auto)': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'Participant ID (username)': ''
};

const psychoJS = new PsychoJS({ debug: true });

psychoJS.openWindow({
    fullscr: true,
    color: new util.Color('white'),
    units: 'height'
}); 

const flowScheduler = new Scheduler(psychoJS);
psychoJS.schedule(flowScheduler);


/*****************
 * Participant Dialog
 *****************/

async function showParticipantDialog() {
    return new Promise(resolve => {
        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(5px);
            z-index: 999;
        `;

        const dialog = document.createElement("div");
        dialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 35px 40px;
            border-radius: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            min-width: 320px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            box-sizing: border-box;
            animation: slideIn 0.3s ease;
        `;

        // Add animation keyframes
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
        `;
        document.head.appendChild(style);

        dialog.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
    
                <h2 style="
                    margin: 0;
                    color: #1a2b3c;
                    font-size: 24px;
                    font-weight: 600;
                    letter-spacing: -0.5px;
                ">Welcome!</h2>
                <p style="
                    color: #5a6b7c;
                    margin: 8px 0 0;
                    font-size: 15px;
                ">${expName}</p>
            </div>

            <div style="
                background: #fef9e7;
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 20px;
                border-left: 4px solid #f1c40f;
                font-size: 14px;
                line-height: 1.5;
            ">
                <div style="font-weight: 700; color: #7d5d23; margin-bottom: 5px;">
                    📋 Participant ID Format:
                </div>
                <div style="color: #5a4a2a;">
                    <strong>Last 3 letters of mother's maiden name + birthday + month</strong><br>
                    Example: If your mother's maiden name ends with "HTA", your birthday is 24th October → <strong>HTA2410</strong>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="
                    display: block;
                    margin-bottom: 8px;
                    color: #2c3e50;
                    font-weight: 500;
                    font-size: 14px;
                ">Participant ID</label>
                <input id="pid" placeholder="e.g., HTA2410" style="
                    width: 100%;
                    padding: 14px 16px;
                    font-size: 15px;
                    border: 2px solid #e1e8ed;
                    border-radius: 12px;
                    outline: none;
                    transition: all 0.2s;
                    box-sizing: border-box;
                    background: #f8fafc;
                    text-transform: uppercase;
                ">
                <div id="format-hint" style="
                    font-size: 12px;
                    color: #6b7280;
                    margin-top: 6px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                ">
                    <span> Format: 3 letters + 4 digits (e.g., HTA2410)</span>
                </div>
            </div>

            <div style="
                background: #f0f7ff;
                border-radius: 12px;
                padding: 15px;
                margin-bottom: 25px;
                border-left: 4px solid #0066cc;
            ">
                <div style="
                    color: #0066cc;
                    font-size: 13px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 5px;
                ">Auto-generated Study Code</div>
                <div style="
                    font-family: 'Courier New', monospace;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1a2b3c;
                ">${expInfo['Study code (auto)']}</div>
            </div>

            <button id="startBtn" style="
                width: 100%;
                padding: 16px 20px;
                font-size: 16px;
                font-weight: 600;
                background: linear-gradient(135deg, #1a2b3c 0%, #2c3e50 100%);
                color: white;
                border: none;
                border-radius: 14px;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
                box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0,102,204,0.3)'" 
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,102,204,0.2)'">
                Continue to Experiment →
            </button>

            <p style="
                text-align: center;
                margin: 15px 0 0;
                color: #8a9aa8;
                font-size: 12px;
            ">Press Enter to continue</p>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(dialog);

        const input = document.getElementById("pid");
        input.focus();

        // Auto-capitalize letters
        input.addEventListener('input', () => {
            let value = input.value;
            // Split into letters and numbers
            const letters = value.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
            const numbers = value.replace(/[^0-9]/g, '').slice(0, 4);

            if (value.length > 0) {
                if (letters.length < 3) {
                    input.value = letters;
                } else {
                    input.value = letters + numbers;
                }
            }
        });

        // Add input focus effect
        input.addEventListener('focus', () => {
            input.style.borderColor = '#0066cc';
            input.style.background = 'white';
        });

        input.addEventListener('blur', () => {
            input.style.borderColor = '#e1e8ed';
            input.style.background = '#f8fafc';
        });

        const startBtn = document.getElementById("startBtn");

        function validateParticipantID(id) {
            // Format: 3 letters + 4 digits (e.g., HTA2410)
            const pattern = /^[A-Z]{3}[0-9]{4}$/;
            return pattern.test(id);
        }

        function showError(message) {
            input.style.borderColor = '#dc3545';
            input.style.background = '#fff5f5';

            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = `
                color: #dc3545;
                font-size: 13px;
                margin-top: 8px;
                padding: 10px;
                background: #fee;
                border-radius: 8px;
                text-align: left;
                font-weight: 500;
            `;
            errorMsg.textContent = message;

            const existingError = dialog.querySelector('.error-message');
            if (existingError) existingError.remove();

            errorMsg.className = 'error-message';
            input.parentNode.appendChild(errorMsg);

            // Update format hint color
            const hint = document.getElementById('format-hint');
            if (hint) hint.style.color = '#dc3545';

            setTimeout(() => {
                input.style.borderColor = '#e1e8ed';
                input.style.background = '#f8fafc';
                if (errorMsg.parentNode) errorMsg.remove();
                if (hint) hint.style.color = '#6b7280';
            }, 3000);
        }

        function handleSubmit() {
            const val = input.value.trim().toUpperCase();

            if (!val) {
                showError('Please enter your Participant ID');
                return;
            }

            if (!validateParticipantID(val)) {
                showError('Invalid format! Use 3 letters + 4 digits (e.g., HTA2410)');
                return;
            }

            // Store the uppercase version
            expInfo['Participant ID (username)'] = val;

            // Fade out animation
            overlay.style.transition = 'opacity 0.2s';
            dialog.style.transition = 'opacity 0.2s, transform 0.2s';
            overlay.style.opacity = '0';
            dialog.style.opacity = '0';
            dialog.style.transform = 'translate(-50%, -40%)';

            setTimeout(() => {
                overlay.remove();
                dialog.remove();
                style.remove();
                resolve();
            }, 200);
        }

        startBtn.onclick = handleSubmit;

        // Handle Enter key
        input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
            }
        };
    });
}


/*****************
 * Scheduler wrapper (important fix)
 *****************/

function showParticipantDialogRoutine() {
    return async function() {
        await showParticipantDialog();
        return Scheduler.Event.NEXT;
    };
}


flowScheduler.add(showParticipantDialogRoutine());
flowScheduler.add(updateInfo);
flowScheduler.add(experimentInit);
flowScheduler.add(digitSpanRoutineBegin());
flowScheduler.add(digitSpanRoutineEachFrame());
flowScheduler.add(digitSpanRoutineEnd());

psychoJS.start({ expName, expInfo });


/*****************
 * Variables
 *****************/

let phaseClock;
let mouse;
let mouseWasPressed = false;

const TRIAL_SEQUENCE = [3, 3, 4, 4, 4, 5, 5, 5, 5, 6];

const TIMING = { display: 0.3, isi: 0.3, response: 27 };

let phase;
let trialIndex;
let sequence;
let response;
let totalCorrect;

let instrStim, readyStim, digitStim, promptStim, responseStim, finalStim;

let startButtonRect, startButtonText;
let continueButtonRect, continueButtonText;

let keypadButtons = [];
let keypadLabels = [];

const keypadLayout = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["⌫", "0", "✓"]
];


/*****************
 * Setup
 *****************/

async function updateInfo() {

    expInfo.date = util.MonotonicClock.getDateStr();

    //SET CUSTOM FILE NAME (SAFE LOCATION)
    psychoJS.experiment.dataFileName =
        `${expInfo['Study code (auto)']}_digit-span-task`;

    return Scheduler.Event.NEXT;

}

async function experimentInit() {
    phaseClock = new util.Clock();
    mouse = new Mouse({ win: psychoJS.window });
    return Scheduler.Event.NEXT;
}


/*****************
 * Digit generator
 *****************/

function generateDigitSequence(length) {

    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let seq = [];

    for (let i = 0; i < length; i++) {

        let options = digits.filter(d => d !== seq[i - 1]);
        seq.push(options[Math.floor(Math.random() * options.length)]);

    }

    return seq;

}


/*****************
 * UI helpers
 *****************/

function createRectButton(x, y, width, height, label, fontSize = 0.04) {

    const rect = new visual.Rect({
        win: psychoJS.window,
        width,
        height,
        pos: [x, y],
        fillColor: new util.Color([0.92, 0.92, 0.92]),
        lineColor: new util.Color('black')
    });

    const text = new visual.TextStim({
        win: psychoJS.window,
        text: label,
        pos: [x, y],
        height: fontSize,
        color: new util.Color('black')
    });

    return { rect, text };

}


function createKeypad() {

    keypadButtons = [];
    keypadLabels = [];

    const startX = -0.20;
    const startY = -0.01;
    const gapX = 0.20;
    const gapY = 0.12;

    for (let r = 0; r < keypadLayout.length; r++) {

        for (let c = 0; c < keypadLayout[r].length; c++) {

            const label = keypadLayout[r][c];

            const x = startX + c * gapX;
            const y = startY - r * gapY;

            const btn = new visual.Rect({
                win: psychoJS.window,
                width: 0.18,
                height: 0.11,
                pos: [x, y],
                fillColor: new util.Color([0.92, 0.92, 0.92]),
                lineColor: new util.Color('black')
            });

            const txt = new visual.TextStim({
                win: psychoJS.window,
                text: label,
                pos: [x, y],
                height: 0.045,
                color: new util.Color('black')
            });

            keypadButtons.push(btn);
            keypadLabels.push(txt);

        }

    }

}

function setKeypadVisible(v) {
    keypadButtons.forEach(b => b.setAutoDraw(v));
    keypadLabels.forEach(t => t.setAutoDraw(v));
}

function justClicked() {
    const pressed = mouse.getPressed()[0] === 1;
    const result = pressed && !mouseWasPressed;
    mouseWasPressed = pressed;
    return result;
}

function clickedOn(stim) {
    return mouse.isPressedIn(stim);
}


/*****************
 * Begin routine
 *****************/

function digitSpanRoutineBegin() {

    return async function() {

        phase = "instructions";
        trialIndex = 0;
        response = "";
        totalCorrect = 0;

        instrStim = new visual.TextStim({
            win: psychoJS.window,
            text: "DIGIT SPAN TASK\n\nTap START to begin & Remember the digits in order.",
            height: 0.06, // increase te font size. (0.03)
            wrapWidth: 0.9, // add text wrapping for better readability on smaller screens
            color: new util.Color('black'),
            pos: [0, 0.10]  // [x, y] - positive y moves up, negative y moves down
        });

        readyStim = new visual.TextStim({
            win: psychoJS.window,
            text: "Ready?",
            height: 0.08,
            color: new util.Color('black')
        });

        digitStim = new visual.TextStim({
            win: psychoJS.window,
            text: "",
            height: 0.12,
            color: new util.Color('black')
        });

        promptStim = new visual.TextStim({
            win: psychoJS.window,
            text: "Tap digits then ✓",
            pos: [0, 0.24],
            height: 0.04,
            color: new util.Color('black')
        });

        responseStim = new visual.TextStim({
            win: psychoJS.window,
            pos: [0, 0.10],
            height: 0.08,
            color: new util.Color('black')
        });

        finalStim = new visual.TextStim({
            win: psychoJS.window,
            text: "",
            height: 0.06,
            color: new util.Color('black')
        });

        const startBtn = createRectButton(0, -0.20, 0.34, 0.12, "START"); // [x, y, width, height, text]
        startButtonRect = startBtn.rect;
        startButtonText = startBtn.text;

        const continueBtn = createRectButton(0, -0.23, 0.40, 0.12, "CONTINUE"); // [x, y, width, height, text]
        continueButtonRect = continueBtn.rect;
        continueButtonText = continueBtn.text;

        createKeypad();

        instrStim.setAutoDraw(true);
        startButtonRect.setAutoDraw(true);
        startButtonText.setAutoDraw(true);

        return Scheduler.Event.NEXT;

    };

}


/*****************
 * Main routine
 *****************/

function digitSpanRoutineEachFrame() {

    return async function() {

        if (phase === "instructions") {

            if (justClicked() && clickedOn(startButtonRect)) {

                instrStim.setAutoDraw(false);
                startButtonRect.setAutoDraw(false);
                startButtonText.setAutoDraw(false);

                readyStim.setAutoDraw(true);
                phaseClock.reset();
                phase = "ready";

            }

            return Scheduler.Event.FLIP_REPEAT;

        }


        if (phase === "ready") {

            if (phaseClock.getTime() > 1) {

                readyStim.setAutoDraw(false);
                sequence = generateDigitSequence(TRIAL_SEQUENCE[trialIndex]);

                phaseClock.reset();
                phase = "present";

            }

            return Scheduler.Event.FLIP_REPEAT;

        }


        if (phase === "present") {

            const totalTime = TIMING.display + TIMING.isi;
            const slot = Math.floor(phaseClock.getTime() / totalTime);

            if (slot >= sequence.length) {

                digitStim.setAutoDraw(false);

                response = "";
                responseStim.text = "";

                promptStim.setAutoDraw(true);
                responseStim.setAutoDraw(true);
                setKeypadVisible(true);

                phaseClock.reset();
                phase = "response";

                // ADDED FOR RESPONSE TIME
                trialStartTime = phaseClock.getTime();
                return Scheduler.Event.FLIP_REPEAT;

            }

            const within = phaseClock.getTime() - slot * totalTime;

            if (within < TIMING.display) {

                digitStim.text = sequence[slot];
                digitStim.setAutoDraw(true);

            } else {

                digitStim.setAutoDraw(false);

            }

            return Scheduler.Event.FLIP_REPEAT;

        }


        if (phase === "response") {

            if (phaseClock.getTime() > TIMING.response) {
                phase = "nextTrial";
            }

            if (justClicked()) {

                for (let i = 0; i < keypadButtons.length; i++) {

                    if (clickedOn(keypadButtons[i])) {

                        const val = keypadLabels[i].text;

                        if (val === "⌫") response = response.slice(0, -1);
                        else if (val === "✓") phase = "nextTrial";
                        else if (response.length < sequence.length) response += val;

                        break;

                    }

                }

            }

            responseStim.text = response ? response.split("").join(" ") : "---";


            if (phase === "nextTrial") {

                promptStim.setAutoDraw(false);
                responseStim.setAutoDraw(false);
                setKeypadVisible(false);

                // ADDED FOR RESPONSE TIME
                responseTime = phaseClock.getTime() - trialStartTime;

                const correct = (sequence.join("") === response);

                if (correct) totalCorrect++;

                const isLastTrial = (trialIndex + 1 >= TRIAL_SEQUENCE.length);

                if (isLastTrial) {
                    session_status = "COMPLETED";
                }

                psychoJS.experiment.addData("study_code", expInfo['Study code (auto)']);
                psychoJS.experiment.addData("participant_id", expInfo['Participant ID (username)']);
                psychoJS.experiment.addData("trial_number", trialIndex + 1);
                psychoJS.experiment.addData("span_length", sequence.length);
                psychoJS.experiment.addData("digit_sequence", sequence.join(" "));
                psychoJS.experiment.addData("response", response);
                psychoJS.experiment.addData("correct", correct ? 1 : 0);
                psychoJS.experiment.addData("response_time", responseTime.toFixed(3));

                // psychoJS.experiment.addData("trials_completed", TRIAL_SEQUENCE.length);

                psychoJS.experiment.addData("trials_completed", trialIndex + 1);
                psychoJS.experiment.addData("session_status", session_status);

                psychoJS.experiment.nextEntry();

                trialIndex++;

                // ADDED: MARK SESSION COMPLETE
                if (trialIndex >= TRIAL_SEQUENCE.length) {
                    session_status = "COMPLETED";

                    finalStim.text = "Follow the next steps to submit your results.";

                    finalStim.setAutoDraw(true);
                    continueButtonRect.setAutoDraw(true);
                    continueButtonText.setAutoDraw(true);

                    phase = "final";

                } else {

                    readyStim.setAutoDraw(true);
                    phaseClock.reset();
                    phase = "ready";

                }

            }

            return Scheduler.Event.FLIP_REPEAT;

        }


        if (phase === "final") {

            if (justClicked() && clickedOn(continueButtonRect)) {

                finalStim.setAutoDraw(false);
                continueButtonRect.setAutoDraw(false);
                continueButtonText.setAutoDraw(false);

                const canvas = document.querySelector("canvas");
                if (canvas) canvas.style.display = "none";

                showDebriefHTML();

            }

            return Scheduler.Event.FLIP_REPEAT;

        }

    };

}


/*****************
 * Routine End
 *****************/

function digitSpanRoutineEnd() {
    return async function() {
        return Scheduler.Event.NEXT;
    };
}


/*****************
 * Debrief
 *****************/

function showDebriefHTML() {

    document.body.insertAdjacentHTML("beforeend", `

    <div style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:white;
        overflow-y:auto;
        padding:30px;
        box-sizing:border-box;
        font-family:Arial;
        font-size:14px;
        color:black;
        line-height:1.3;
    ">
        <div style="max-width:1920px;margin:auto;">

            <h2>Debriefing Sheet</h2>

            <h2><a href="#submit-exit-button" style="
                font-size:19px; 
                color:red; 
                margin-left:0px; 
                font-weight:normal;
                text-decoration:none;
                border-bottom:1px dashed #cd1f1f;
                cursor:pointer;
            ">⬇️ Scroll down to Submit Results *</a></h2>

            <p><b>A Quantitative Study on the Effects of Stress on Memory Recall</b><br>
            Thank you for taking part in this study.</p> 


            <div style="text-align:center; margin-bottom:20px;">
                <p style="display: flex; align-items: center; justify-content: center; gap: 8px; background-color: #fff3cd; color: #856404; padding: 12px 20px; border-radius: 8px; border-left: 4px solid #ffc107; font-size: 16px; margin: 0;">
                    <span style="font-size: 24px;">⚠️</span>
                    <span><b>Ensure you submit your results before closing the browser tab.</b></span>
                </p>
            </div>

            <div style="text-align:center;margin-top:30px;" id="submit-exit-button">
                <button onclick="endExperiment()" style="
                    padding:12px 28px;
                    font-size:16px;
                    background:#333;
                    color:white;
                    border:none;
                    cursor:pointer;
                    border-radius:6px;
                ">
                    Submit & Exit
                </button>
            </div>

            <div style="
                margin-top: 40px;
                padding-top: 20px;
                text-align: center;
                border-top: 2px dashed #dde2e8;
                color: #8a9aa8;
                font-size: 12px;
            ">
                <p>© 2026 Cayden Fernandes</p>
                <p style="margin-top: 5px;">
                    Independent research project created by a Computer Science student at Brunel University London.
                </p>
            </div>

        </div>
    </div>

    `);

}

/*****************
 * Exit
 *****************/
window.endExperiment=function(){

    psychoJS.quit({
        message:'Your results have been successfully submitted. Thank you for participating!',
        isCompleted:true
    });

};

