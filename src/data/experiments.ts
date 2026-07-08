export interface Experiment {
  id: string;
  subject: string;
  titles: {
    uz: string;
    ru: string;
    en: string;
  };
  link: string;
  provider: "PhET" | "Labster";
}

export const experiments: Experiment[] = [
  {
    id: "phet-1",
    subject: "Fizika",
    titles: {
      uz: "Kuch va harakat asoslari",
      ru: "Основы сил и движения",
      en: "Forces and Motion: Basics"
    },
    link: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html",
    provider: "PhET"
  },
  {
    id: "phet-2",
    subject: "Kimyo",
    titles: {
      uz: "Atom qurilishi",
      ru: "Строение атома",
      en: "Build an Atom"
    },
    link: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_all.html",
    provider: "PhET"
  },
  {
    id: "phet-3",
    subject: "Biologiya",
    titles: {
      uz: "Tabiiy tanlanish",
      ru: "Естественный отбор",
      en: "Natural Selection"
    },
    link: "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_all.html",
    provider: "PhET"
  },
  {
    id: "phet-4",
    subject: "Fizika",
    titles: {
      uz: "Energiya shakllari va o'zgarishi",
      ru: "Формы и превращения энергии",
      en: "Energy Forms and Changes"
    },
    link: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_all.html",
    provider: "PhET"
  },
  {
    id: "phet-5",
    subject: "Kimyo",
    titles: {
      uz: "Eritmalar konsentratsiyasi",
      ru: "Концентрация растворов",
      en: "Concentration"
    },
    link: "https://phet.colorado.edu/sims/html/concentration/latest/concentration_all.html",
    provider: "PhET"
  },
  {
    id: "phet-6",
    subject: "Matematika",
    titles: {
      uz: "Kasrlar bilan ishlash",
      ru: "Работа с дробями",
      en: "Fractions: Intro"
    },
    link: "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html",
    provider: "PhET"
  },
  {
    id: "phet-7",
    subject: "Fizika",
    titles: {
      uz: "Guk qonuni",
      ru: "Закон Гука",
      en: "Hooke's Law"
    },
    link: "https://phet.colorado.edu/sims/html/hookes-law/latest/hookes-law_all.html",
    provider: "PhET"
  },
  {
    id: "phet-8",
    subject: "Kimyo",
    titles: {
      uz: "Molekulalar shakli",
      ru: "Форма молекул",
      en: "Molecule Shapes"
    },
    link: "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_all.html",
    provider: "PhET"
  },
  {
    id: "phet-9",
    subject: "Biologiya",
    titles: {
      uz: "Gen ifodalanishi",
      ru: "Экспрессия генов",
      en: "Gene Expression Essentials"
    },
    link: "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_all.html",
    provider: "PhET"
  },
  {
    id: "phet-10",
    subject: "Fizika",
    titles: {
      uz: "Zaryadlar va maydonlar",
      ru: "Заряды и поля",
      en: "Charges and Fields"
    },
    link: "https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_all.html",
    provider: "PhET"
  },
  {
    id: "phet-11",
    subject: "Kimyo",
    titles: {
      uz: "Gazlar xossalari",
      ru: "Свойства газов",
      en: "Gases Intro"
    },
    link: "https://phet.colorado.edu/sims/html/gases-intro/latest/gases-intro_all.html",
    provider: "PhET"
  },
  {
    id: "phet-12",
    subject: "Fizika",
    titles: {
      uz: "Yorug'likning sinishi",
      ru: "Преломление света",
      en: "Bending Light"
    },
    link: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html",
    provider: "PhET"
  },
  {
    id: "phet-13",
    subject: "Kimyo",
    titles: {
      uz: "pH shkalasi",
      ru: "Шкала pH",
      en: "pH Scale"
    },
    link: "https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_all.html",
    provider: "PhET"
  },
  {
    id: "phet-14",
    subject: "Fizika",
    titles: {
      uz: "Faradey qonuni",
      ru: "Закон Фарадея",
      en: "Faraday's Law"
    },
    link: "https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_all.html",
    provider: "PhET"
  },
  {
    id: "phet-15",
    subject: "Biologiya",
    titles: {
      uz: "Neyronlar",
      ru: "Нейроны",
      en: "Neuron"
    },
    link: "https://phet.colorado.edu/sims/html/neuron/latest/neuron_all.html",
    provider: "PhET"
  },
  {
    id: "phet-16",
    subject: "Fizika",
    titles: {
      uz: "Ballistik harakat",
      ru: "Движение снаряда",
      en: "Projectile Motion"
    },
    link: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_all.html",
    provider: "PhET"
  },
  {
    id: "phet-17",
    subject: "Kimyo",
    titles: {
      uz: "Izotoplar va atom massasi",
      ru: "Изотопы и атомная масса",
      en: "Isotopes and Atomic Mass"
    },
    link: "https://phet.colorado.edu/sims/html/isotopes-and-atomic-mass/latest/isotopes-and-atomic-mass_all.html",
    provider: "PhET"
  },
  {
    id: "phet-18",
    subject: "Fizika",
    titles: {
      uz: "To'lqinlar interferensiyasi",
      ru: "Интерференция волн",
      en: "Wave Interference"
    },
    link: "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_all.html",
    provider: "PhET"
  },
  {
    id: "phet-19",
    subject: "Kimyo",
    titles: {
      uz: "Reaksiya tezligi",
      ru: "Скорость реакции",
      en: "Reactions and Rates"
    },
    link: "https://phet.colorado.edu/sims/html/reactions-and-rates/latest/reactions-and-rates_all.html",
    provider: "PhET"
  },
  {
    id: "phet-20",
    subject: "Biologiya",
    titles: {
      uz: "Fotosintez",
      ru: "Фотосинтез",
      en: "Photosynthesis"
    },
    link: "https://phet.colorado.edu/sims/html/photosynthesis/latest/photosynthesis_all.html",
    provider: "PhET"
  },
  {
    id: "phet-21",
    subject: "Fizika",
    titles: {
      uz: "Statik elektr",
      ru: "Статическое электричество",
      en: "John Travoltage"
    },
    link: "https://phet.colorado.edu/sims/html/john-travoltage/latest/john-travoltage_all.html",
    provider: "PhET"
  },
  {
    id: "phet-22",
    subject: "Kimyo",
    titles: {
      uz: "Molyarlik",
      ru: "Молярность",
      en: "Molarity"
    },
    link: "https://phet.colorado.edu/sims/html/molarity/latest/molarity_all.html",
    provider: "PhET"
  },
  {
    id: "phet-23",
    subject: "Fizika",
    titles: {
      uz: "Zichlik",
      ru: "Плотность",
      en: "Density"
    },
    link: "https://phet.colorado.edu/sims/html/density/latest/density_all.html",
    provider: "PhET"
  },
  {
    id: "phet-24",
    subject: "Kimyo",
    titles: {
      uz: "Eritmalar tayyorlash",
      ru: "Приготовление растворов",
      en: "Solutions"
    },
    link: "https://phet.colorado.edu/sims/html/concentration/latest/concentration_all.html",
    provider: "PhET"
  },
  {
    id: "phet-25",
    subject: "Biologiya",
    titles: {
      uz: "Hujayra tuzilishi",
      ru: "Строение клетки",
      en: "Cell Structure"
    },
    link: "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_all.html",
    provider: "PhET"
  },
  {
    id: "phet-26",
    subject: "Fizika",
    titles: {
      uz: "Magnit maydon",
      ru: "Магнитное поле",
      en: "Magnets and Electromagnets"
    },
    link: "https://phet.colorado.edu/sims/html/magnets-and-electromagnets/latest/magnets-and-electromagnets_all.html",
    provider: "PhET"
  },
  {
    id: "phet-27",
    subject: "Kimyo",
    titles: {
      uz: "Atom massasi",
      ru: "Атомная масса",
      en: "Atomic Mass"
    },
    link: "https://phet.colorado.edu/sims/html/isotopes-and-atomic-mass/latest/isotopes-and-atomic-mass_all.html",
    provider: "PhET"
  },
  {
    id: "phet-28",
    subject: "Matematika",
    titles: {
      uz: "Grafik chizish",
      ru: "Построение графиков",
      en: "Graphing Lines"
    },
    link: "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_all.html",
    provider: "PhET"
  },
  {
    id: "phet-29",
    subject: "Fizika",
    titles: {
      uz: "O'zgaruvchan tok",
      ru: "Переменный ток",
      en: "Circuit Construction Kit: AC"
    },
    link: "https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_all.html",
    provider: "PhET"
  },
  {
    id: "phet-30",
    subject: "Kimyo",
    titles: {
      uz: "Kislota-asos eritmalari",
      ru: "Кислотно-основные растворы",
      en: "Acid-Base Solutions"
    },
    link: "https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_all.html",
    provider: "PhET"
  }
];
