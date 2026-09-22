const MobileBottomNav = () => {
  return (
    <nav className="mobile-bottom-nav" aria-label="Quick contact">
      <a className="mobile-bottom-nav-item" href="tel:8120812010">
        <i className="bi bi-telephone-fill" aria-hidden="true" />
        <span>Call</span>
      </a>

      <a
        className="mobile-bottom-nav-item"
        href="https://api.whatsapp.com/send?phone=919302017656&text=Hello,%20I%20have%20a%20question%20about%20https%3A%2F%2Fthevaluationschool.com%2F"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-whatsapp" aria-hidden="true" />
        <span>Whatsapp</span>
      </a>

      {/* TODO: wire up to the site search once available */}
      {/* <button type="button" className="mobile-bottom-nav-item" aria-label="Search">
        <i className="bi bi-search" aria-hidden="true" />
        <span>Search</span>
      </button> */}

      <a className="mobile-bottom-nav-item" href="mailto:contact@thevaluationschool.com">
        <i className="bi bi-envelope-fill" aria-hidden="true" />
        <span>Email</span>
      </a>
    </nav>
  );
};

export default MobileBottomNav;
