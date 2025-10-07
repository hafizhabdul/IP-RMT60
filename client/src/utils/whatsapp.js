// WhatsApp Integration Utilities
import { WHATSAPP_CONFIG as CONFIG } from '../config/whatsapp';

export const WHATSAPP_CONFIG = {
  ...CONFIG,
  baseUrl: 'https://wa.me'
};

export function formatWhatsAppMessage(enrollmentData) {
  const { name, email, phone, method, note } = enrollmentData;

  const message = `*PENDAFTARAN SERTIFIKASI NDT - ${WHATSAPP_CONFIG.businessName}*

*Data Pendaftar:*
━━━━━━━━━━━━━━━━━━
*Nama Lengkap:* ${name}
*Email:* ${email}
*Nomor WhatsApp:* ${phone}
*Metode Sertifikasi:* ${method}
*Catatan Tambahan:* ${note || 'Tidak ada'}

*Waktu Pendaftaran:* ${new Date().toLocaleString('id-ID', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

━━━━━━━━━━━━━━━━━━
*Informasi Penting:*
• Calon peserta menunggu follow-up
• Segera hubungi untuk konfirmasi jadwal
• Informasikan persyaratan dokumen

*Hubungi segera untuk:*
✓ Konfirmasi kuota tersedia
✓ Informasi jadwal training
✓ Persyaratan pendaftaran
✓ Pembayaran dan biaya

_Terima kasih atas kepercayaan calon peserta!_`;

  return encodeURIComponent(message);
}

export function createWhatsAppLink(phone, message) {
  return `${WHATSAPP_CONFIG.baseUrl}/${phone}?text=${message}`;
}

export function sendEnrollmentToWhatsApp(enrollmentData) {
  const message = formatWhatsAppMessage(enrollmentData);
  const whatsappLink = createWhatsAppLink(WHATSAPP_CONFIG.phone, message);

  // Buka WhatsApp di tab baru
  window.open(whatsappLink, '_blank');
}

// Fallback jika WhatsApp tidak terinstall
export function sendToWhatsAppWeb(enrollmentData) {
  const message = formatWhatsAppMessage(enrollmentData);
  const whatsappLink = createWhatsAppLink(WHATSAPP_CONFIG.phone, message);

  // Redirect ke WhatsApp Web
  window.location.href = whatsappLink;
}