import IDegree from './IDegree';
import IWorkExperience from './IWorkExperience';
import './../../styles/pages/About.scss';
import PageTemplate from '../../components/PageTemplate/PageTemplate';

const forename = 'Zoheb';
const surname = 'Malik';
const dateOfBirth: Date = new Date(1999, 0, 13);
const location = 'England, United Kingdom';

const degree: IDegree = {
  university: 'Manchester Metropolitan University',
  qualification: 'Bachelor of Science - BSc (Hons)',
  field: 'Computer Software Engineering',
  grade: 'First Class',
};

const JavaScript = [
  'JavaScript (VanillaJS, JQuery)',
  'Node.js',
  'React.js',
  'TypeScript',
  'AngularJS',
  'Vue.js',
];

const CSS = ['CSS', 'SCSS', 'Sass'];

const SQL = ['MySQL', 'NoSQL'];

const programmingLanguages = [
  'HTML',
  ...JavaScript,
  ...CSS,
  'PHP',
  'Python (Programming Language)',
  ...SQL,
];

const Git = ['Git', 'GitHub'];

const AI = ['Artificial Intelligence (AI)', 'Prompt Engineering', 'Large Language Models (LLM)'];

const personalSkills = [
  'Creative Problem Solving',
  'Leadership',
  'Innovation',
  'Resourcefulness',
  'Maintaining Content Management Systems (CMS)',
];

const skills = [...programmingLanguages, ...Git, ...AI, ...personalSkills];

const skillColors: { [key: string]: string } = {
  HTML: 'dodgerblue',
  'JavaScript (VanillaJS, JQuery)': 'yellow',
  'Node.js': 'lime',
  'React.js': 'cornflowerblue',
  TypeScript: 'lightblue',
  AngularJS: 'lightcoral',
  'Vue.js': 'cadetblue',
  CSS: 'pink',
  SCSS: 'pink',
  Sass: 'pink',
  PHP: 'red',
  'Python (Programming Language)': 'lightblue',
  Git: 'lightgrey',
  GitHub: 'lightgrey',
  'Artificial Intelligence (AI)': 'goldenrod',
  'Prompt Engineering': 'goldenrod',
  'Large Language Models (LLM)': 'goldenrod',
};

const workExperience: IWorkExperience[] = [
  {
    company: 'Vertu Motors plc',
    jobTitle: 'Junior React Developer',
    duration: 'February 14th, 2022 - August 14th, 2022',
  },
  {
    company: 'Vertu Motors plc',
    jobTitle: 'Front-End Developer',
    duration: 'August 14th, 2022 - Present',
  },
];

export default function About() {
  function renderWorkExperience() {
    return workExperience.map((experience, i) => {
      const key = `experience-${i}`;
      return (
        <div key={key}>
          <span>
            <strong>{experience.jobTitle}</strong> at {experience.company} ({experience.duration})
          </span>
        </div>
      );
    });
  }

  function renderSkills() {
    return skills.map((skill, i) => {
      const key = `skill-${i}`;
      const style = {
        color: skillColors[skill] || 'white',
      };
      return (
        <li key={key} style={style}>
          {skill}
        </li>
      );
    });
  }

  return (
    <PageTemplate header="About Me ツ">
      <section>
        <h2 className="remove--margin-top">Personal Details 📋</h2>
      <section className="page--section">
        <div>
          <strong>Name:</strong> {`${forename} ${surname}`}
        </div>
        <div>
          <strong>Date of Birth:</strong> {dateOfBirth.toLocaleDateString()}
        </div>
        <div>
          <strong>Location:</strong> {location}
        </div>
      </section>
      </section>
      <section>
        <h2>My Education 🎓</h2>
        <section className="page--section">
          <div>
            <strong>University:</strong> {degree.university}
          </div>
          <div>
            <strong>Degree:</strong> {degree.qualification}
          </div>
          <div>
            <strong>Field of Study:</strong> {degree.field}
          </div>
          <div>
            <strong>Grade:</strong> {degree.grade}
          </div>
        </section>
      </section>
      <section>
        <h2>Work Experience 💻</h2>
        <section className="page--section">{renderWorkExperience()}</section>
      </section>
      <section>
        <h2>Programming Languages & Skills ✒️</h2>
        <section className="page--section skills--container remove--margin">
          <div className="skills">
            <ul>{renderSkills()}</ul>
          </div>
        </section>
      </section>
    </PageTemplate>
  );
}
