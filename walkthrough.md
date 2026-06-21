# Walkthrough - Wikipedia-Cyberpunk Portfolio Feature Expansion

I have successfully designed, built, and verified six premium interactive features for **Shafiur Rahman Shafim's** hybrid Wikipedia-Cyberpunk portfolio. The code is modular, fully responsive, and successfully deployed to Vercel production.

---

## 🛠️ Summary of Interactive Features Added

### 1. 📂 Wikipedia View History (Changelog Logs)
- **What it does:** Recreated Wikipedia’s "View history" tab below the page title. Clicking it slides open a revision history section displaying mock commits/milestones in Shafim’s career, with diff sizes in green/red (+32,490, -31).
- **Files Modified:** [index.html](file:///d:/about%20me/index.html), [style.css](file:///d:/about%20me/style.css), [script.js](file:///d:/about%20me/script.js)

### 2. 📊 SVG Interactive Skills Radar Chart
- **What it does:** Rendered a modern, lightweight SVG radar/spider chart in the Skills section beside the skill cards. Calculates coordinates dynamically to plot AI, Web, Security, Robotics, and QA categories. Vertex dots are interactive and highlight with tooltips on hover.
- **Files Modified:** [index.html](file:///d:/about%20me/index.html), [style.css](file:///d:/about%20me/style.css), [script.js](file:///d:/about%20me/script.js)

### 3. 🔐 Decryption Cipher Sandbox
- **What it does:** Added a cybersecurity testing sandbox widget at the bottom of the Skills section. Users can type any input message, select a cipher type (ROT13, Base64, Hexadecimal, Binary), and see it dynamically encode/decode with a glowing green Matrix code scrambled animation.
- **Files Modified:** [index.html](file:///d:/about%20me/index.html), [style.css](file:///d:/about%20me/style.css), [script.js](file:///d:/about%20me/script.js)

### 4. 💡 "Did You Know?" Sidebar Panel
- **What it does:** Embedded a rotating Wikipedia-style "Did You Know..." box in the right column beneath the profile Infobox. It cycles through fun facts about Shafim’s achievements and certifications every 12 seconds or when clicking the "Next Fact" button.
- **Files Modified:** [index.html](file:///d:/about%20me/index.html), [style.css](file:///d:/about%20me/style.css), [script.js](file:///d:/about%20me/script.js)

### 5. 📑 "Cite This Page" Modal Dialogue
- **What it does:** Appended a "Cite this article" row to the Infobox. Clicking it opens a glowing modal displaying citation formats (IEEE, BibTeX, APA, MLA) with tab controls and a "Copy to Clipboard" utility that flashes a green confirmation message.
- **Files Modified:** [index.html](file:///d:/about%20me/index.html), [style.css](file:///d:/about%20me/style.css), [script.js](file:///d:/about%20me/script.js)

### 6. 📟 Draggable Cyberpunk CLI Terminal
- **What it does:** Positioned a floating, minimized terminal widget in the bottom-right corner. It is draggable by its header bar and supports minimize, maximize, and close commands. Supports keyboard input commands: `help`, `bio`, `skills`, `projects`, `clear`, and `hack` (starts a streaming Matrix green rain screensaver).
- **Files Modified:** [index.html](file:///d:/about%20me/index.html), [style.css](file:///d:/about%20me/style.css), [script.js](file:///d:/about%20me/script.js)

---

## 🚀 Live Production URL
All updates are merged, committed, pushed to GitHub, and automatically aliased to production:
👉 **[shafiur-rahaman-shafim.vercel.app](https://shafiur-rahaman-shafim.vercel.app/)**
