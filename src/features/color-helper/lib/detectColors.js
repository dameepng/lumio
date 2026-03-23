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

    let text = typeof response === 'string'
      ? response
      : (response.result || response.text || response.content || JSON.stringify(response));

    // Strip markdown code fences
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      return Array.isArray(parsed) ? parsed : [];
    }

    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('detectColors error:', err);
    return [];
  }
}