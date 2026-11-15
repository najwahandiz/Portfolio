export type JourneyEntry = {
  id: string; year: string; period: string; organization: string;
  title: string; category: string; description: string; current?: boolean;
};

export const journey: JourneyEntry[] = [
  {id:'atirao',year:'2026',period:'May 2026 — Present',organization:'Atirao',title:'Web Developer Intern',category:'Professional experience',current:true,description:'Building responsive websites and contributing to agency tools, conversion reporting, and automation. My work includes the Atirao and AT Boost websites, analytics reporting, and employee leave balances within the team-built ATworkflow platform.'},
  {id:'simplon',year:'2025',period:'October 2025 — March 2026',organization:'Simplon Maghreb',title:'AI-Augmented Frontend Development',category:'Bootcamp',description:'Intensive, hands-on training in React and Next.js, prompt engineering, and practical AI-assisted web projects.'},
  {id:'l2mi',year:'2022',period:'June 2022 — August 2025',organization:'L2MI',title:'Industrial Metrology',category:'Professional experience',description:'Maintained technical records, analyzed measurement data, and contributed to data-entry and automation improvements. A foundation in precision, structure, and working with data.'},
  {id:'university',year:'2019',period:'2019 — 2022',organization:'Hassan II University',title:'Mathematical Sciences & Applied Computer Science',category:'Bachelor’s degree',description:'Faculty of Sciences Ben M’Sik, database track. A grounding in mathematics, applied computer science, and databases.'},
  {id:'baccalaureate',year:'2018',period:'2018 — 2019',organization:'Mathematical Sciences',title:'Baccalaureate — Category A',category:'Education',description:'The mathematics foundation that came before my university studies and work in technology.'}
];
