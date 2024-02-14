
from flask import Flask, request, jsonify, render_template
from flask import Flask, send_from_directory
import os
from werkzeug.utils import secure_filename
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

@app.route('/curve_internship')
def curve_internship():
    return render_template('curve_internship.html')

@app.route('/design_intern')
def design_intern():
    return render_template('design_intern.html')

@app.route('/machine_intern')
def machine_intern():
    return render_template('machine_intern.html')

@app.route('/software_intern')
def software_intern():
    return render_template('software_intern.html')

@app.route('/data_internship')
def data_internship():
    return render_template('data_internship.html')

@app.route('/opp')
def opp():
    return render_template('opp.html')



UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def send_email(firstName, lastName, userEmail, phone, filepaths, voluntary_info):
    email_password = os.environ.get('ykhw bllf hbyz ooym')  
    message = MIMEMultipart()
    message["Subject"] = "New Application Submission"
    message["From"] = "chris@enzimotors.com"
    message["To"] = "chris@enzimotors.com"
    body = MIMEText(f"Name: {firstName} {lastName}\nEmail: {userEmail}\nPhone: {phone}\n\nVoluntary Information:\n{voluntary_info}\n")
    message.attach(body)

    for filepath in filepaths:
        part = MIMEBase('application', "octet-stream")
        with open(filepath, 'rb') as file:
            part.set_payload(file.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', 'attachment; filename="{}"'.format(os.path.basename(filepath)))
        message.attach(part)

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("chris@enzimotors.com", "ykhw bllf hbyz ooym")
            server.send_message(message)
        return "Application submitted successfully."
    except Exception as e:
        print(f"Error sending email: {e}")
        return "Failed to send application."

@app.route('/submit-application', methods=['POST'])
def submit_application():
    
    print(request.form)
    try:
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        email = request.form['email']
        phone = request.form['phone']
        form_type = request.form.get('formType', 'Unknown Internship Form')

        gender_identity = request.form.get('genderIdentity', 'Not provided')
        transgender_experience = request.form.get('transgenderExperience', 'Not provided')
        ethnic_identity = request.form.get('ethnicIdentity', 'Not provided')
        sexual_orientation = request.form.get('sexualOrientation', 'Not provided')
        disability_status = request.form.get('disabilityStatus', 'Not provided')
        veteran_status = request.form.get('veteranStatus', 'Not provided')


        filepaths = []

        resume = request.files['resume']
        resumePath = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(resume.filename))
        resume.save(resumePath)
        filepaths.append(resumePath)

        additionalFiles = request.files.getlist('additionalFiles[]')
        for file in additionalFiles:
            filePath = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
            file.save(filePath)
            filepaths.append(filePath)
         
        voluntary_info = f"""
        Gender Identity: {gender_identity}
        Transgender Experience: {transgender_experience}
        Ethnic Identity: {ethnic_identity}
        Sexual Orientation: {sexual_orientation}
        Disability Status: {disability_status}
        Veteran Status: {veteran_status}
        Internship: {form_type}
        """


        email_status = send_email(firstName, lastName, email, phone, filepaths, voluntary_info)
        return jsonify({"message": email_status})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
