import { supabase } from '@/lib/supabaseClient';

/**
 * Mengunggah file ke Supabase Storage dan mengembalikan URL Publiknya.
 * @param file File objek yang akan diunggah (gambar/PDF)
 * @param bucket Nama bucket Supabase (default: 'bukti-transfer')
 * @returns Public URL string dari file yang berhasil diunggah
 */
export async function uploadFileToSupabase(file: File, bucket = 'bukti-transfer'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
            contentType: file.type || (fileExt === 'pdf' ? 'application/pdf' : 'image/jpeg'),
        });

    if (uploadError) {
        console.error('Gagal mengunggah file ke Supabase Storage:', uploadError);
        throw new Error(`Gagal upload file: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    if (!data.publicUrl) {
        throw new Error('Gagal mendapatkan public URL file dari Supabase');
    }

    return data.publicUrl;
}
