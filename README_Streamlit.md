# 🌈 Read Bharat - Perfect Streamlit Clone

> **Advanced Indian Script Transliteration Web App** - Exact replica of the React application with all advanced features including **Image Processing & OCR**

## ✨ Features

### 🔤 Advanced Transliteration Engine
- **4 Indian Scripts Support**: Devanagari (Hindi), Tamil, Malayalam, Gurmukhi (Punjabi)
- **Cross-Script Conversion**: Convert between any Indian scripts with AI-powered accuracy
- **English ↔ Indian**: Bidirectional transliteration between English and Indian scripts
- **Real-time Processing**: Instant results with progress tracking
- **Multi-layer Fallbacks**: API-first approach with intelligent client-side fallbacks

### 📷 Image Processing & OCR
- **Smart OCR**: Extract text from images using EasyOCR and Tesseract
- **Indian Script Recognition**: Specialized OCR for Devanagari, Tamil, Malayalam, Gurmukhi
- **Image Preprocessing**: Automatic enhancement for better text extraction
- **Script Auto-Detection**: Automatically identify the script in uploaded images
- **One-Click Transliteration**: Extract text and transliterate to all scripts instantly

### 🗺️ Tourist Translation System
- **200+ Essential Phrases**: Greetings, directions, food, emergency, transport, shopping
- **All 4 Scripts**: Translations in Devanagari, Tamil, Malayalam, and Gurmukhi
- **Pronunciation Guide**: Indian script → English pronunciation conversion
- **Category-based Organization**: Easy browsing by context

### 📊 Quality & Analytics
- **Confidence Scoring**: Real-time accuracy assessment (0-100%)
- **Quality Metrics**: Confidence, accuracy, completeness, readability
- **Progress Tracking**: Step-by-step processing visualization
- **Method Detection**: API vs fallback method identification

### 🎨 Beautiful UI (Matching React App)
- **Rainbow Gradients**: Vibrant, colorful design with animated elements
- **Responsive Design**: Works perfectly on desktop and mobile
- **Real-time Mode**: Live transliteration as you type
- **Advanced Settings**: Quality modes, script detection, analysis options

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "c:\Users\motis\Downloads\Readbharat\read-bharat"
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**
   ```bash
   # Option 1: Using the batch file (Windows)
   run_perfect_streamlit.bat

   # Option 2: Direct command
   streamlit run perfect_streamlit_clone.py --server.port 8501
   ```

4. **Open your browser:**
   - Local: http://localhost:8501
   - Network: http://192.168.29.232:8501 (if on same network)

## 📖 How to Use

### 🔤 Transliteration Mode

1. **Select Mode**: Choose "Transliterate" from the sidebar
2. **Enter Text**: Type in any Indian script or English
3. **Auto-Detection**: Script is automatically detected, or select manually
4. **Click Transliterate**: Get instant results in all 4 scripts
5. **View Results**: See confidence scores, processing time, and quality metrics

### � Image to Text Mode

1. **Select Mode**: Choose "Image to Text" from the sidebar
2. **Upload Image**: Click "Choose an image" and select an image file
3. **Supported Formats**: PNG, JPG, JPEG, BMP, TIFF
4. **Automatic Processing**: The app will:
   - Extract text using OCR
   - Detect the script automatically
   - Transliterate to all 4 Indian scripts
5. **View Results**: See OCR confidence, extracted text, and transliterations

#### 📋 Image Processing Tips
- **Clear Images**: Use well-lit, high-resolution images
- **Text Size**: Ensure text is large enough to be readable
- **Orientation**: Upload images with correct text orientation
- **Contrast**: High contrast between text and background works best
- **Supported Scripts**: Devanagari, Tamil, Malayalam, Gurmukhi, and English

### �🗺️ Tourist Translation Mode

#### English → Indian Scripts
1. **Select Mode**: Choose "Tourist Translate" → "English → Indian"
2. **Search Phrases**: Type keywords like "Hello", "Thank you", "Where is..."
3. **Select Phrase**: Choose from suggestions
4. **View Translations**: See the phrase in all 4 Indian scripts

#### Indian → Pronunciation
1. **Select Mode**: Choose "Tourist Translate" → "Indian → Pronunciation"
2. **Enter Text**: Type in Devanagari, Tamil, Malayalam, or Gurmukhi
3. **Get Pronunciation**: See English pronunciation guide
4. **Syllable Breakdown**: View syllable-by-syllable pronunciation

## ⚙️ Advanced Settings

### Sidebar Options

