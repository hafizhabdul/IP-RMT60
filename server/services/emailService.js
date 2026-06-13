const nodemailer = require('nodemailer');

// Email configuration
const EMAIL_CONFIG = {
  service: 'gmail', // atau 'outlook', 'yahoo', etc
  auth: {
    user: process.env.EMAIL_USER, // email@gmail.com
    pass: process.env.EMAIL_PASS  // app password dari Gmail
  },
  from: {
    name: 'SNS - SAR NDT Services',
    address: 'noreply@sns-ndt.com'
  }
};

// Create transporter
const createTransporter = () => {
  // Untuk development, gunakan ethereal.email
  if (process.env.NODE_ENV !== 'production') {
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER || 'ethereal.user@ethereal.email',
        pass: process.env.ETHEREAL_PASS || 'ethereal.password'
      }
    });
  }

  // Untuk production, gunakan email service yang sebenarnya
  return nodemailer.createTransporter({
    service: EMAIL_CONFIG.service,
    auth: EMAIL_CONFIG.auth
  });
};

// Function to generate admin email HTML
function generateAdminEmail(enrollmentData) {
  const { name, email, phone, method, note } = enrollmentData;
  const timestamp = new Date().toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pendaftaran Baru - SNS NDT</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">🔥 PENDAFTARAN BARU</h1>
          <p style="margin: 5px 0;">Sertifikasi NDT - SNS Sar NDT Services</p>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: #e8f5e8; border: 1px solid #4caf50; color: #2e7d32; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>📞 Action Required:</strong> Segera hubungi calon peserta untuk follow-up!
          </div>

          <div style="margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #ff6b35; border-radius: 5px;">
            <div style="font-weight: bold; color: #ff6b35; margin-bottom: 5px;">👤 Nama Lengkap</div>
            <div>${name}</div>
          </div>

          <div style="margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #ff6b35; border-radius: 5px;">
            <div style="font-weight: bold; color: #ff6b35; margin-bottom: 5px;">📧 Email</div>
            <div>${email}</div>
          </div>

          <div style="margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #ff6b35; border-radius: 5px;">
            <div style="font-weight: bold; color: #ff6b35; margin-bottom: 5px;">Nomor WhatsApp</div>
            <div>${phone}</div>
          </div>

          <div style="margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #ff6b35; border-radius: 5px;">
            <div style="font-weight: bold; color: #ff6b35; margin-bottom: 5px;">Metode Sertifikasi</div>
            <div>${method}</div>
          </div>

          <div style="margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #ff6b35; border-radius: 5px;">
            <div style="font-weight: bold; color: #ff6b35; margin-bottom: 5px;">📝 Catatan Tambahan</div>
            <div>${note || 'Tidak ada catatan'}</div>
          </div>

          <div style="margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #ff6b35; border-radius: 5px;">
            <div style="font-weight: bold; color: #ff6b35; margin-bottom: 5px;">🕐 Waktu Pendaftaran</div>
            <div>${timestamp}</div>
          </div>

          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">📋 Next Steps:</h3>
            <ol style="color: #856404; margin: 10px 0; padding-left: 20px;">
              <li>Hubungi calon peserta dalam 1x24 jam</li>
              <li>Konfirmasi ketersediaan kuota</li>
              <li>Informasikan jadwal training</li>
              <li>Jelaskan proses pembayaran</li>
            </ol>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
          <p>© 2024 SNS - SAR NDT Services</p>
          <p>Email otomatis dari sistem pendaftaran</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Function to generate user confirmation email
function generateUserEmail(enrollmentData) {
  const { name, email, phone, method } = enrollmentData;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Konfirmasi Pendaftaran - SNS NDT</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">✅ PENDAFTARAN BERHASIL!</h1>
          <p style="margin: 5px 0;">Terima kasih telah mendaftar di SNS NDT Services</p>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Hai <strong>${name}</strong>,</p>
          <p>Pendaftaran Anda untuk sertifikasi <strong>${method}</strong> telah kami terima dengan baik.</p>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #28a745;">
            <h3>Data Pendaftaran Anda:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Nama:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Telepon:</strong> ${phone}</li>
              <li><strong>Metode:</strong> ${method}</li>
            </ul>
          </div>

          <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ffeaa7;">
            <h3 style="color: #856404; margin-top: 0;">📞 Apa Selanjutnya?</h3>
            <p>Tim kami akan menghubungi Anda dalam <strong>1x24 jam</strong> melalui WhatsApp atau telepon untuk:</p>
            <ul>
              <li>Konfirmasi ketersediaan kuota</li>
              <li>Informasi jadwal training</li>
              <li>Detail persyaratan dokumen</li>
              <li>Informasi biaya dan pembayaran</li>
            </ul>
          </div>

          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Kontak Kami:</h3>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/628129258446" style="color: #25d366;">+62 812-9258-446</a></p>
            <p><strong>Email:</strong> info@sns-ndt.com</p>
            <p>Jika Anda tidak mendapat kabar dalam 24 jam, jangan ragu untuk menghubungi kami langsung.</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
          <p>© 2024 SNS - SAR NDT Services</p>
          <p>Jl. Contoh No. 123, Jakarta, Indonesia</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Send emails function
async function sendEnrollmentEmails(enrollmentData) {
  const transporter = createTransporter();

  try {
    // Send email to admin
    const adminMailOptions = {
      from: EMAIL_CONFIG.from,
      to: 'abdulhafizhsaenal@gmail.com', // Ganti dengan email admin Anda
      subject: '🔥 Pendaftaran Baru - Sertifikasi NDT',
      html: generateAdminEmail(enrollmentData)
    };

    // Send confirmation email to user
    const userMailOptions = {
      from: EMAIL_CONFIG.from,
      to: enrollmentData.email,
      subject: '✅ Konfirmasi Pendaftaran - SNS NDT Services',
      html: generateUserEmail(enrollmentData)
    };

    // Send both emails
    const [adminResult, userResult] = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return {
      adminEmail: adminResult.status === 'fulfilled' ? 'success' : 'failed',
      userEmail: userResult.status === 'fulfilled' ? 'success' : 'failed',
      adminError: adminResult.status === 'rejected' ? adminResult.reason.message : null,
      userError: userResult.status === 'rejected' ? userResult.reason.message : null
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      adminEmail: 'failed',
      userEmail: 'failed',
      error: error.message
    };
  }
}

module.exports = {
  sendEnrollmentEmails
};