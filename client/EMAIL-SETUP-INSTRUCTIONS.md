# 📧 Email Setup Instructions untuk abdulhafizhsaenal@gmail.com

## ✅ **Yang Sudah Dilakukan:**

1. **✅ Updated server email configuration** - Email tujuan sudah diubah ke `abdulhafizhsaenal@gmail.com`
2. **✅ Environment variables added** - Config Gmail credentials sudah ditambah
3. **✅ Server restarted** - Server sudah restart dengan config baru

## 🔧 **Yang Perlu Anda Lakukan:**

### **Langkah 1: Buat Gmail App Password**

**PENTING:** Jangan gunakan password Gmail biasa! Gunakan App Password.

1. **Login ke Gmail**: https://gmail.com
2. **Masuk ke Settings**:
   - Klik icon gear ⚙️ (pojok kanan atas)
   - Lihat semua setelan
3. **Security**:
   - Scroll ke "Signing in to Google"
   - Klik "2-Step Verification"
4. **Buat App Password**:
   - Scroll ke bawah, klik "App passwords"
   - Select app: "Other (Custom name)"
   - Name: "SNS NDT Services"
   - Klik "Generate"
5. **Copy Password**: Akan muncul password 16 karakter, copy dan simpan

### **Langkah 2: Update Environment Variable**

Edit file: `server/.env`

```bash
# Ganti baris ini:
EMAIL_PASS=ganti-dengan-app-password

# Menjadi (contoh):
EMAIL_PASS=abcd efgh ijkl mnop
```

### **Langkah 3: Restart Server**

```bash
# Di folder server
npm run dev
```

## 🧪 **Test Email Functionality**

### **Test Form Pendaftaran:**
1. **Buka**: `http://localhost:5174/enroll`
2. **Isi form** dengan email test
3. **Submit** form
4. **Check email**:
   - **Admin**: `abdulhafizhsaenal@gmail.com`
   - **User**: Email yang diisi di form

### **Expected Results:**
- ✅ Admin email masuk ke `abdulhafizhsaenal@gmail.com`
- ✅ User dapat email konfirmasi
- ✅ Data tersimpan di database
- ✅ Success notification muncul

## 🔍 **Troubleshooting**

### **Jika Email Tidak Masuk:**

1. **Check App Password**:
   - Pastikan App Password sudah benar
   - Pastikan tidak ada spasi ekstra

2. **Check Gmail Settings**:
   - Pastikan 2-Step Verification aktif
   - Pastikan App Password tidak di-revoke

3. **Check Server Logs**:
   ```bash
   # Di folder server
   npm run dev

   # Lihat output untuk "Email sending results:"
   ```

4. **Check Spam Folder**:
   - Cek inbox dan spam di `abdulhafizhsaenal@gmail.com`

### **Error Messages:**

**"Invalid login"**:
- App password salah
- 2-Step Verification belum aktif

**"535 Authentication unsuccessful"**:
- Gmail App Password salah
- Email/password tidak valid

**"Connection timeout"**:
- Network issues
- Firewall blocking SMTP

## 📱 **Alternative Email Services**

Jika Gmail tidak bisa, gunakan alternatif:

### **Outlook/Hotmail:**
```bash
# Di server/.env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### **Custom SMTP:**
```bash
# Di server/services/emailService.js
const EMAIL_CONFIG = {
  host: 'smtp.yourdomain.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@yourdomain.com',
    pass: 'your-password'
  }
};
```

## 🎯 **Testing Checklist**

- [ ] Gmail App Password dibuat
- [ ] Environment variables diupdate
- [ ] Server di-restart
- [ ] Test form dengan email valid
- [ ] Check inbox admin
- [ ] Check inbox user
- [ ] Test error handling
- [ ] Check server logs

## 📞 **Support Jika Masih Bermasalah**

Jika email masih tidak masuk setelah semua langkah di atas:

1. **Test dengan Ethereal Email** (development mode)
2. **Check DNS settings** (SPF/DKIM records)
3. **Contact hosting provider** untuk SMTP settings
4. **Coba email service lain**

---

## 🚀 **Status Saat Ini:**

- ✅ **Server Configuration**: Sudah update ke `abdulhafizhsaenal@gmail.com`
- ✅ **Email Service**: Gmail dengan nodemailer
- ✅ **Email Templates**: Professional HTML templates
- ✅ **Error Handling**: Graceful fallback
- ⏳ **Authentication**: Butuh App Password dari Anda

**Lanjutkan dengan membuat Gmail App Password, lalu test form pendaftaran!**