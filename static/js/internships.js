document.querySelector('.scroll-to-application').addEventListener('click', function(e) {
    e.preventDefault();
    const applicationSection = document.getElementById('application-section');
    applicationSection.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('resume').addEventListener('change', function() {
    var fileName = document.getElementById('resume').files[0]?.name;
    document.getElementById('resumeFileName').textContent = fileName ? 'Selected file: ' + fileName : '';
});

let selectedFiles = [];
        
document.getElementById('additionalFiles').addEventListener('change', function() {
    
    Array.from(this.files).forEach(file => {
        if (selectedFiles.length < 5 && !selectedFiles.some(f => f.name === file.name)) {
            selectedFiles.push(file);
        }
    });

   
    if (selectedFiles.length > 5) {
        alert('You can only upload up to 5 documents.');
        selectedFiles = selectedFiles.slice(0, 5); 
    }

    
    document.getElementById('additionalFilesNames').textContent =
        selectedFiles.length > 0 ? 'Selected files: ' + selectedFiles.map(file => file.name).join(', ') : '';
});

document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var submitButton = document.querySelector('.submit-button');
    var loadingMessage = document.getElementById('loadingMessage');
    var formResponse = document.getElementById('formResponse');

    
    submitButton.style.display = 'none';
    loadingMessage.style.display = 'block';

    var formData = new FormData(this);
    
    
    selectedFiles.forEach(file => {
        formData.append('additionalFiles[]', file);
    });

    
    fetch('/submit-application', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        formResponse.textContent = data.message;
        formResponse.style.color = 'green';
        
        submitButton.style.display = 'none';
        loadingMessage.style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        formResponse.textContent = "Error submitting application: " + error;
        formResponse.style.color = 'red';
        
        submitButton.style.display = 'none';
        loadingMessage.style.display = 'none';
    });
});