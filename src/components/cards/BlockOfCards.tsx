import InfoCard from './InfoCard';
import './BlockOfCards.css';

interface BlockOfInfoCardsProps {
  patientsCount: number;
  surveysCount: number;
  emergenciesCount: number;
}

export default function BlockOfInfoCards({
  patientsCount,
  surveysCount,
  emergenciesCount,
}: BlockOfInfoCardsProps) {
  return (
    <div className="block-cards">
      <InfoCard
        title="cards.patients.title"
        icon="verification"
        subtitle="cards.patients.subtitle"
        number={patientsCount}
        link="/patients"
      />
      <InfoCard
        title="cards.surveys.title"
        icon="document"
        subtitle="cards.surveys.subtitle"
        number={surveysCount}
        link="/patients"
      />
      <InfoCard
        title="cards.state-of-emergency.title"
        icon="warning-o"
        subtitle="cards.state-of-emergency.subtitle"
        number={emergenciesCount}
        link="/patients"
      />
    </div>
  );
}
