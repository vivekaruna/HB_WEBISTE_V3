# Hillboy Engineering - Static Website

This project is a fully static manufacturing company website built with HTML5, CSS3, and vanilla JavaScript. It is designed to work by opening `index.html` directly and can be deployed to GitHub Pages without any backend services.

## Structure

- `index.html` - Home page
- `about.html` - Company overview
- `services.html` - Manufacturing service descriptions
- `capabilities.html` - Materials, processes, and support capabilities
- `industries.html` - Industries served
- `gallery.html` - Responsive gallery with lightbox preview
- `rfq.html` - Request for quotation form (Formspree placeholder)
- `contact.html` - Contact form (Formspree placeholder)
- `assets/css/styles.css` - Shared styles
- `assets/js/site.js` - Navigation, lightbox, and form behavior
- `assets/images/` - Placeholder images and logo
- `robots.txt` - Search engine directives
- `sitemap.xml` - Site map for SEO

## Deployment to GitHub Pages

1. Create a GitHub repository and push the project files to the default branch (`main` or `master`).
2. In the repository settings, open the **Pages** section.
3. Select the branch where the files are stored and choose the root (`/`) folder.
4. Save the settings.
5. The site will be available at `https://<username>.github.io/<repository>/` or a custom domain if configured.

## Notes

- Replace the placeholder Formspree endpoints in `rfq.html` and `contact.html` with your actual integration URL.
- Update `sitemap.xml` `<loc>` URLs to the deployed site base URL.
- Replace the gallery placeholder SVGs in `assets/images/gallery/` with real project photos when available.
- All navigation uses relative links so the site functions on GitHub Pages and when opened locally.
