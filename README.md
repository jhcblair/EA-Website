# Eagle Accounting Services website

Static site with four pages: `index.html`, `services.html`, `about.html` and `contact.html`, plus `styles.css` and `main.js`.
It follows the Eagle design system (colors, Montserrat type, tight corners, wing-stripe motif).

## Before launch
1. **Contact form.** Requests are sent through FormSubmit (formsubmit.co), a free form-to-email service, and arrive at jblairbookkeeping@gmail.com as a table, with Reply-To set to the client's email.
2. **Email address hidden from spam bots.** The form posts to your private FormSubmit code (`1719ac0853596bc3ac15c1d4f6c0d5ee`) instead of your email address. Requests still arrive at jblairbookkeeping@gmail.com.
3. **Logo files** are in `assets/` (header/footer lockup, hero mark, favicon, social-share image).

## Hosting
Any static host works: Netlify (drag the folder onto app.netlify.com/drop), Cloudflare Pages, GitHub Pages, or your domain registrar's hosting.
Point your domain at the host and add HTTPS (included free on the hosts above).