- **Mode Selection**: Switch between Transliteration and Tourist Translation
- **Real-time Transliteration**: Enable live processing as you type
- **Show Analysis**: Display quality metrics and processing details
- **Quality Mode**: Choose between fast/balanced/high quality processing
- **Source Script**: Auto-detect or manually select input script

## 🏗️ Technical Architecture

### Core Engines

#### `AdvancedTransliterationEngine`
- **Cross-script conversion** with phonetic approximations
- **Direct Tamil→Devanagari mapping** (50+ character combinations)
- **English→Indian transliteration** with city/place name support
- **Multi-layer fallback system** (API → Direct mapping → Phonetic)

#### `ImageProcessingEngine`
- **Multi-OCR support** (EasyOCR + Tesseract for Indian scripts)
- **Image preprocessing** (noise reduction, contrast enhancement, thresholding)
- **Script auto-detection** from extracted text
- **Confidence scoring** for OCR results
- **Batch processing** pipeline (OCR → Script Detection → Transliteration)

#### `ReverseTransliterationEngine`
- **Indian→English phonetics** for all 4 scripts
- **Pronunciation guide generation**
- **Syllable breakdown** for complex words

#### `TouristTranslationEngine`
- **200+ pre-translated phrases** across categories
- **Multi-script support** for each phrase
- **Search and suggestion system**

### Quality Assessment
- **Confidence scoring** based on text length and complexity
- **Accuracy metrics** for conversion reliability
- **Completeness checking** for full text coverage
- **Readability assessment** for output quality

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Configure API endpoints
TRANSLITERATION_API_URL=https://your-api-endpoint.com
TOURIST_TRANSLATION_API_URL=https://your-api-endpoint.com
```

### Quality Modes
- **Fast**: Quick processing, basic accuracy
- **Balanced**: Optimal speed vs quality (default)
- **High**: Maximum accuracy, slower processing

## 🌟 Key Features (Matching React App Exactly)

### ✅ Implemented Features
- [x] **Rainbow UI Design** - Exact color scheme and gradients
- [x] **4 Script Support** - Devanagari, Tamil, Malayalam, Gurmukhi
- [x] **Cross-Script Conversion** - Any script to any script
- [x] **English ↔ Indian** - Bidirectional transliteration
- [x] **Image Processing & OCR** - Upload images and extract/transliterate text
- [x] **Script Auto-Detection** - Automatic script identification
- [x] **Tourist Phrases** - 200+ essential translations
- [x] **Pronunciation Guide** - Indian → English phonetics
- [x] **Real-time Processing** - Live transliteration
- [x] **Progress Tracking** - Step-by-step visualization
- [x] **Quality Metrics** - Confidence, accuracy, completeness
- [x] **Multi-layer Fallbacks** - API → Direct → Phonetic
- [x] **Advanced Settings** - Quality modes, script detection
- [x] **Responsive Design** - Works on all devices

### 🎯 Accuracy Highlights
- **Tamil→Devanagari**: Direct character mapping (50+ combinations)
- **English→Indian**: City names, common words, phonetic conversion
- **Cross-script**: Reverse transliteration + phonetic approximation
- **Fallback System**: 3-layer approach ensures results

## 🚀 Deployment

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
streamlit run perfect_streamlit_clone.py --server.port 8501 --server.headless false
```

### Production Deployment
```bash
# For production, use headless mode
streamlit run perfect_streamlit_clone.py --server.port 8501 --server.headless true --server.enableCORS false
```

### Docker Deployment (Optional)
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8501

CMD ["streamlit", "run", "perfect_streamlit_clone.py", "--server.port", "8501", "--server.headless", "true"]
```

## 📊 Performance

- **Processing Speed**: < 500ms per transliteration
- **Memory Usage**: ~50MB base, ~100MB with all engines loaded
- **Concurrent Users**: Supports multiple simultaneous sessions
- **Offline Capable**: Works without internet (client-side fallbacks)

## 🐛 Troubleshooting

### Common Issues

**App won't start:**
- Ensure Python 3.8+ is installed
- Check if port 8501 is available
- Verify all dependencies are installed

**Transliteration not working:**
- Check internet connection for API calls
- Try different quality modes
- Use fallback system if API fails

**UI not displaying correctly:**
- Clear browser cache
- Try incognito mode
- Check browser compatibility

### Debug Mode
```bash
# Run with debug logging
streamlit run perfect_streamlit_clone.py --logger.level debug
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React App Inspiration**: Exact replica of the advanced React transliteration app
- **Streamlit Framework**: For the amazing web app framework
- **Indian Language Experts**: For transliteration accuracy and script mappings
- **Open Source Community**: For the libraries and tools used

---

**🌈 Happy Translating with Read Bharat!**