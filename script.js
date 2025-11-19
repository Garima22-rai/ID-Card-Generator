// Show login first
document.getElementById('stepLogin').classList.add('active');

const stepLogin = document.getElementById('stepLogin');
const stepDetails = document.getElementById('stepDetails');
const stepCard = document.getElementById('stepCard');

// Step 1: Login Next
document.getElementById('loginNext').addEventListener('click', () => {
    const name = document.getElementById('loginName').value.trim();
    const course = document.getElementById('loginCourse').value.trim();
    const college = document.getElementById('loginCollege').value.trim();
    if(name && course && college){
        localStorage.setItem('name', name);
        localStorage.setItem('course', course);
        localStorage.setItem('college', college);

        stepLogin.classList.remove('active');
        stepDetails.classList.add('active');
    } else {
        alert("Please fill all fields");
    }
});

// Step 2: Details Next
document.getElementById('detailsNext').addEventListener('click', () => {
    const contact = document.getElementById('contact').value.trim();
const session = document.getElementById('session').value.trim();
    const year = document.getElementById('year').value.trim();
    const address = document.getElementById('address').value.trim();
    const studentID = document.getElementById('studentID').value.trim();
    const photoInput = document.getElementById('photo');

    if(contact &&session&& year && address && studentID){
        localStorage.setItem('contact', contact);
        localStorage.setItem('session', session);
        localStorage.setItem('year', year);
        localStorage.setItem('address', address);
        localStorage.setItem('studentID', studentID);

        if(photoInput.files && photoInput.files[0]){
            const reader = new FileReader();
            reader.onload = function(e){
                localStorage.setItem('photo', e.target.result);
                generateCard();
            }
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            generateCard();
        }
    } else {
        alert("Please fill all fields");
    }
});

// Generate ID Card
function generateCard(){
    document.getElementById('cardName').textContent = localStorage.getItem('name');
    document.getElementById('cardCourse').textContent = localStorage.getItem('course');
    document.getElementById('collegeName').textContent = localStorage.getItem('college');
    document.getElementById('cardID').textContent = localStorage.getItem('studentID');
    document.getElementById('cardSession').textContent = localStorage.getItem('session');
 document.getElementById('cardYear').textContent = localStorage.getItem('year');
    document.getElementById('cardContact').textContent = localStorage.getItem('contact');
    document.getElementById('cardAddress').textContent = localStorage.getItem('address');

    const photo = localStorage.getItem('photo');
    document.getElementById('cardPhoto').src = photo ? photo : 'default-photo.png';

    stepDetails.classList.remove('active');
    stepCard.classList.add('active');
}

// Download PNG
document.getElementById('downloadPNG').addEventListener('click', () => {
    html2canvas(document.getElementById('idCard')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ID_Card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Download PDF
document.getElementById('downloadPDF').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    html2canvas(document.getElementById('idCard')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('ID_Card.pdf');
    });
});

