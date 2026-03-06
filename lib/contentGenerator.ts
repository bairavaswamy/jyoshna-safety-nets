export function generateAreaContent(city: string, area: any) {
  return {
    hero: `Safety Nets in ${area.name}, ${city} – Professional Installation`,

    intro: `${area.name} is one of the fastest-growing residential areas in ${city}. With ${area.density}, ensuring balcony and window safety is extremely important. Our expert safety net solutions are designed specifically for homes in ${area.name}.`,

    localProblem: `Near landmarks like ${area.landmarks.join(
      ", "
    )}, many apartments such as ${area.apartments.join(
      ", "
    )} have open balconies that pose safety risks for children and pets.`,

    services: `We provide balcony safety nets, child safety nets, pigeon safety nets, duct area safety nets, and construction safety nets across ${area.name}.`,

    whyChooseUs: `We understand the housing structure of ${area.name}. Our team ensures proper wall drilling, strong knotless netting material, and professional fitting tailored for ${area.priceFactor} residential properties.`,

    process: `Our installation process includes site inspection, measurement, material selection, professional fitting, and final safety inspection.`,

    materialQuality: `We use UV-protected, weather-resistant, durable nylon nets built to withstand ${city}'s climate conditions.`,

    pricingInfo: `Pricing in ${area.name} depends on balcony size, floor height, and net type. We provide transparent and affordable quotes.`,

    closing: `If you are searching for reliable safety nets in ${area.name}, contact us today for professional installation and long-lasting protection.`,
  };
}