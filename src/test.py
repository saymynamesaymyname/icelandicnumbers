from gtts import gTTS
import os

# Icelandic numbers as strings
numbers = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "20", "30", "40", "50", "60", "70", "80", "90", "Hundrað", "Þúsund", "Milljón"
]

# Language code for Icelandic
language = 'is'

# Function to generate and save mp3 files for the numbers
def generate_mp3(number):
    tts = gTTS(text=number, lang=language, slow=False)
    file_name = f"{number}.mp3"
    tts.save(file_name)
    print(f"Generated {file_name}")

# Generate MP3 files for each number
for number in numbers:
    generate_mp3(number)
