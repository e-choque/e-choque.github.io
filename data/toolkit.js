/* =========================================================================
   TOOLKIT  -  the skills cards on the CV page
   -------------------------------------------------------------------------
   One { ... } block per card. Change the words inside the quotes.
   title: card title in English (en) and Spanish (es)
   icon:  "target" | "database" | "code" | "flow" | "map" | "globe"
   items: the labels shown in the card; give en and es when the words
          differ between languages, or one list when they are the same.
   ========================================================================= */

window.TOOLKIT = [
  {
    icon: "target",
    title: { en: "Methods", es: "Métodos" },
    items: {
      en: ["Impact evaluation (RCTs)", "Quasi-experimental designs", "Spatial & network analysis", "Microeconometrics", "Collusion screening"],
      es: ["Evaluación de impacto (RCT)", "Diseños cuasiexperimentales", "Análisis espacial y de redes", "Microeconometría", "Detección de colusión"]
    }
  },
  {
    icon: "database",
    title: { en: "Data", es: "Datos" },
    items: {
      en: ["Mobile phone mobility data", "Census & household surveys", "Administrative records", "Online job vacancies"],
      es: ["Movilidad de telefonía celular", "Censos y encuestas de hogares", "Registros administrativos", "Vacantes laborales en línea"]
    }
  },
  {
    icon: "code",
    title: { en: "Programming", es: "Programación" },
    items: ["R", "Stata", "Python", "SQL", "Julia"]
  },
  {
    icon: "flow",
    title: { en: "Workflow & AI", es: "Flujo de trabajo e IA" },
    items: ["LaTeX", "Quarto", "Git / GitHub", "Positron", "Claude Code", "Codex", "Gemini", "Elicit", "Consensus"]
  },
  {
    icon: "map",
    title: { en: "GIS & field tools", es: "SIG y trabajo de campo" },
    items: ["ArcGIS", "CSPro", "KoBoToolbox", "SPSS", "Redatam", "Power BI", "Dynare"]
  }
];

/* Languages card: level from 1 (basic) to 5 (native), shown as dots */
window.LANGUAGES = {
  title: { en: "Languages", es: "Idiomas" },
  list: [
    { name: { en: "Spanish", es: "Español" }, level: 5, note: { en: "Native", es: "Nativo" } },
    { name: { en: "English", es: "Inglés" },  level: 4, note: { en: "Intermediate–advanced (TOEFL)", es: "Intermedio–avanzado (TOEFL)" } },
    { name: { en: "Aymara", es: "Aymara" },   level: 2, note: { en: "Basic", es: "Básico" } }
  ]
};
