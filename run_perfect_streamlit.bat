@echo off
echo 🌈 Starting Read Bharat - Perfect Streamlit Clone with Image Processing
echo =================================================
echo Features:
echo - Text Transliteration (4 Indian scripts)
echo - Tourist Translation (200+ phrases)
echo - Image to Text OCR (Upload images and transliterate)
echo =================================================
cd /d "%~dp0"
python -m streamlit run perfect_streamlit_clone.py --server.port 8501 --server.address 0.0.0.0
pause