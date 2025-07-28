# === a code to generate json files for a SPECIFIC wav files (multiple specific files) ===#
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

# === Get and sort all .wav files ===
wav_files = sorted(
    [f for f in os.listdir(input_dir) if f.endswith(".wav")],
    key=extract_leading_number
)

# === You select the files manually here ===
# You can specify either full filenames or file numbers (1-based index from sorted list)
selected_files_input = [
    6,10,64,81,90,94
]

# === Convert number selections to filenames ===
selected_files = []
for entry in selected_files_input:
    if isinstance(entry, int):
        index = entry - 1
        if 0 <= index < len(wav_files):
            selected_files.append(wav_files[index])
    elif isinstance(entry, str) and entry in wav_files:
        selected_files.append(entry)

# === Validate selection ===
if not selected_files:
    print("❌ No valid files selected. Exiting.")
    exit()

print("\n📂 Files selected for processing:")
for f in selected_files:
    print("→", f)

# === Transcribe and generate JSON ===
for filename in selected_files:
    json_filename = filename.replace(".wav", ".json")
    json_path = os.path.join(output_dir, json_filename)

    if os.path.exists(json_path):
        print(f"♻️ Overwriting existing JSON for '{filename}'")

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