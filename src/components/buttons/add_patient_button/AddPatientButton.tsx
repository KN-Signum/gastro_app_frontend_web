import { Button, Icon } from 'uiw';
import './AddPatientButton.css';
import { useTranslation } from 'react-i18next';

interface AddPatientButtonProps {
  onClick: () => void;
  isFormVisible: boolean;
}

export default function AddPatientButton({
  onClick,
  isFormVisible,
}: AddPatientButtonProps) {
  const { t } = useTranslation();
  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={onClick}
        style={{ backgroundColor: isFormVisible ? 'grey' : '' }}
      >
        <Icon type="down" />
        {t('patient.add')}
      </Button>
    </div>
  );
}
