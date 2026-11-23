# Edison Choque-Sanchez · personal website

Live site: **https://e-choque.github.io**

## How to edit (directly on github.com)

1. Open the file you want to change (table below).
2. Click the **pencil icon ✏️** (top right of the file).
3. Make your change. The **Preview** tab shows how Markdown files will look.
4. Click the green **Commit changes…** button, then **Commit changes** again.
5. Wait about 1 minute and refresh the site.

| I want to change… | File |
|---|---|
| About text, selected research (Home) | `content/en/home.md` and `content/es/home.md` |
| Publications and papers | `content/en/research.md` and `content/es/research.md` |
| Courses | `content/en/teaching.md` and `content/es/teaching.md` |
| GitHub repositories list | `content/en/code.md` and `content/es/code.md` |
| Skills cards (methods, software, languages) | `data/toolkit.js` |
| Name, titles under the photo, links (ORCID, GitHub…) | `data/site.js` |
| Photo | replace `images/photo.jpg` (square, about 800×800) |
| CV PDF | replace `files/CV_Edison_Choque-Sanchez.pdf` (same name) |

**To upload a file** (new CV, photo): open the folder → **Add file → Upload files** → drag the file in → **Commit changes**.

## Markdown in 30 seconds

```markdown
## A heading
Normal paragraph. **Bold**, *italic*, [a link](https://example.com).
- **[Paper title](https://link)**, with A. Coauthor. *Journal* (2026).
```

Always change **both** languages: `en` and `es`.

## Tips

- In the `.js` files, change only the text **inside the quotes** and keep the commas. If the site goes blank after an edit, a comma or quote is missing. Open the file's **History** and copy back the previous version.
- A visitor whose browser is in Spanish sees Spanish automatically. To share the Spanish version directly, use `https://e-choque.github.io/?lang=es`.
- Pages: `#/` (home), `#/research`, `#/teaching`, `#/code`. The CV menu item opens the PDF.
