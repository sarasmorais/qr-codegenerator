import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Generate QR codes instantly for URLs, text, and contact information</p>
        <p className="copyright">© {new Date().getFullYear()} QR Code Generator</p>
      </div>
    </footer>
  );
}

export default Footer;