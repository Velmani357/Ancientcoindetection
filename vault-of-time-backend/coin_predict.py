import requests

file_path = r"C:\Users\USER\OneDrive\Desktop\vot\chera8.jpg"
url = "http://127.0.0.1:5000/predict"

# Send the image to Flask backend
resp = requests.post(url, files={"file": open(file_path, "rb")}).json()

# Get metadata
metadata = resp.get('metadata', {})

# Print all relevant metadata neatly
print("---- Coin Metadata ----")
print(f"Demonetized: {metadata.get('demonetized', 'N/A')}")
print(f"Dynasty: {metadata.get('dynasty', 'N/A')}")
print(f"Type: {metadata.get('type', 'N/A')}")
print(f"Year: {metadata.get('year', 'N/A')}")
print(f"Metal: {metadata.get('metal', 'N/A')}")
print(f"Weight: {metadata.get('weight', 'N/A')}")
print(f"Diameter: {metadata.get('diameter', 'N/A')}")
print(f"Shape: {metadata.get('shape', 'N/A')}")
print(f"Orientation: {metadata.get('orientation', 'N/A')}")
print(f"Obverse: {metadata.get('obverse', 'N/A')}")
print(f"Reverse: {metadata.get('reverse', 'N/A')}")
print(f"Number: {metadata.get('number', 'N/A')}")
print(f"References: {metadata.get('reference', 'N/A')}")
print(f"Value: {metadata.get('value', 'N/A')}")
print(f"Comment: {metadata.get('comment', 'N/A')}")
print(f"Confidence: {resp.get('confidence', 'N/A')}")
