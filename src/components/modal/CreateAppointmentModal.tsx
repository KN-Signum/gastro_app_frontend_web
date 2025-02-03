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
  Select,
} from 'uiw';
import { withTranslation, WithTranslation } from 'react-i18next';
import { GastroappClient } from '../../api/gastroapp-client';
import { CreateAppointmentDto } from '../../dto/AppointmentDto';

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
  patientId: string | null;
  patients: { label: string; value: string }[];
}

class CreateAppointementModal extends React.Component<
  WithTranslation,
  DemoState
> {
  private client: GastroappClient;

  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      patientId: null,
      patients: [],
    };
    this.client = new GastroappClient();
  }

  async componentDidMount() {
    try {
      const controller = new AbortController();
      const response = await this.client.getMyPatients({
        signal: controller.signal,
      });
      const patients = response.data
        ? response.data.map((patient: any) => ({
            label: patient.name,
            value: patient.id,
          }))
        : [];
      this.setState({ patients });
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }

  onClick() {
    this.setState({ visible: true });
  }

  onClosed() {
    this.setState({ visible: false, patientId: null });
  }

  async onSubmit({
    initial,
    current,
  }: {
    initial: any;
    current: { [key: string]: any };
  }) {
    const { t } = this.props;
    const { patientId } = this.state;
    console.log('CreateAppointementModal patientId:', patientId);
    const errorObj: { [key: string]: string } = {};
    if (!current.name) {
      errorObj.name = t('appointment.errors.name_required');
    }
    if (!current.date) {
      errorObj.date = t('appointment.errors.date_required');
    }
    if (!current.time_start) {
      errorObj.time_start = t('appointment.errors.time_start_required');
    }
    if (!current.time_end) {
      errorObj.time_end = t('appointment.errors.time_end_required');
    }
    if (!patientId) {
      errorObj.patient = t('appointment.errors.patient_required');
    }
    if (Object.keys(errorObj).length > 0) {
      throw new ValidationError(errorObj);
    }

    const appointmentData: CreateAppointmentDto = {
      name: current.name,
      date: current.date,
      time_start: `${current.date}T${current.time_start}:00`,
      time_end: `${current.date}T${current.time_end}:00`,
      additional_info: current.additional_info,
    };

    this.setState({ loading: true });
    try {
      const response = await this.client.createAppointment(
        patientId!,
        appointmentData
      );
      if (response.status === 200 || response.status === 201) {
        Notify.success({
          title: t('notify.success'),
          description: response.data,
        });
      } else {
        Notify.error({
          title: t('notify.error'),
          description: response.data,
        });
      }
    } catch (error) {
      Notify.error({
        title: t('notify.error'),
        description: t('appointment.submit_error'),
      });
    } finally {
      this.setState({ loading: false, visible: false });
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Modal
          key={this.state.patientId}
          title={t('appointment.create')}
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
              patient: {
                initialValue: this.state.patientId || '',
                label: t('appointment.patient'),
                children: (
                  <Select
                    onChange={(event) =>
                      this.setState({ patientId: event.target.value })
                    }
                  >
                    <Select.Option value="">
                      {t('appointment.choose_patient')}
                    </Select.Option>
                    {this.state.patients.map((patient) => (
                      <Select.Option key={patient.value} value={patient.value}>
                        {patient.label}
                      </Select.Option>
                    ))}
                  </Select>
                ),
              },
              name: {
                initialValue: '',
                label: t('appointment.name'),
                children: <Input type="text" />,
              },
              date: {
                initialValue: '',
                label: t('appointment.date'),
                children: <Input type="date" />,
              },
              time_start: {
                initialValue: '',
                label: t('appointment.time_start'),
                children: <Input type="time" />,
              },
              time_end: {
                initialValue: '',
                label: t('appointment.time_end'),
                children: <Input type="time" />,
              },
              additional_info: {
                initialValue: '',
                label: t('appointment.additional_info'),
                children: (
                  <Textarea placeholder={t('appointment.additional_info')} />
                ),
              },
            }}
          >
            {({ fields, state, canSubmit }) => {
              console.log('fields:-->', state);
              return (
                <div>
                  <Row gutter={10}>
                    <Col>{fields?.patient}</Col>
                  </Row>
                  <Row gutter={10}>
                    <Col>{fields?.name}</Col>
                  </Row>
                  <Row gutter={10}>
                    <Col>{fields?.date}</Col>
                    <Col>{fields?.time_start}</Col>
                    <Col>{fields?.time_end}</Col>
                  </Row>
                  <Row gutter={10}>
                    <Col>{fields?.additional_info}</Col>
                  </Row>
                  <Row gutter={10} justify="flex-end">
                    <Col fixed>
                      <Button
                        loading={this.state.loading}
                        disabled={canSubmit ? !canSubmit() : true}
                        type="dark"
                        htmlType="submit"
                      >
                        {t('appointment.submit')}
                      </Button>
                    </Col>
                  </Row>
                </div>
              );
            }}
          </Form>
        </Modal>
        <ButtonGroup>
          <Button size="large" onClick={() => this.onClick()}>
            {t('appointment.create')}
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default withTranslation()(CreateAppointementModal);
