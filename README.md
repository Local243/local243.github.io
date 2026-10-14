# OPSEU / SEFPO Local 243 – Niagara College Support Staff

[![Website Status](https://img.shields.io/badge/Website-Live-green.svg)](https://opseu243.org/)

Welcome to the official GitHub Pages repository for **[OPSEU SEFPO Local 243](https://opseu243.org/)**. 

This repository hosts the public-facing website for Local 243, representing the dedicated full-time and part-time support staff at **Niagara College** in the Niagara Region, Ontario. 

## About OPSEU Local 243
As part of OPSEU / SEFPO's College Support division, Local 243 is committed to protecting members' rights, advocating for fair and safe working conditions, and strengthening the campus community for staff and students alike. We stand united for quality public education, fairness, and respect across all Niagara College campuses.

## 🌐 Official Website
For the latest updates, executive committee contacts, and member resources, please visit our live site: **[opseu243.org](https://opseu243.org/)**

### Key Resources on the Website
* **About Our Local:** Learn more about our mission and the collective efforts of the College Support division.
* **Leadership & Stewards:** Find contact information for Table Officers, Shop Stewards, and Governance representatives at both the Welland Campus (WC) and Daniel J. Patterson (DJP) Campus.
* **Member Support:** Get help with your Collective Agreement, grievances, or workplace rights.

## 🚀 Hosting & Deployment (CapRover)

The site is plain HTML/CSS/JS served by nginx in a Docker container. CapRover builds it from the `captain-definition` + `Dockerfile` in this repo and handles HTTPS with Let's Encrypt.

| File | Purpose |
| --- | --- |
| `captain-definition` | Tells CapRover to build with the `Dockerfile` |
| `Dockerfile` | `nginx:1.28-alpine` image containing the site |
| `deploy/nginx.conf` | Caching, gzip, `/healthz`, blocks dotfiles |
| `deploy/security-headers.conf` | HSTS, CSP and other security headers |

### First-time setup
1. In the CapRover dashboard, **Apps → Create New App** (e.g. `local243`). No persistent data is needed.
2. Deploy the code, either way:
   - From this folder: `npx caprover deploy` (choose the app and the `main` branch), or
   - **Deployment → Method 3: Deploy from GitHub** with a webhook so every push to `main` redeploys.
3. **HTTP Settings**: add `opseu243.org` and `www.opseu243.org`, click **Enable HTTPS** for each, then turn on **Force HTTPS**.
4. **DNS**: point the `A` record for `opseu243.org` (and `www`) at the CapRover server's IP, replacing the GitHub Pages records (`185.199.108–111.153`). Wait for DNS to update before enabling HTTPS in step 3.
5. Once the new site is live on HTTPS, turn off GitHub Pages in the repo's **Settings → Pages** so the two hosts don't fight over the domain.

### Test locally
```bash
docker build -t local243-site . && docker run --rm -p 8243:80 local243-site
```
Then open http://localhost:8243.

### Making changes
- **CSS/JS caching:** `style.css` and `site.js` are cached for 7 days. When you change either one, bump the `?v=` value where `index.html` links to it, so visitors get the new file.
- **New third-party scripts or APIs** must be added to the `Content-Security-Policy` in `deploy/security-headers.conf`, or the browser will block them.
- **Stewards & Officers:** each person is an `<li class="person">` in `index.html`. Set `data-unit` (`ft`/`pt`/`other`) and `data-campus` (`wc`/`djp`) so the filters work.

## 📍 Union Office Location
**OPSEU Local 243**  
Niagara College – Welland Campus, Room S206  
100 Niagara College Blvd.  
Welland, ON L3C 7L3  

**Contact Us:** [local243@gmail.com](mailto:local243@gmail.com)
