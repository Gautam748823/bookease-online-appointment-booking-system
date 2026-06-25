const supabase = require('../config/supabase');

const VALID_STATUSES = ['Pending', 'Confirmed', 'Cancelled'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?\d{10,15}$/;

function validateCreatePayload(body) {
  const errors = {};
  const { full_name, email, phone, service, appointment_date, appointment_time, message } = body;

  const name = (full_name || '').trim();
  if (!name) {
    errors.full_name = 'Full name is required.';
  } else if (name.length < 3) {
    errors.full_name = 'Full name must be at least 3 characters.';
  } else if (name.length > 100) {
    errors.full_name = 'Full name must not exceed 100 characters.';
  }

  const emailTrimmed = (email || '').trim();
  if (!emailTrimmed) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(emailTrimmed)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneTrimmed = (phone || '').trim();
  if (!phoneTrimmed) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_REGEX.test(phoneTrimmed)) {
    errors.phone = 'Phone must be 10–15 digits and may start with +.';
  }

  const serviceTrimmed = (service || '').trim();
  if (!serviceTrimmed) {
    errors.service = 'Service is required.';
  } else if (serviceTrimmed.length > 100) {
    errors.service = 'Service must not exceed 100 characters.';
  }

  if (!appointment_date) {
    errors.appointment_date = 'Appointment date is required.';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(appointment_date);
    if (isNaN(selected.getTime())) {
      errors.appointment_date = 'Please enter a valid date.';
    } else if (selected < today) {
      errors.appointment_date = 'Appointment date cannot be in the past.';
    }
  }

  if (!appointment_time) {
    errors.appointment_time = 'Appointment time is required.';
  }

  if (message && message.length > 500) {
    errors.message = 'Message must not exceed 500 characters.';
  }

  return errors;
}

const createAppointment = async (req, res) => {
  try {
    const errors = validateCreatePayload(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed.', errors });
    }

    const { full_name, email, phone, service, appointment_date, appointment_time, message } = req.body;

    const { data: duplicate, error: dupError } = await supabase
      .from('appointments')
      .select('id')
      .eq('service', service.trim())
      .eq('appointment_date', appointment_date)
      .eq('appointment_time', appointment_time)
      .neq('status', 'Cancelled')
      .maybeSingle();

    if (dupError) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: 'Selected appointment slot is already booked.'
      });
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        full_name: full_name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service: service.trim(),
        appointment_date,
        appointment_time,
        message: (message || '').trim(),
        status: 'Pending'
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    return res.status(201).json({ success: true, message: 'Appointment created successfully', data });
  } catch {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    return res.status(200).json({ success: true, data });
  } catch {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (!data) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    return res.status(200).json({ success: true, data });
  } catch {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, phone, service, appointment_date, appointment_time, message, status } = req.body;

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${VALID_STATUSES.join(', ')}.`,
        errors: { status: 'Invalid status value.' }
      });
    }

    const { data: existing, error: checkError } = await supabase
      .from('appointments')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (checkError) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    const { data, error } = await supabase
      .from('appointments')
      .update({ full_name, email, phone, service, appointment_date, appointment_time, message, status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    return res.status(200).json({ success: true, message: 'Appointment updated successfully', data });
  } catch {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: existing, error: checkError } = await supabase
      .from('appointments')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (checkError) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    const { error } = await supabase.from('appointments').delete().eq('id', id);

    if (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    return res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  } catch {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

function generateSlots() {
  const slots = [];
  const addSlot = (h, m) => slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  for (let h = 9; h < 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 13) continue;
      if (h === 17 && m === 30) continue;
      addSlot(h, m);
    }
  }
  return slots;
}

const getAvailableSlots = async (req, res) => {
  try {
    const { date, service } = req.query;

    if (!date || !service) {
      return res.status(400).json({ success: false, message: 'date and service query parameters are required.' });
    }

    const selected = new Date(date);
    if (isNaN(selected.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date.' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      return res.status(400).json({ success: false, message: 'Please select a future date.' });
    }

    const day = selected.getUTCDay();
    if (day === 0 || day === 6) {
      return res.status(400).json({ success: false, message: 'Appointments are available Monday–Friday only.' });
    }

    const allSlots = generateSlots();

    const { data, error } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', date)
      .eq('service', service)
      .neq('status', 'Cancelled');

    if (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    const bookedSlots = (data || []).map((r) => r.appointment_time.slice(0, 5));
    const availableSlots = allSlots.filter((s) => !bookedSlots.includes(s));

    return res.status(200).json({ success: true, availableSlots, bookedSlots });
  } catch {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAvailableSlots
};
