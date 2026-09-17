import { INFO_REKENING_PESANTREN } from "@/constants/rekeningPesantren";
import type { TunggakanSantri } from "@/types/Tunggakan";
import { formatPeriodeBulan } from "@/lib/utils";

export function generateWaLinkTunggakan(santri: TunggakanSantri): string {
    const rincian = santri.tagihanList
        .map((t) => {
            const infoPeriode = formatPeriodeBulan(t.periode);
            const labelPeriode = infoPeriode ? ` (${infoPeriode})` : '';
            return `- ${t.namaTagihan}${labelPeriode}: Rp ${t.sisaTagihan.toLocaleString('id-ID')}`;
        })
        .join('\n');

    const pesan = `Assalamualaikum wr wb

Diberitahukan kepada wali santri *${santri.santri.namaLengkap}* yang mempunyai tunggakan pembayaran, mohon segera membayar/melunaskan tunggakan yang bersangkutan.

Rincian Tunggakan:
${rincian}
Total: Rp ${santri.totalTunggakan.toLocaleString('id-ID')}

${INFO_REKENING_PESANTREN.noRekening}
${INFO_REKENING_PESANTREN.namaBank}
An ${INFO_REKENING_PESANTREN.atasNama}

*Ttd bendahara asrama ${INFO_REKENING_PESANTREN.namaAsrama}*`;

    const nomorNormalized = normalizeNomorWa(santri.noHpAyah ?? '');
    return `https://wa.me/${nomorNormalized}?text=${encodeURIComponent(pesan)}`;
}

function normalizeNomorWa(nomor: string): string {
    let cleaned = nomor.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.slice(1);
    }
    return cleaned;
}