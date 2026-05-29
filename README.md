# 🌸 Birthday Memory Site

A warm, nostalgic birthday website to gift your friend — with floating petals, a personal letter, photo memories, and heartfelt words.

---

## 📁 Folder Structure

```
birthday-site/
├── index.html          ← Main page (don't need to edit this)
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── config.js       ← ⭐ EDIT THIS to personalize everything
│   └── main.js         ← Animations & logic
├── images/
│   ├── memory1.jpg     ← Replace with your actual photos
│   ├── memory2.jpg
│   ├── memory3.jpg
│   └── memory4.jpg
└── README.md
```

---

## ✏️ How to Personalize

**Open `js/config.js`** and update:

| Field | What it does |
|---|---|
| `friendName` | Your friend's name (hero + tab title) |
| `birthdayDate` | Date shown under the name |
| `letterParagraphs` | Your personal letter (array of paragraphs) |
| `signature` | Signature at the end of the letter |
| `closingFrom` | Bottom of the page sign-off |
| `memories[]` | Memory cards — date, caption, and image path |
| `loveWords[]` | "Things I love about you" cards |

---

## 🖼️ Adding Photos

1. Put your photos in the `images/` folder
2. Name them (e.g. `trip2022.jpg`, `newYear.jpg`)
3. In `config.js`, set `image: "images/trip2022.jpg"` for each memory

You can also use online photo URLs:
```js
image: "https://i.imgur.com/yourphoto.jpg"
```

---

## 🚀 Deploy Options

### Option 1 — Netlify (free, easiest)
1. Go to [netlify.com](https://netlify.com) → Sign up free
2. Drag the entire `birthday-site/` folder onto the Netlify dashboard
3. Get a live link instantly! (e.g. `https://amazing-fox-123.netlify.app`)

### Option 2 — GitHub Pages (free)
1. Create a GitHub account and a new repository
2. Upload all files
3. Go to Settings → Pages → Deploy from main branch
4. Your site is live at `https://yourusername.github.io/repo-name`

### Option 3 — Vercel (free)
1. Go to [vercel.com](https://vercel.com) → Import project
2. Upload or connect your GitHub repo
3. Done!

### Option 4 — Open locally
Just open `index.html` in any browser — no server needed!

---

Made with love 🌸
