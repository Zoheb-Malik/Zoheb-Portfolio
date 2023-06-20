import PageContent from '../../components/PageContent/PageContent';
import PageTemplate from '../../components/PageTemplate/PageTemplate';

export default function Home() {
  return (
    <PageTemplate header='Introduction 👋' displayProfile>
      <PageContent title='Brief Summary 📖' removeMarginTop>
        <div className='shift--text-left'>
          <p className='margin--remove-top'>
            I am a passionate and innovative full-stack software engineer with 1.5 years of experience
            in the industry and over 10 years of experience as a hobbyist coder.
          </p>
          <p>
            Particularly specialising in front-end development, I am skilled in JavaScript
            (ReactJS, NodeJS, TypeScript, AngularJS, VueJS), HTML5, CSS3 (SASS/SCSS),
            and have gained proficiency in some backend technologies.
            I also possess a solid understanding of Version Control (GitHub), Cloudflare, PHP, SQL (MySQL, NoSQL),
            and have recently taken a large interest in Artificial Intelligence (AI).
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
