# Sri Devi Navarathri 2026

A mobile-friendly festival website for the Aparna Zenon Community in Hyderabad. It is made with plain HTML, CSS, and JavaScript: there is no Node.js, package manager, build step, or dependency installation.

## Run locally

Open `index.html` in a modern browser. For editing, any text editor is enough. Google Fonts are an optional online enhancement; the site uses local system-font fallbacks when offline.

## Publish with GitHub Pages

1. Push these files to the `main` branch of a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** and the **/(root)** folder, then save.
5. After deployment, GitHub Pages will show the public site URL in **Settings → Pages**.

No Actions workflow or build output folder is needed.

## Registrations

The pooja, prasadam sponsor, and general sponsor links open the Google Forms provided by the organisers. Responses are stored by Google Forms, not by this static website. Verify the forms, access settings, and response spreadsheets before sharing the site.

## Year-wise photo gallery

Images are stored in `images/<year>/`, for example `images/2026/` or `images/2025/`. The 2026 album includes three original, locally stored festival illustrations, labeled as artwork rather than photos from the event. Add community photos to the matching year folder, then add each image to `galleryAlbums` in `script.js`:

```js
"2026": [
  {
    file: "opening-ceremony.jpg",
    alt: "The community gathered for the opening ceremony",
    caption: "Opening ceremony",
  },
],
```

The `file` value must match the image's filename exactly. Add a year folder and a matching year button in `index.html` to start an album for another year. The site displays images already included with the website; it does not upload files or provide permanent visitor uploads.

## Before sharing

- Confirm the festival dates, programme, daily timings, and venue with the organisers.
- Verify that all registration links and their response destinations are correct.
- Add verified contact or payment details only if the organisers provide them.
- Do not add passwords, private keys, or other secrets to this public website.
