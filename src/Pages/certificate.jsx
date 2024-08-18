import React, { useState, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import axios from 'axios';
import template from './certificate.png';
import './certificate.css';
import { saveCertificateDetails, getLastCertificateDetails } from './certificateStorage';

const Certificate = () => {
    const ref = useRef(null);

    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [dateOfCompletion, setDateOfCompletion] = useState('');
    const [instructor, setInstructor] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const viewLastCertificate = () => {
        const lastDetails = getLastCertificateDetails();
        if (lastDetails) {
          setName(lastDetails.name);
          setCourse(lastDetails.course);
          setInstructor(lastDetails.instructor);
          setDateOfCompletion(lastDetails.dateOfCompletion);
        } else {
          alert('No previous certificate found');
        }
    };

    const uploadImage = async (imageBlob) => {
        try {
            const formData = new FormData();
            formData.append('file', imageBlob, 'certificate.png');

            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.fileUrl; // URL of the uploaded image
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const sendCertificate = async (imageUrl) => {
        try {
            const response = await axios.post('http://localhost:5000/send-whatsapp', {
                imageUrl,
                toPhoneNumber: `whatsapp:+${phoneNumber}`,
                body: `Congratulations ${name} on completing the course "${course}" on ${dateOfCompletion}. Instructor: ${instructor}`
            });
            alert('Certificate sent via WhatsApp!');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send the certificate.');
        }
    };

    const onDownloadClick = useCallback(async () => {
        if (ref.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(ref.current, { cacheBust: true });
            const response = await fetch(dataUrl);
            const imageBlob = await response.blob();

            // Save certificate details
            saveCertificateDetails({ name, course, instructor, dateOfCompletion });

            // Trigger download
            const link = document.createElement('a');
            link.download = 'certificate.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.log(err);
        }
    }, [ref, name, course, instructor, dateOfCompletion]);

    const onShareClick = useCallback(async () => {
        if (ref.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(ref.current, { cacheBust: true });
            const response = await fetch(dataUrl);
            const imageBlob = await response.blob();

            const imageUrl = await uploadImage(imageBlob);
            if (imageUrl) {
                await sendCertificate(imageUrl);
            }
        } catch (err) {
            console.log(err);
        }
    }, [ref, name, course, instructor, dateOfCompletion, phoneNumber]);

    return (
        <div>
            <input
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                placeholder='Name of the course'
                value={course}
                onChange={(e) => setCourse(e.target.value)}
            />
            <input
                type='text'
                placeholder='Name of the instructor'
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
            />
            <input
                type='text'
                placeholder='Date of Completion: MM-DD-YYYY'
                value={dateOfCompletion}
                onChange={(e) => setDateOfCompletion(e.target.value)}
            />
            <input
                type='text'
                placeholder='WhatsApp Phone Number (without +)'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="container" ref={ref}>
                <img src={template} alt="Certificate template" className="template" />
                <div className="content">
                    <h1>{name}</h1>
                    <h2>{course}</h2>
                    <h4>{dateOfCompletion}</h4>
                    <h3>{instructor}</h3>
                </div>
            </div>
            <button onClick={onDownloadClick}>Download</button>
            <button onClick={onShareClick}>Share via WhatsApp</button>
            <button onClick={viewLastCertificate}>View Last Certificate</button>
        </div>
    );
}

export default Certificate;