# Sri Devi Navarathri 2026

A mobile-friendly festival website for the Aparna Zenon Community in Hyderabad. It is made with plain HTML, CSS, and JavaScript: there is no Node.js, package manager, build step, or dependency installation.

## Run locally

Open `index.html` in a modern browser. For editing, any text editor is enough. Google Fonts are an optional online enhancement; the site uses local system-font fallbacks when offline.

## Publish with GitHub Pages

1. Push these files to the `main` branch of a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Push to `main` to run the **Deploy to GitHub Pages** workflow. It prepares and publishes the static site; Node.js and npm are not required for local editing.
5. After deployment, GitHub Pages will show the public site URL in **Settings → Pages**.

## Registrations

The pooja, prasadam sponsor, and general sponsor links open the Google Forms provided by the organisers. Responses are stored by Google Forms, not by this static website. Verify the forms, access settings, and response spreadsheets before sharing the site.

## Year-wise photo gallery

Photos are stored in `images/<year>/`. To add photos, copy them into the matching folder, then push the added files to `main`. The GitHub Pages workflow automatically finds supported image files and adds them to the gallery; you do not need to edit JavaScript or maintain a photo list. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`, and `.svg`. Use descriptive filenames such as `opening-ceremony.jpg` for captions.

To start an album for another year, create a folder such as `images/2027/`, add photos, and push. The year tab is generated automatically. Existing photo folders can be added and published from PowerShell:

```powershell
git add images/2026
git commit -m "Add 2026 festival photos"
git push origin main
```

After the GitHub Pages workflow finishes, the photos will appear for everyone. The site does not offer visitor uploads or write files back to the repository.

For a local preview after adding photos, regenerate the image list and open `index.html`:

```powershell
py tools\build_gallery.py
```

The generated `images/gallery-manifest.js` is maintained automatically; do not edit it by hand.

## Before sharing

- Confirm the festival dates, programme, daily timings, and venue with the organisers.
- Verify that all registration links and their response destinations are correct.
- Add verified contact or payment details only if the organisers provide them.
- Do not add passwords, private keys, or other secrets to this public website.
