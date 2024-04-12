
const createBtn = document.querySelector('#createAppointmentsBtn');
createBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var formData = {
        pxid: return_null(document.querySelector('#pxid').value),
        clinicid: return_null(document.querySelector('#clinicid').value),
        doctorid: return_null(document.querySelector('#doctorid').value),
        apptid: return_null(document.querySelector('#apptid').value),
        status: return_null(document.querySelector('#status').value),
        TimeQueued: return_null(document.querySelector('#TimeQueued').value),
        QueueDate: return_null(document.querySelector('#QueueDate').value),
        StartTime: return_null(document.querySelector('#StartTime').value),
        EndTime: return_null(document.querySelector('#EndTime').value),
        type: return_null(document.querySelector('#type').value),
        isVirtual: return_null(document.querySelector('#isVirtual').value),
        mainspecialty: return_null(document.querySelector('#mainspecialty').value),
        hospitalname: return_null(document.querySelector('#hospitalname').value),
        City: return_null(document.querySelector('#City').value),
        Province: return_null(document.querySelector('#Province').value),
        RegionName: return_null(document.querySelector('#RegionName').value),
        age: return_null(document.querySelector('#age').value),
        gender: return_null(document.querySelector('#gender').value),
    };

    var jsonData = JSON.stringify(formData);

    console.log(jsonData);

    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
    .then(response => {
        if (!response.ok) {
            alert('Error creating appointment')
            throw new Error('Network response was not ok');
        }
        alert('Appointment created successfully')
        return response.json();
    });

    document.querySelector('form').reset();
});
