from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import pandas as pd
import os
from werkzeug.utils import secure_filename

# ------------------- CONFIG -------------------
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
EXCEL_PATH = 'vot_datasets.xlsx'
MODEL_PATH = 'updated_coin_model.h5'   # Trained CNN model path

# Create upload folder if missing
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# ------------------- FLASK APP -------------------
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# ------------------- LOAD MODEL & METADATA -------------------
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded successfully.")
except Exception as e:
    print("❌ Error loading model:", e)

try:
    df = pd.read_excel(EXCEL_PATH)
    df.fillna('', inplace=True)
    coin_ids = df['coin_id'].tolist()
    print("✅ Excel metadata loaded successfully.")
except Exception as e:
    print("❌ Error loading Excel file:", e)
    df = pd.DataFrame()
    coin_ids = []

# ------------------- HELPERS -------------------
def allowed_file(filename):
    """Check valid image extensions"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def prepare_image(img_path, target_size=(128, 128)):
    """Preprocess image for model"""
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    return img_array

# ------------------- ROUTES -------------------
@app.route('/')
def home():
    return "Vault of Time API is running ✅"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        try:
            # Prepare image and make prediction
            img = prepare_image(file_path)
            predictions = model.predict(img)
            class_idx = int(np.argmax(predictions[0]))
            confidence = float(np.max(predictions[0]))

            # Fetch metadata
            if class_idx < len(coin_ids):
                predicted_coin_id = coin_ids[class_idx]
                metadata_row = df[df['coin_id'] == predicted_coin_id]
                if not metadata_row.empty:
                    metadata = metadata_row.to_dict(orient='records')[0]
                else:
                    metadata = {}
            else:
                metadata = {}

            # Build response
            result = {
                'coin_id': metadata.get('coin_id', 'Unknown'),
                'confidence': confidence,
                'metadata': {
                    'type': metadata.get('type', 'Unknown'),
                    'dynasty': metadata.get('dynasty', 'Unknown'),
                    'year': str(metadata.get('year', 'Unknown')),
                    'metal': metadata.get('metal', 'Unknown'),
                    'weight': str(metadata.get('weight', 'Unknown')),
                    'diameter': str(metadata.get('diameter', 'Unknown')),
                    'shape': metadata.get('shape', 'Unknown'),
                    'orientation': metadata.get('orientation', 'Unknown'),
                    'demonetized': metadata.get('demonetized', 'Unknown'),
                    'number': str(metadata.get('number', 'Unknown')),
                    'reference': metadata.get('reference', 'Unknown'),
                    'obverse': metadata.get('obverse', 'Unknown'),
                    'reverse': metadata.get('reverse', 'Unknown'),
                    'value': metadata.get('VALUE', 'Unknown'),
                    'comment': metadata.get('comment', '')
                }
            }

            return jsonify(result)
        except Exception as e:
            print("❌ Prediction error:", e)
            return jsonify({'error': 'Prediction failed', 'details': str(e)}), 500

    return jsonify({'error': 'Invalid file type'}), 400


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
