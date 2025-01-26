import React from 'react';
import {
  Modal,
  ButtonGroup,
  Button,
  Form,
  Input,
  Textarea,
  Notify,
  Row,
  Col,
} from 'uiw';
import { withTranslation, WithTranslation } from 'react-i18next';

class ValidationError extends Error {
  filed: { [key: string]: string };

  constructor(filed: { [key: string]: string }) {
    super('Validation Error');
    this.filed = filed;
  }
}

interface DemoState {
  visible: boolean;
  loading: boolean;
}

class AssignDrugModal extends React.Component<WithTranslation, DemoState> {
  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
    };
  }
  onClick() {
    this.setState({ visible: !this.state.visible });
  }
  onClosed() {
    this.setState({ visible: false });
  }
  onSubmit({
    initial,
    current,
  }: {
    initial: any;
    current: { [key: string]: any };
  }) {
    const { t } = this.props;
    const errorObj: { [key: string]: string } = {};
    if (!current.name) {
      errorObj.name = t('drug.errors.name_required');
    }
    if (!current.dosage) {
      errorObj.dosage = t('drug.errors.dosage_required');
    }
    if (!current.dateFrom) {
      errorObj.dateFrom = t('drug.errors.start_date_required');
    }
    if (!current.dateTo) {
      errorObj.dateTo = t('drug.errors.end_date_required');
    }
    if (!current.doses_taken || current.doses_taken < 0) {
      errorObj.doses_taken = t('drug.errors.doses_taken_positive');
    }
    if (!current.doses_left || current.doses_left < 0) {
      errorObj.doses_left = t('drug.errors.doses_left_positive');
    }
    if (Object.keys(errorObj).length > 0) {
      throw new ValidationError(errorObj);
    }

    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      Notify.success({
        title: t('notify.success'),
        description: t('drug.submit_success'),
      });
    }, 2000);
  }
  render() {
    const { t } = this.props;
    return (
      <div>
        <Modal
          title={t('drug.assign_drug')}
          width={900}
          isOpen={this.state.visible}
          onClosed={this.onClosed.bind(this)}
          type="danger"
          useButton={false}
        >
          <Form
            resetOnSubmit={false}
            onSubmit={this.onSubmit.bind(this)}
            onSubmitError={(error) => {
              if (error.filed) {
                return { ...error.filed };
              }
              return null;
            }}
            fields={{
              name: {
                initialValue: '',
                label: t('drug.name'),
                children: <Input type="text" />,
              },
              dosage: {
                initialValue: '',
                label: t('drug.dosage'),
                children: <Input type="text" />,
              },
              dateFrom: {
                initialValue: '',
                label: t('drug.start_date'),
                children: <Input type="date" />,
              },
              dateTo: {
                initialValue: '',
                label: t('drug.end_date'),
                children: <Input type="date" />,
              },
              additionalInfo: {
                initialValue: '',
                label: t('drug.additional_info'),
                children: <Textarea placeholder={t('drug.additional_info')} />,
              },
              doses_taken: {
                initialValue: 0,
                label: t('drug.doses_taken'),
                children: <Input type="number" />,
              },
              doses_left: {
                initialValue: 0,
                label: t('drug.doses_left'),
                children: <Input type="number" />,
              },
            }}
          >
            {({ fields, state, canSubmit }) => {
              console.log('fields:-->', state);
              return (
                <div>
                  <Row gutter={10}>
                    <Col>{fields?.name}</Col>
                    <Col>{fields?.dosage}</Col>
                  </Row>
                  <Row gutter={10}>
                    <Col>{fields?.dateFrom}</Col>
                    <Col>{fields?.dateTo}</Col>
                  </Row>
                  <Row gutter={10}>
                    <Col>{fields?.additionalInfo}</Col>
                  </Row>
                  <Row gutter={10}>
                    <Col>{fields?.doses_taken}</Col>
                    <Col>{fields?.doses_left}</Col>
                  </Row>
                  <Row gutter={10} justify="flex-end">
                    <Col fixed>
                      <Button
                        loading={this.state.loading}
                        disabled={canSubmit ? !canSubmit() : true}
                        type="dark"
                        htmlType="submit"
                      >
                        {t('drug.submit')}
                      </Button>
                    </Col>
                  </Row>
                </div>
              );
            }}
          </Form>
        </Modal>
        <ButtonGroup>
          <Button onClick={this.onClick.bind(this)}>
            {t('drug.assign_drug')}
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default withTranslation()(AssignDrugModal);
