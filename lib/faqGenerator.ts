export function generateFAQ(city: string, area: any) {
  return [
    {
      question: `Do you provide balcony safety nets in ${area.name}, ${city}?`,
      answer: `Yes, we provide professional balcony safety net installation in ${area.name} with durable materials and expert fitting.`,
    },
    {
      question: `How much does safety net installation cost in ${area.name}?`,
      answer: `The cost depends on balcony size and material type. We provide affordable pricing for homes in ${area.name}.`,
    },
    {
      question: `How long does installation take in ${area.name}?`,
      answer: `Most installations in ${area.name} are completed within a few hours.`,
    },
  ];
}