import PageContent from '../../components/PageContent/PageContent';
import PageTemplate from '../../components/PageTemplate/PageTemplate';

export default function Home() {
  return (
    <PageTemplate header='Introduction 👋' displayProfile>
      <PageContent title='Brief Summary 📖' removeMarginTop>
        <div className='shift--text-left'>
          <p className='margin--remove-top'>
            I am a passionate and innovative developer with over 10 years of interest as
            a hobbyist coder and currently have 1.5 years of industry experience.
          </p>
          <p>
            Specialising particularly in web development, I have acquired skills in JavaScript,
            including frontend & backend frameworks such as ReactJS, TypeScript, NodeJS, AngularJS, and VueJS.
            Additionally, I am proficient in other languages and skills such as CSS (SCSS/Sass), PHP, HTML, SQL, and Python.
            I also possess a solid understanding of Version Control (Git, Git BASH, GitHub, GitHub Pages, GitHub Workflows),
            Cloudflare, and have recently developed a strong interest in Artificial Intelligence (AI),
            Prompt Engineering and Large Language Models (LLM's).
          </p>
          <p>
            I have gained valuable experience as a front-end developer at Vertu Motors plc, where I
            currently continue to contribute to the company's mission statement by providing
            impactful solutions and developing (ReactJS, AngularJS) apps and maintaining brands
            through their unique content management systems.
          </p>
          <p>
            With a strong focus on creative problem-solving and leadership skills, I consistently
            strive to deliver outstanding results.
          </p>
          <p>
            My career goal is to make a positive and lasting change in the industry, merging my
            expertise with my passion for travel and photography/videography- I aim to explore the
            world through my work, embracing new challenges and opportunities.
          </p>
          <p>
            Let's connect and collaborate on exciting projects that drive innovation and seek to
            create meaningful experiences!
          </p>
        </div>
      </PageContent>
      {/* <PageContent title='My Platforms 🌐' className='shift--text-left'>
        <div>
          <span>TBA</span>
        </div>
      </PageContent> */}
    </PageTemplate>
  );
}
