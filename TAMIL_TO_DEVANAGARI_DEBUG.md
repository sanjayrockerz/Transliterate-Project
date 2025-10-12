# Tamil to Devanagari Issue Analysis

## Problem Description
When user inputs Tamil text and selects Tamil as source script:
- Tamil result: Shows correctly (source text)
- Devanagari result: Shows same Tamil text (WRONG) - should show converted text

## Expected Behavior
Input: தாம்பரம் (Tamil)
- Tamil result: தாம்பரம் (correct - source)
- Devanagari result: ताम्बरम् (should be converted)

## Current Issue
Both results show: தாம்பரம்

## Root Cause Analysis
The issue appears to be in the script detection and conversion logic.

When Tamil is input and Tamil is selected as source:
1. System detects script as 'tamil' ✓
2. For Tamil target: correctly shows source text ✓  
3. For Devanagari target: should convert tamil → devanagari but shows tamil text ✗

## Solution Strategy
Fix the condition that determines whether to show original text vs converted text.
The logic should be: "Only show original text if target script matches detected script"

Currently it might be checking sourceScript instead of detectedScript.