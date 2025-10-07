import { EMAIL_CONFIG } from '../config/email';

export function generateAdminEmail(enrollmentData) {
  const { name, email, phone, method, note } = enrollmentData;
  const timestamp = new Date().toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    to: EMAIL_CONFIG.adminEmail,
    subject: EMAIL_CONFIG.subjects.admin,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pendaftaran Baru - SNS NDT</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #ff6b35; border-radius: 5px; }
          .field-label { font-weight: bold; color: #ff6b35; margin-bottom: 5px; }
          .field-value { font-size: 16px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .alert { background: #e8f5e8; border: 1px solid #4caf50; color: #2e7d32; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔥 PENDAFTARAN BARU</h1>
            <p>Sertifikasi NDT - SNS Sar NDT Services</p>
          </div>

          <div class="content">
            <div class="alert">
              <strong>📞 Action Required:</strong> Segera hubungi calon peserta untuk follow-up!
            </div>

            <div class="field">
              <div class="field-label">👤 Nama Lengkap</div>
              <div class="field-value">${name}</div>
            </div>

            <div class="field">
              <div class="field-label">📧 Email</div>
              <div class="field-value">${email}</div>
            </div>

            <div class="field">
              <div class="field-label">📱 Nomor WhatsApp</div>
              <div class="field-value">${phone}</div>
            </div>

            <div class="field">
              <div class="field-label">🔧 Metode Sertifikasi</div>
              <div class="field-value">${method}</div>
            </div>

            <div class="field">
              <div class="field-label">📝 Catatan Tambahan</div>
              <div class="field-value">${note || 'Tidak ada catatan'}</div>
            </div>

            <div class="field">
              <div class="field-label">🕐 Waktu Pendaftaran</div>
              <div class="field-value">${timestamp}</div>
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

          <div class="footer">
            <p>© 2024 SNS - Sar NDT Services</p>
            <p>Email otomatis dari sistem pendaftaran</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

export function generateUserEmail(enrollmentData) {
  const { name, email, phone, method } = enrollmentData;

  return {
    to: email,
    subject: EMAIL_CONFIG.subjects.user,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Konfirmasi Pendaftaran - SNS NDT</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #28a745; }
          .contact-info { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ffeaa7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ PENDAFTARAN BERHASIL!</h1>
            <p>Terima kasih telah mendaftar di SNS NDT Services</p>
          </div>

          <div class="content">
            <p>Hai <strong>${name}</strong>,</p>
            <p>Pendaftaran Anda untuk sertifikasi <strong>${method}</strong> telah kami terima dengan baik.</p>

            <div class="info-box">
              <h3>📋 Data Pendaftaran Anda:</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Nama:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Telepon:</strong> ${phone}</li>
                <li><strong>Metode:</strong> ${method}</li>
              </ul>
            </div>

            <div class="highlight">
              <h3>📞 Apa Selanjutnya?</h3>
              <p>Tim kami akan menghubungi Anda dalam <strong>1x24 jam</strong> melalui WhatsApp atau telepon untuk:</p>
              <ul>
                <li>Konfirmasi ketersediaan kuota</li>
                <li>Informasi jadwal training</li>
                <li>Detail persyaratan dokumen</li>
                <li>Informasi biaya dan pembayaran</li>
              </ul>
            </div>

            <div class="contact-info">
              <h3>📞 Kontak Kami:</h3>
              <p><strong>WhatsApp:</strong> <a href="https://wa.me/62812969535570">+62 812-9695-35570</a></p>
              <p><strong>Email:</strong> info@sns-ndt.com</p>
              <p>Jika Anda tidak mendapat kabar dalam 24 jam, jangan ragu untuk menghubungi kami langsung.</p>
            </div>
          </div>

          <div class="footer">
            <p>© 2024 SNS - Sar NDT Services</p>
            <p>📍 Jl. Contoh No. 123, Jakarta, Indonesia</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}