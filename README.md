# 🌙 Sailor Moondle

A daily character guessing game inspired by Wordle, but for Sailor Moon fans! Test your knowledge of the Sailor Senshi and other characters from the beloved anime series.

## ✨ Features

- 🎮 **Daily Challenge** - One new character to guess every day
- 🌍 **Multilingual** - Available in 6 languages (EN, DE, FR, IT, JA, PT-BR)
- 💡 **Progressive Hints** - Get hints about gender, hair color, eye color, and more
- ⏱️ **Countdown Timer** - See when the next character drops
- 🎨 **Beautiful UI** - Magical sparkle effects and smooth animations
- 📱 **Responsive Design** - Play on any device
- 💾 **Persistent Progress** - Your stats are saved locally

## 🎯 How to Play

1. **Guess the Character** - Type a Sailor Moon character name in the search box
2. **Check the Hints** - Each guess reveals how close you are:
   - ✅ Green = Correct match
   - 🟡 Yellow = Partially correct
   - ❌ Red = Incorrect
3. **Win the Game** - Guess correctly to see your stats and share your result
4. **Come Back Tomorrow** - A new character awaits!

## 🛠️ Built With

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [Vue I18n](https://vue-i18n.intlify.dev/) - Internationalization

## 🚀 Development

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
cd sailormoondle

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions. Every push to the `main` branch triggers a new deployment.

### Setup GitHub Pages

1. Go to your repository Settings → Pages
2. Under "Source", select **GitHub Actions**
3. Push to main branch and your site will be live

## 🎨 Adding Characters

Characters are defined in `src/data/characters.ts`. Each character needs:

```typescript
{
  id: number,
  name: { en: "...", de: "...", /* other languages */ },
  gender: "female" | "male" | "other",
  hairColor: "blonde" | "black" | /* ... */,
  eyeColor: "blue" | "brown" | /* ... */,
  affiliation: "sailor-senshi" | "villain" | /* ... */,
  series: "classic" | "r" | /* ... */,
  image: "character-name.jpg"
}
```

Place character images in `public/images/characters/`.

## 📝 License

This project is a fan-made game and is not officially affiliated with Sailor Moon, Naoko Takeuchi, or Toei Animation.

## 💖 Acknowledgments

- Original Sailor Moon series by Naoko Takeuchi
- Inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html) by Josh Wardle
- Character data compiled by fans of the series

---

Made with 🌙 and ✨ for Sailor Moon fans worldwide
