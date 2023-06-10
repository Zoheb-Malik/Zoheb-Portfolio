import PageTemplate from "../../components/PageTemplate/PageTemplate";

export default function Home() {
  return (
    <PageTemplate header="Introduction 👋">
      <section>
        <h2 className="remove--margin-top">Brief Summary 📖</h2>
        <section className="page--section shift-left">
          <p>I am a passionate and innovative full-stack software engineer with expertise in front-end development  and have a solid understanding of multiple programming languages.</p>
          <p>Skilled in JavaScript (ReactJS, NodeJS, TypeScript, AngularJS, VueJS), HTML (HTML3, HTML5), CSS (SASS/SCSS), Version Control via GitHub, Cloudflare, PHP, SQL (MySQL, NoSQL), and Artificial Intelligence (AI).</p>
          <p>I have gained valuable experience as a front-end developer at Vertu Motors plc, where I currently continue to contribute to the company's mission statement by providing impactful solutions and developing (ReactJS, AngularJS) apps and maintaining brands through their unique content management systems.</p><p>With a strong focus on creative problem-solving and leadership skills, I consistently strive to deliver outstanding results.</p>
          <p>My career goal is to make a positive and lasting change in the industry, merging my expertise with my passion for travel and photography/videography- I aim to explore the world through my work, embracing new challenges and opportunities.</p>Let's connect and collaborate on exciting projects that drive innovation and create meaningful experiences!
        </section>
      </section>
      {/*
        <section>
          <h2>My Platforms 🌐</h2>
          <section className="page--section">
            TBA
          </section>
        </section>
      */}
    </PageTemplate>
  );
}
