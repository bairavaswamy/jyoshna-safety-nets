type Context = {
  service: string;
  location: string;
};

const openings = [
  "Professional",
  "Trusted",
  "Advanced",
  "Modern",
  "Reliable",
  "Premium",
];

const intents = [
  "installation services",
  "safety solutions",
  "protective systems",
  "home security upgrades",
];

const benefits = [
  "improved safety",
  "uninterrupted airflow",
  "clear outdoor view",
  "durable protection",
];

export function generateSentence({ service, location }: Context) {
  const o = openings[Math.floor(Math.random() * openings.length)];
  const i = intents[Math.floor(Math.random() * intents.length)];
  const b = benefits[Math.floor(Math.random() * benefits.length)];

  return `${o} ${service} ${i} in ${location} provide ${b} for apartments and residential spaces.`;
}