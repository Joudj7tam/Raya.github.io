import os
from pydub import AudioSegment

input_dir = "mb3_files"         # Folder with .mp3 files
output_dir = "Wav_files"      # Folder for output .wav files

os.makedirs(output_dir, exist_ok=True)

for filename in os.listdir(input_dir):
    if filename.endswith(".mp3"):
        mp3_path = os.path.join(input_dir, filename)
        wav_path = os.path.join(output_dir, filename.replace(".mp3", ".wav"))

        audio = AudioSegment.from_mp3(mp3_path)
        audio = audio.set_frame_rate(16000).set_channels(1)  # 16kHz mono
        audio.export(wav_path, format="wav")
        print(f"✅ Converted {filename} → {wav_path}")
