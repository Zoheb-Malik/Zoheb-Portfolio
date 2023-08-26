export default function PageFooter() {
  return (
    <footer className="page__footer">
      <a href="https://github.com/Zoheb-Malik" target="_blank">
        <img
          className="icon--small"
          src="https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png"
          alt="GitHub Icon"
        />
      </a>
      <span style={{ marginRight: '10px' }}></span>
      <a href="https://www.linkedin.com/in/zoheb-malik/" target="_blank">
        <img
          className="icon--small"
          src="https://www.cdnlogo.com/logos/l/66/linkedin-icon.svg"
          alt="LinkedIn Icon"
        />
      </a>
      <span style={{ marginRight: '10px' }}></span>
      <a href="https://instagram.com/zo.h.eb" target="_blank">
        <img
          className="icon--small"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          alt="Instagram Icon"
        />
      </a>
      <p>
        <strong>Zoheb Malik © 2023-2024</strong>
      </p>
    </footer>
  );
}
