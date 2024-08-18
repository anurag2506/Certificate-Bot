export function saveCertificateDetails(details) {
    localStorage.setItem('lastCertificate', JSON.stringify(details));
  }
  
  export function getLastCertificateDetails() {
    const data = localStorage.getItem('lastCertificate');
    return data ? JSON.parse(data) : null;
  }