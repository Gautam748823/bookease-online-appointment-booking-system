import '../styles/about.css';

export default function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About BookEase</h1>
        <p>A modern and smart online scheduling solution built to optimize the appointment booking experience.</p>
      </header>

      <div className="container-card">
        <section className="about-section">
          <h2>Our Company</h2>
          <p>BookEase is dedicated to bridging the gap between individuals and service providers. We design automated, stress-free scheduling tools that minimize wait times, optimize queue loads, and maximize availability representation.</p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>To deliver an accessible, efficient, and professional appointment interface that empowers clients and providers to manage schedules effortlessly without communication friction.</p>
        </section>

        <section className="about-section">
          <h2>Our Vision</h2>
          <p>To become the leading benchmark for online booking platforms, trusted globally for schedule precision, visual ease, and functional excellence.</p>
        </section>

        <section className="about-section">
          <h2>Our Core Values</h2>
          <div className="values-list">
            <div className="value-item">
              <h3>Precision</h3>
              <p>Reliable slot allocation without overlaps.</p>
            </div>
            <div className="value-item">
              <h3>Simplicity</h3>
              <p>Minimalist interface designed for ease of use.</p>
            </div>
            <div className="value-item">
              <h3>Accessibility</h3>
              <p>Fully responsive, and compliant across all viewports.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
