# Eagle Accounting Services website

Static site with four pages: `index.html`, `services.html`, `about.html` and `contact.html`, plus `styles.css` and `main.js`.
It follows the Eagle design system (colors, Montserrat type, tight corners, wing-stripe motif).

## Before launch
1. **Activate the contact form (one time).** The form sends through FormSubmit (formsubmit.co), a free form-to-email service.
   After the site is live, submit one test request. FormSubmit emails jblairbookkeeping@gmail.com an activation link; click it.
   Every request after that arrives in that inbox as a table, with Reply-To set to the client's email.
2. **Optional: hide your email address from spam bots.** The activation email includes a random alias string.
   Replace `jblairbookkeeping@gmail.com` in the two form URLs in `contact.html` (`data-endpoint` and `action`) with that alias.
3. **Logo files** are in `assets/` (header/footer lockup, hero mark, favicon, social-share image).

## Hosting
Any static host works: Netlify (drag the folder onto app.netlify.com/drop), Cloudflare Pages, GitHub Pages, or your domain registrar's hosting.
Point your domain at the host and add HTTPS (included free on the hosts above).
