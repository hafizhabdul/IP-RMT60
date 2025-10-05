export default function WhatsappFloating() {
  const number = import.meta.env.VITE_WA_NUMBER || '6281234567890';
  const text = encodeURIComponent('Halo SNS — Saya ingin konsultasi/daftar pelatihan NDT.');
  const href = `https://wa.me/${number}?text=${text}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat"
      className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:brightness-95"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6 fill-white">
        <path d="M19.11 17.31c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.84 1.05-.15.18-.31.2-.58.07-.27-.13-1.15-.42-2.2-1.34-.81-.72-1.36-1.6-1.52-1.87-.16-.27-.02-.42.11-.55.11-.11.24-.29.36-.44.12-.15.16-.27.24-.45.08-.18.04-.33-.02-.46-.06-.13-.6-1.44-.82-1.97-.22-.53-.44-.46-.6-.46-.15 0-.33-.02-.51-.02-.18 0-.46.07-.7.33-.24.27-.91.89-.91 2.17 0 1.28.93 2.52 1.06 2.7.13.18 1.83 2.8 4.44 3.92.62.27 1.11.43 1.49.55.63.2 1.21.17 1.67.1.51-.08 1.58-.64 1.8-1.26.22-.62.22-1.15.16-1.26-.06-.11-.24-.18-.51-.31z"/>
        <path d="M26.6 5.4C24.2 3 21.2 1.7 18 1.7c-6.6 0-12 5.4-12 12 0 2.1.6 4.1 1.7 6l-1.8 6.5 6.7-1.8c1.7.9 3.7 1.4 5.6 1.4 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.4zM18 26.3c-1.8 0-3.6-.5-5.1-1.3l-.4-.2-4 .9.9-3.9-.2-.4c-1-1.6-1.6-3.5-1.6-5.4 0-5.7 4.6-10.3 10.3-10.3 2.7 0 5.3 1.1 7.2 3 1.9 1.9 3 4.5 3 7.2-.1 5.7-4.7 10.4-10.4 10.4z"/>
      </svg>
    </a>
  );
}

