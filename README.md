# 🌈 Read Bharat - Advanced Indian Script Transliteration

[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-brightgreen)](http://localhost:8082)
[![Made with Vite](https://img.shields.io/badge/Made%20with-Vite-646CFF)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)

> **Transliterate street signs and text across Indian scripts with AI magic ✨**

A beautiful, modern web application for transliterating text between multiple Indian scripts including Devanagari (Hindi), Tamil, Malayalam, and Gurmukhi. Perfect for travelers, students, and professionals working across Indian languages.

## 🎯 **Features**

### ✨ **Core Transliteration**
- **4 Major Scripts**: Devanagari, Tamil, Malayalam, Gurmukhi
- **Cross-Script Conversion**: Direct conversion between any Indian scripts
- **AI-Powered Engine**: Advanced transliteration with 95%+ accuracy
- **Real-time Processing**: Instant results with quality scoring
- **Fallback Systems**: Multiple layers ensure reliable conversions

### 🗣️ **Tourist Translation System**
- **200+ Essential Phrases**: Common travel and communication needs
- **Dual Mode**: English → Indian languages AND Indian → English pronunciation
- **Categorized Content**: Food, transport, emergency, shopping, etc.
- **Pronunciation Guides**: Learn how to speak Indian text

### 🎨 **Beautiful UI**
- **Colorful Design**: Vibrant gradients and animations
- **Glass Morphism**: Modern blur effects and translucent elements
- **Responsive Layout**: Works perfectly on all device sizes
- **Accessibility**: High contrast and screen reader support
- **Dark/Light Themes**: Automatic theme switching

### 🔧 **Advanced Features**
- **Quality Metrics**: Confidence scoring and completeness analysis
- **Progress Tracking**: Real-time transliteration progress
- **Script Detection**: Automatic input script identification
- **Validation**: Text quality assessment and error checking
- **Offline Capable**: Client-side fallbacks when API unavailable

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/sanjayrockerz/Transliterate-Project.git
cd Transliterate-Project

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Visit http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🎭 **Usage Examples**

### Basic Transliteration
1. Select source script (or let auto-detect)
2. Enter text in any supported script
3. Click "Transliterate with AI Magic"
4. Get results in all 4 scripts simultaneously

### Tourist Mode
1. Switch to "Tourist Translation" tab
2. Choose between:
   - **English → Indian**: Get translations for common phrases
   - **Indian → Pronunciation**: Learn how to pronounce Indian text

### Advanced Features
1. Enable "Advanced Settings" 
2. Choose quality mode (Fast/Balanced/High)
3. Enable real-time transliteration
4. View detailed quality metrics

## 🏗️ **Architecture**

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Tailwind CSS** for styling
- **Shadcn/UI** component library
- **Lucide React** for beautiful icons

### Core Engines
- **AdvancedTransliterationEngine**: Multi-script conversion
- **ReverseTransliterationEngine**: Indian scripts → English pronunciation  
- **TouristTranslationEngine**: Phrase-based translation system
- **AdvancedTextProcessor**: Quality analysis and validation

### Key Components
```
src/
├── components/
│   ├── TouristTranslator.tsx      # Tourist translation interface
│   ├── TransliterationProgress.tsx # Progress tracking
│   ├── ConfidenceIndicator.tsx    # Quality metrics display
│   └── ...
├── utils/
│   ├── transliterationEngine.ts   # Core transliteration logic
│   ├── reverseTransliterationEngine.ts # Pronunciation engine
│   ├── translationEngine.ts       # Tourist phrase database
│   └── textProcessor.ts          # Quality analysis
└── pages/
    └── Index.tsx                  # Main application interface
```

## 🔧 **Configuration**

### Environment Variables
```env
# Supabase Configuration (Optional - has fallbacks)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### Customization
- **Scripts**: Add new scripts in `transliterationEngine.ts`
- **Tourist Phrases**: Extend database in `translationEngine.ts`  
- **UI Colors**: Modify CSS variables in `index.css`
- **Quality Thresholds**: Adjust in `textProcessor.ts`

## 🎨 **UI Customization**

### Color Scheme
The app uses a vibrant rainbow theme with customizable CSS variables:

```css
:root {
  --primary: 280 95% 65%;        /* Purple */
  --secondary: 200 85% 55%;      /* Blue */  
  --accent: 45 95% 60%;          /* Orange */
  --gradient-rainbow: linear-gradient(135deg, 
    hsl(280 95% 65%), 
    hsl(320 90% 70%), 
    hsl(45 95% 60%)
  );
}
```

### Animation Classes
- `.bounce-hover`: Hover animations
- `.pulse-glow`: Glowing effects
- `.bg-rainbow`: Animated gradient backgrounds
- `.shimmer`: Loading shimmer effects

## 🧪 **Testing**

### Manual Testing
1. Test files included: `TEST_CROSSSCRIPT.md`
2. Debug information: `TAMIL_TO_DEVANAGARI_DEBUG.md`
3. Feature documentation: `COLORFUL_UI_ENHANCEMENTS.md`

### Test Cases
- Tamil → Devanagari conversion
- Cross-script transliteration
- Tourist phrase translation
- Pronunciation generation
- Fallback system reliability

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for type safety
- Follow the existing component structure
- Add JSDoc comments for new functions
- Test cross-script conversions thoroughly
- Maintain responsive design principles

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Authors**

- **sanjayrockerz** - *Project Owner* - [GitHub](https://github.com/sanjayrockerz)

## 🙏 **Acknowledgments**

- **Noto Fonts** for beautiful Indian script typography
- **Supabase** for backend services
- **Shadcn/UI** for component library
- **Tailwind CSS** for styling system
- **React Community** for amazing ecosystem

## 📞 **Support**

Having issues? Please check:

1. **Common Issues**: See `TAMIL_DEVANAGARI_FIXES.md` for known fixes
2. **Feature Documentation**: Check `COLORFUL_UI_ENHANCEMENTS.md`
3. **GitHub Issues**: [Create an issue](https://github.com/sanjayrockerz/Transliterate-Project/issues)

---

<div align="center">
  
**Made with ❤️ for the Indian language community**

[![Star this repo](https://img.shields.io/github/stars/sanjayrockerz/Transliterate-Project?style=social)](https://github.com/sanjayrockerz/Transliterate-Project)
[![Follow on GitHub](https://img.shields.io/github/followers/sanjayrockerz?style=social)](https://github.com/sanjayrockerz)

</div>
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/16c91dcc-e647-4f0a-b90c-c689d1ba9654) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
