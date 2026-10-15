# John Jose — DevOps Engineer Portfolio Website

A modern, professional, high-performance portfolio website built specifically for **John Jose**, **DevOps Engineer & Cloud Automation Specialist**. Engineered with **pure HTML5, CSS3, and Vanilla JavaScript** — zero framework overhead, ultra-fast load times, and pixel-perfect responsiveness across desktop, tablet, and mobile devices.

---

## 🚀 Live Preview & Aesthetics

- **Theme**: Dark Navy / Charcoal Cloud Architecture aesthetic (`#070b14` / `#0c1222`) with Sky Cyan (`#38bdf8`) & Indigo accents.
- **Visuals**:
  - Interactive **CI/CD Pipeline & AWS Terminal Simulator** featuring animated deployment nodes and live operational logs.
  - Glassmorphic card system with backdrop blur and subtle border glow effects.
  - Real-time **Skills Category Filtering** (Cloud, DevOps, IaC, Monitoring, Scripting).
  - Career journey **Interactive Timeline** (Archon Solutions & Caritas Hospital).
  - Detailed **Project Architecture Modals** breaking down deployment stages.
  - Interactive **Contact Form** with client-side validation and quick copy-to-clipboard buttons.
  - Smooth typing effect on hero subtitle with full `prefers-reduced-motion` accessibility support.

---

## 📁 Project File Structure

```text
portfolio/
├── index.html                   # Semantic HTML5 structure with SEO meta & OpenGraph tags
├── style.css                    # Modern CSS3 design system, responsive breakpoints & animations
├── script.js                    # Vanilla JS (navigation, typing, validation, modal, copy)
├── README.md                    # Documentation, customization & deployment instructions
└── assets/
    ├── John_Jose_Resume.pdf     # Downloadable resume PDF
    └── images/
        └── favicon.svg          # Custom SVG cloud & terminal brand favicon
```

---

## 💻 How to Run Locally

Because this project is built entirely with vanilla web standards, **no build steps, Node.js, or package managers are required**.

### Method 1: Direct Browser Launch (Easiest)
Simply navigate to the project directory in File Explorer and **double-click** `index.html`, or right-click `index.html` and select **Open with > Google Chrome** (or Edge / Firefox).

### Method 2: Local Web Server via PowerShell
If you would like to run a local HTTP server using Windows PowerShell:

```powershell
# In PowerShell inside the portfolio folder:
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Start-Process "http://localhost:8080/index.html"
Write-Host "Server running at http://localhost:8080/ (Press Ctrl+C to stop)"
```

### Method 3: VS Code "Live Server"
1. Open the `portfolio` folder in Visual Studio Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.

---

## 🛠️ Personalization & Content Customization

### 1. Replacing Your Resume PDF
Place your updated resume PDF in the `assets/` folder and name it:
```text
assets/John_Jose_Resume.pdf
```
Both the navigation bar "Resume" button and the Hero "Download Resume" button will immediately download this file without requiring any code changes.

### 2. Updating Social Media Links
Open `index.html` and search for `your-username` and `your-profile`. Replace them with your real profile URLs:
- **GitHub**:
  ```html
  <a href="https://github.com/your-username" ...>
  ```
  Change to:
  ```html
  <a href="https://github.com/johnjose-devops" ...>
  ```
- **LinkedIn**:
  ```html
  <a href="https://linkedin.com/in/your-profile" ...>
  ```
  Change to:
  ```html
  <a href="https://linkedin.com/in/john-jose-devops" ...>
  ```

### 3. Activating the Contact Form for Email Delivery
The contact form currently validates inputs on the client side. To have inquiries sent directly to `jhon123jose@gmail.com`, you can connect any free form forwarding service:

#### Option A: Formspree (Quickest — No Backend Needed)
1. Sign up for a free account at [Formspree.io](https://formspree.io).
2. Create a new form with your email `jhon123jose@gmail.com`.
3. In `index.html`, update `<form id="contactForm">` with:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Option B: EmailJS
1. Sign up at [EmailJS.com](https://www.emailjs.com).
2. Include the EmailJS SDK script and send messages directly from `script.js` upon form validation.

---

## ☁️ Deployment Guide

### Option 1: GitHub Pages (Free & Immediate)
1. Create a new public repository on GitHub (e.g. `john-jose-portfolio`).
2. Push your files to the repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of DevOps portfolio website"
   git branch -M main
   git remote add origin https://github.com/your-username/john-jose-portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings > Pages**.
4. Under **Build and deployment > Source**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then click **Save**.
6. Within 1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/john-jose-portfolio/`

---

### Option 2: AWS S3 + CloudFront + Route 53 (DevOps Best Practice)
As an AWS-focused DevOps Engineer, hosting your portfolio on AWS showcases your domain expertise:

1. **S3 Static Website Bucket**:
   - Create an Amazon S3 bucket named `johnjose.dev` (or your chosen domain).
   - Enable **Static website hosting** in the bucket properties.
   - Set **Index document** to `index.html`.
   - Upload all files (`index.html`, `style.css`, `script.js`, `README.md`, `assets/`).

2. **CloudFront Distribution (CDN & SSL)**:
   - Create a CloudFront distribution pointing to the S3 bucket origin.
   - Request a free SSL certificate via **AWS Certificate Manager (ACM)** in `us-east-1`.
   - Set **Viewer Protocol Policy** to `Redirect HTTP to HTTPS`.

3. **Route 53 DNS**:
   - Create an **A Record** (Alias) pointing to your CloudFront distribution domain name.

4. **Automated CI/CD Deployment with GitHub Actions (Optional)**:
   Add a `.github/workflows/deploy.yml` workflow to automatically sync updates to S3 and invalidate the CloudFront cache whenever you push to `main`!

---

## ♿ Accessibility & Performance Standards

- **Semantic HTML5**: Full `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>` markup.
- **Accessible ARIA Attributes**: ARIA roles, `aria-expanded` states on hamburger drawer, `aria-hidden` on ambient elements, and `aria-live` for form validation messages.
- **High Contrast**: Meets WCAG 2.1 AA standards for slate background and bright text readability.
- **Prefers-Reduced-Motion**: Automatically disables smooth scrolling, pulsing indicators, and typing effects when reduced-motion accessibility preference is detected.

---

## 👨‍💻 Author

**John Jose**  
*DevOps Engineer | Cloud & CI/CD Automation Specialist*  
- **Email**: [jhon123jose@gmail.com](mailto:jhon123jose@gmail.com)  
- **Phone**: +91 7909219746  
- **Location**: Vaikom, Kottayam, Kerala, India  
- **GitHub**: [github.com/your-username](https://github.com/your-username)  
- **LinkedIn**: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)  
