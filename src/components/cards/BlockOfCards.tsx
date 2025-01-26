import InfoCard from './InfoCard';
import './BlockOfCards.css';

export default function BlockOfInfoCards() {
  return (
    <div className="block-cards">
      <InfoCard
        title="cards.patients.title"
        icon="verification"
        subtitle="cards.patients.subtitle"
        number={10}
        link="/patients"
      />
      <InfoCard
        title="cards.surveys.title"
        icon="document"
        subtitle="cards.surveys.subtitle"
        number={5}
        link="/surveys"
      />
      <InfoCard
        title="cards.state-of-emergency.title"
        icon="warning-o"
        subtitle="cards.state-of-emergency.subtitle"
        number={1}
        link="/state-of-emergency"
      />
    </div>
  );
}
