import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/bookAppointment.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?\d{10,15}$/;

const initialForm = {
  full_name: '',
  email: '',
  phone: '',
  service: '',
  appointment_date: '',
  appointment_time: '',
  message: '',
};

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

function isWeekend(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const day = d.getUTCDay();
  return day === 0 || day === 6;
}

function formatSlotLabel(slot) {
  const [h, m] = slot.split(':').map(Number);
  const period = h < 12 ? 'AM' : 'PM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

function validateForm(form) {
  const errors = {};

  const name = form.full_name.trim();
  if (!name) {
    errors.full_name = 'Full name is required.';
  } else if (name.length < 3) {
    errors.full_name = 'Full name must be at least 3 characters.';
  } else if (name.length > 100) {
    errors.full_name = 'Full name must not exceed 100 characters.';
  }

  const email = form.email.trim();
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phone = form.phone.trim();
  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phone = 'Phone must be 10–15 digits and may start with +.';
  }

  if (!form.service) {
    errors.service = 'Please select a service.';
  }

  if (!form.appointment_date) {
    errors.appointment_date = 'Appointment date is required.';
  } else if (form.appointment_date < getTodayString()) {
    errors.appointment_date = 'Appointment date cannot be in the past.';
  }

  if (!form.appointment_time) {
    errors.appointment_time = 'Please select an available time slot.';
  }

  if (form.message.trim().length > 500) {
    errors.message = 'Message must not exceed 500 characters.';
  }

  return errors;
}

export default function BookAppointment() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsMessage, setSlotsMessage] = useState('');

  useEffect(() => {
    if (!form.service || !form.appointment_date) {
      setAvailableSlots([]);
      setSlotsMessage('');
      setForm((prev) => ({ ...prev, appointment_time: '' }));
      return;
    }

    if (form.appointment_date < getTodayString()) {
      setAvailableSlots([]);
      setSlotsMessage('Please select a future date.');
      setForm((prev) => ({ ...prev, appointment_time: '' }));
      return;
    }

    if (isWeekend(form.appointment_date)) {
      setAvailableSlots([]);
      setSlotsMessage('Appointments are available Monday–Friday only.');
      setForm((prev) => ({ ...prev, appointment_time: '' }));
      return;
    }

    setSlotsLoading(true);
    setSlotsMessage('');
    setAvailableSlots([]);
    setForm((prev) => ({ ...prev, appointment_time: '' }));

    axios
      .get(`${API_BASE_URL}/api/appointments/available-slots`, {
        params: { date: form.appointment_date, service: form.service },
      })
      .then((res) => {
        if (res.data.success) {
          const slots = res.data.availableSlots;
          setAvailableSlots(slots);
          if (slots.length === 0) {
            setSlotsMessage('No slots available for this date.');
          }
        }
      })
      .catch((err) => {
        const msg =
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'Failed to load available slots.';
        setSlotsMessage(msg);
      })
      .finally(() => {
        setSlotsLoading(false);
      });
  }, [form.service, form.appointment_date]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.service,
        appointment_date: form.appointment_date,
        appointment_time: form.appointment_time,
        message: form.message.trim(),
      };

      const response = await axios.post(`${API_BASE_URL}/api/appointments`, payload);

      if (response.data.success) {
        setSuccessMessage('Your appointment has been booked successfully! We will contact you shortly.');
        setForm(initialForm);
        setErrors({});
        setAvailableSlots([]);
        setSlotsMessage('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage('Selected appointment slot is already booked. Please choose a different date or time.');
      } else if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else if (err.request) {
        setErrorMessage('Unable to reach the server. Please check your connection and try again.');
      } else {
        setErrorMessage('Failed to book appointment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !loading && !slotsLoading && form.appointment_time !== '';

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book an Appointment</h1>
      <div className="container-card">
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-error" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              id="full_name"
              className={`form-control${errors.full_name ? ' input-error' : ''}`}
              placeholder="Enter your full name"
              value={form.full_name}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.full_name && <p className="field-error">{errors.full_name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className={`form-control${errors.email ? ' input-error' : ''}`}
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className={`form-control${errors.phone ? ' input-error' : ''}`}
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="service">Service</label>
            <select
              id="service"
              className={`form-control${errors.service ? ' input-error' : ''}`}
              value={form.service}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="" disabled>Select a service</option>
              <option value="General Consultation">General Consultation</option>
              <option value="Dental Care">Dental Care</option>
              <option value="Eye Care">Eye Care</option>
              <option value="Health Checkup">Health Checkup</option>
            </select>
            {errors.service && <p className="field-error">{errors.service}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="appointment_date">Appointment Date</label>
            <input
              type="date"
              id="appointment_date"
              className={`form-control${errors.appointment_date ? ' input-error' : ''}`}
              value={form.appointment_date}
              min={getTodayString()}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.appointment_date && <p className="field-error">{errors.appointment_date}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="appointment_time">Appointment Time</label>
            {slotsLoading ? (
              <p className="slots-loading">Loading available slots...</p>
            ) : (
              <select
                id="appointment_time"
                className={`form-control${errors.appointment_time ? ' input-error' : ''}`}
                value={form.appointment_time}
                onChange={handleChange}
                disabled={loading || slotsLoading || availableSlots.length === 0}
              >
                <option value="" disabled>
                  {availableSlots.length === 0 ? 'No slots available' : 'Select a time slot'}
                </option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {formatSlotLabel(slot)}
                  </option>
                ))}
              </select>
            )}
            {slotsMessage && !slotsLoading && (
              <p className={`field-error slots-info`}>{slotsMessage}</p>
            )}
            {errors.appointment_time && !slotsMessage && (
              <p className="field-error">{errors.appointment_time}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (Optional)</label>
            <textarea
              id="message"
              className={`form-control${errors.message ? ' input-error' : ''}`}
              rows="4"
              placeholder="Any additional details or special requests..."
              value={form.message}
              onChange={handleChange}
              disabled={loading}
            ></textarea>
            {errors.message && <p className="field-error">{errors.message}</p>}
          </div>

          <button type="submit" className="btn-submit" disabled={!canSubmit}>
            {loading ? 'Booking...' : 'Submit Booking Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
