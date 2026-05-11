export type QType = "mcq" | "tf" | "match";

export type Question = {
  id: string;
  type: QType;
  q: string;
  options?: string[];
  answer: string | boolean | Record<string, string>;
  pairs?: { left: string; right: string }[];
  explanation: string;
};

export type Level = "Basic" | "Intermediate" | "Advanced";
export const LEVELS: Level[] = ["Basic", "Intermediate", "Advanced"];

export type Topic = {
  id: string;
  name: string;
  levels: Record<Level, Question[]>;
  finalTest: Question[];
};

export type Subject = {
  id: string;
  name: string;
  icon: string;
  topics: Topic[];
};

const mcq = (id: string, q: string, options: string[], answer: string, explanation: string): Question => ({
  id, type: "mcq", q, options, answer, explanation,
});
const tf = (id: string, q: string, answer: boolean, explanation: string): Question => ({
  id, type: "tf", q, answer, explanation,
});
const match = (id: string, q: string, pairs: { left: string; right: string }[], explanation: string): Question => ({
  id, type: "match", q, pairs,
  answer: pairs.reduce((a, p) => ({ ...a, [p.left]: p.right }), {}),
  explanation,
});

export const SUBJECTS: Subject[] = [
  {
    id: "math", name: "Mathematics", icon: "📐",
    topics: [
      {
        id: "algebra", name: "Algebra",
        levels: {
          Basic: [
            mcq("a1", "What is 2x + 3 = 7, x = ?", ["1", "2", "3", "4"], "2", "Subtract 3 from both sides: 2x = 4, so x = 2."),
            tf("a2", "The equation x + 0 = x is an identity.", true, "Adding zero doesn't change the value — it's the additive identity."),
            mcq("a3", "Simplify: 3(x+2)", ["3x+2", "3x+6", "x+6", "3x"], "3x+6", "Distribute 3 across both terms inside the parentheses."),
          ],
          Intermediate: [
            mcq("a4", "Solve: x² = 49", ["7", "-7", "±7", "14"], "±7", "Square roots have both positive and negative solutions."),
            match("a5", "Match the expression to its expansion", [
              { left: "(x+1)²", right: "x²+2x+1" },
              { left: "(x-1)²", right: "x²-2x+1" },
              { left: "(x+1)(x-1)", right: "x²-1" },
            ], "Use standard binomial identities."),
          ],
          Advanced: [
            mcq("a6", "Discriminant of x²+2x+5?", ["-16", "16", "4", "-4"], "-16", "b²-4ac = 4-20 = -16, meaning no real roots."),
            tf("a7", "All quadratics have two real roots.", false, "Discriminant can be negative, yielding complex roots."),
          ],
        },
        finalTest: [
          mcq("af1", "Solve 2x = 10", ["3", "5", "10", "20"], "5", ""),
          tf("af2", "(x+1)² = x²+1", false, ""),
          mcq("af3", "x² = 16, x =", ["4", "-4", "±4", "8"], "±4", ""),
        ],
      },
      {
        id: "geometry", name: "Geometry",
        levels: {
          Basic: [
            mcq("g1", "Sum of angles in a triangle?", ["90°", "180°", "270°", "360°"], "180°", "Triangle angles always sum to 180°."),
            tf("g2", "A square has 4 equal sides.", true, "By definition."),
          ],
          Intermediate: [
            mcq("g3", "Area of circle radius 3?", ["6π", "9π", "3π", "12π"], "9π", "A = πr² = 9π."),
          ],
          Advanced: [
            mcq("g4", "Pythagoras for 3,4,?", ["5", "6", "7", "8"], "5", "3²+4² = 25, √25 = 5."),
          ],
        },
        finalTest: [
          mcq("gf1", "Angles in triangle?", ["90", "180", "360"], "180", ""),
        ],
      },
    ],
  },
  {
    id: "sci", name: "Science", icon: "🔬",
    topics: [
      {
        id: "physics", name: "Physics",
        levels: {
          Basic: [
            mcq("p1", "Unit of force?", ["Joule", "Newton", "Watt", "Pascal"], "Newton", "Named after Isaac Newton."),
            tf("p2", "Light travels faster than sound.", true, "Light ≈ 3×10⁸ m/s, sound ≈ 343 m/s in air."),
          ],
          Intermediate: [
            mcq("p3", "F = ?", ["ma", "mv", "mv²", "m/a"], "ma", "Newton's second law."),
          ],
          Advanced: [
            mcq("p4", "E = ?", ["mc", "mc²", "m²c", "m/c²"], "mc²", "Einstein's mass-energy equivalence."),
          ],
        },
        finalTest: [mcq("pf1", "F=?", ["ma", "mv"], "ma", "")],
      },
    ],
  },
  {
    id: "cs", name: "Computer Science", icon: "💻",
    topics: [
      {
        id: "web", name: "Web Basics",
        levels: {
          Basic: [
            mcq("w1", "HTML stands for?", [
              "Hyper Trainer Marking Language",
              "HyperText Markup Language",
              "HyperText Machine Language",
              "High Text Markup Language"
            ], "HyperText Markup Language", "HTML is the standard markup language for web pages."),
            tf("w2", "CSS styles web pages.", true, "CSS controls presentation."),
          ],
          Intermediate: [
            mcq("w3", "Which is a JS framework?", ["Django", "React", "Rails", "Flask"], "React", "React is a JavaScript library/framework."),
          ],
          Advanced: [
            mcq("w4", "HTTP status for Not Found?", ["200", "301", "404", "500"], "404", "404 = resource not found."),
          ],
        },
        finalTest: [mcq("wf1", "HTML?", ["Markup", "Script"], "Markup", "")],
      },
    ],
  },
];
