# === a code to produce json files for a SPECIFIC wav files ===#

import os
import json
import torch
import whisperx

# === Configuration ===
specific_file = "02 - غزوة بواط.wav"  # Replace with your actual WAV file name
input_dir = "Wav_files"
output_dir = "ghazawat_time_stamps"
os.makedirs(output_dir, exist_ok=True)

# === Full path to the .wav file ===
wav_path = os.path.join(input_dir, specific_file)
if not os.path.exists(wav_path):
    print(f"❌ File not found: {wav_path}")
    exit()

# === Set device ===
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"🔧 Using device: {device}")

# === Load WhisperX ASR model ===
print("🔁 Loading WhisperX model (large-v3)...")
model = whisperx.load_model("large-v3", device=device, language="ar", compute_type="float32")

# === Load alignment model ===
print("🔁 Loading alignment model for Arabic...")
model_a, metadata = whisperx.load_align_model(language_code="ar", device=device)

# === Transcription ===
print(f"🎤 Transcribing file: {specific_file}")
result = model.transcribe(wav_path)

# === Word-Level Alignment ===
print("📐 Performing word-level alignment...")
aligned_result = whisperx.align(
    result["segments"], model_a, metadata, wav_path, device=device
)

# DEBUG: Inspect the first word segment before looping
print(aligned_result["word_segments"][0])  # <-- add this line here

# === Format output JSON ===
words_timestamps = []
for segment in aligned_result["word_segments"]:
    words_timestamps.append({
        "word": segment["word"],
        "start": round(segment["start"], 2),
        "end": round(segment["end"], 2)
    })

# === Save JSON ===
json_filename = specific_file.replace(".wav", ".json")
json_path = os.path.join(output_dir, json_filename)

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(words_timestamps, f, ensure_ascii=False, indent=2)

print(f"✅ Done! JSON saved to: {json_path}")
