@echo off
echo 🌈 Starting Read Bharat Streamlit App...
echo.
echo Installing requirements...
pip install -r requirements.txt
echo.
echo Starting Streamlit server...
echo 🚀 App will open in your browser automatically!
echo.
streamlit run streamlit_app.py --server.port 8501
pause