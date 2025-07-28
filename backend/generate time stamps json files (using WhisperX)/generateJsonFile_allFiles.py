# === a code to produce json files for ALL the wav files at once (skips existing json files & sort the output by ascending order) ===#
import os
import re
import json
import torch
import whisperx

# === Configuration ===
input_dir = "Wav_files"
output_dir = "ghazawat_time_stamps"
os.makedirs(output_dir, exist_ok=True)

# === Set device ===
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"🔧 Using device: {device}")

# === Load WhisperX ASR model ===
print("🔁 Loading WhisperX model (large-v3)...")
model = whisperx.load_model("large-v3", device=device, language="ar", compute_type="float32")

# === Load alignment model ===
print("🔁 Loading alignment model for Arabic...")
model_a, metadata = whisperx.load_align_model(language_code="ar", device=device)

# === Extract leading number from filename ===
def extract_leading_number(filename):
    match = re.match(r"^(\d+)", filename)
    return int(match.group(1)) if match else float('inf')

# === Get and sort .wav files by leading number ===
wav_files = sorted(
    [f for f in os.listdir(input_dir) if f.endswith(".wav")],
    key=extract_leading_number
)

# === Print sorted .wav files ===
print("\n🔢 Sorted .wav files to be processed:")
for i, f in enumerate(wav_files, 1):
    print(f"{i:02d}: {f}")

# === Loop through .wav files ===
for filename in wav_files:
    json_filename = filename.replace(".wav", ".json")
    json_path = os.path.join(output_dir, json_filename)

    # === Skip if JSON already exists ===
    if os.path.exists(json_path):
        print(f"⏩ Skipping '{filename}' (already transcribed)")
        continue

    print(f"\n🎤 Transcribing file: {filename}")
    wav_path = os.path.join(input_dir, filename)

    # === Transcription ===
    result = model.transcribe(wav_path)

    # === Word-Level Alignment ===
    print("📐 Performing word-level alignment...")
    aligned_result = whisperx.align(
        result["segments"], model_a, metadata, wav_path, device=device
    )

    # === Format output JSON ===
    words_timestamps = []
    for segment in aligned_result["word_segments"]:
        words_timestamps.append({
            "word": segment["word"],
            "start": round(segment["start"], 2),
            "end": round(segment["end"], 2)
        })

    # === Save JSON ===
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(words_timestamps, f, ensure_ascii=False, indent=2)

    print(f"✅ JSON saved to: {json_path}")