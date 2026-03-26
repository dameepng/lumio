import { callClaude } from '../../../core/lib/anthropic';

export async function detectColors(base64Image) {
  const prompt = `Kamu adalah sistem identifikasi objek dan warna.
Lihat gambar ini, identifikasi objek utama yang terlihat, dan tentukan warna dominannya.
Jawab HANYA dengan JSON berikut tanpa teks lain:
{
  "object": "apel",
  "nameId": "merah",
  "nameEn": "red",
  "hex": "#CC0000",
  "description": "Apel ini berwarna merah cerah"
}

Rules:
- object: nama objek utama dalam Bahasa Indonesia (singkat, 1-2 kata)
- nameId: nama warna dominan dalam Bahasa Indonesia
- nameEn: nama warna dominan dalam Bahasa Inggris
- hex: kode hex warna yang paling mendekati warna dominan
- description: kalimat deskripsi natural, contoh "Apel ini berwarna merah cerah"
- Kalau tidak ada objek jelas, isi object dengan "objek ini"
- Jawab HANYA JSON, tanpa markdown, tanpa teks lain`;

  try {
    const response = await callClaude(base64Image, prompt);

    let text = typeof response === 'string'
      ? response
      : (response.result || response.text || response.content || JSON.stringify(response));

    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (parsed.object && parsed.nameId && parsed.hex) {
        return parsed;
      }
    }
    return null;
  } catch (err) {
    console.error('detectColors error:', err);
    return null;
  }
}