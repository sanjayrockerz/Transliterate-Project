#!/usr/bin/env python3
"""
Quick test script to verify all imports work
"""

try:
    import streamlit as st
    print("✅ Streamlit imported successfully")

    import easyocr
    print("✅ EasyOCR imported successfully")

    import cv2
    print("✅ OpenCV imported successfully")

    import PIL
    from PIL import Image
    print("✅ PIL imported successfully")

    import numpy as np
    print("✅ NumPy imported successfully")

    import torch
    print("✅ PyTorch imported successfully")

    import pytesseract
    print("✅ Tesseract imported successfully")

    print("\n🎉 All imports successful! Ready to run the app.")

except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Please install missing dependencies: pip install -r requirements.txt")