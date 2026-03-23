import { callClaude } from '../../../core/lib/anthropic';

export async function detectColors(base64Image) {
  const prompt = `Kamu adalah sistem deteksi warna.
Analisis gambar ini dan identifikasi 3-5 warna paling dominan yang terlihat.
Jawab HANYA dengan JSON array berikut tanpa teks lain:
[
  {
    "nameId": "merah tua",
    "nameEn": "dark red",
    "hex": "#8B0000",
    "area": "kiri atas",
    "percentage": 35
  }
]
Rules:
- nameId: nama warna dalam Bahasa Indonesia yang deskriptif
- nameEn: nama warna dalam Bahasa Inggris
- hex: kode hex warna yang paling mendekati
- area: posisi area warna di gambar (kiri atas/kanan atas/tengah/kiri bawah/kanan bawah)
- percentage: estimasi persentase area warna (total semua harus ~100%)
- Maksimal 5 warna, minimal 1 warna
- Urutkan dari persentase terbesar ke terkecil`;

  try {
    const response = await callClaude(base64Image, prompt);

    // handle response.result dari API proxy (sama seperti classifyRupiah)
    let text = typeof response === 'string'
      ? response
      : (response.result || response.text || response.content || JSON.stringify(response));

    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      return JSON.parse(match[0]);
    }
    return JSON.parse(text);
  } catch (err) {
    console.error('detectColors parse error:', err);
    return [];
  }
}