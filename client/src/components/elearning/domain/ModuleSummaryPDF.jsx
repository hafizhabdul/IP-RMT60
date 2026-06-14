import { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { FileText } from 'lucide-react';
import { learningPathService } from '@/services/learningPathService';

// Register IBM Plex Sans (Google Fonts CDN — works in @react-pdf), mirroring CertificatePDF.jsx
Font.register({
  family: 'IBM Plex Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKtdbUFI5NadY.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIxsdO_q.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76AJBsdO_q.ttf', fontWeight: 700 },
  ],
});
Font.register({
  family: 'IBM Plex Mono',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n5igg1l9kn-s.ttf', fontWeight: 500 },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 52,
    fontFamily: 'IBM Plex Sans',
    color: '#0F172A',
    fontSize: 11,
    lineHeight: 1.5,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#0F172A',
    borderBottomStyle: 'solid',
    marginBottom: 22,
  },
  brandBlock: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandSwatch: { width: 14, height: 14, backgroundColor: '#EA580C', borderRadius: 3 },
  brandText: { fontSize: 13, fontWeight: 700, letterSpacing: -0.4 },
  brandSub: { fontSize: 7, fontFamily: 'IBM Plex Mono', color: '#64748B', letterSpacing: 1 },
  headerMeta: { alignItems: 'flex-end' },
  headerMetaLabel: {
    fontSize: 7,
    fontFamily: 'IBM Plex Mono',
    color: '#64748B',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  headerMetaValue: { fontSize: 10, fontFamily: 'IBM Plex Mono', fontWeight: 500, marginTop: 2 },
  // Title block
  kicker: {
    fontSize: 8,
    fontFamily: 'IBM Plex Mono',
    color: '#EA580C',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontWeight: 500,
    marginBottom: 6,
  },
  pathTitle: { fontSize: 11, color: '#64748B', marginBottom: 4 },
  moduleTitle: { fontSize: 22, fontWeight: 700, letterSpacing: -0.4, marginBottom: 4, color: '#0F172A' },
  moduleSub: {
    fontSize: 9,
    fontFamily: 'IBM Plex Mono',
    color: '#64748B',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 22,
  },
  // Step block
  step: { marginBottom: 18 },
  stepHeading: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  stepNumber: {
    fontSize: 9,
    fontFamily: 'IBM Plex Mono',
    fontWeight: 500,
    color: '#FFFFFF',
    backgroundColor: '#0F172A',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  stepTitle: { fontSize: 14, fontWeight: 600, color: '#0F172A', flex: 1 },
  quizTag: {
    fontSize: 8,
    fontFamily: 'IBM Plex Mono',
    color: '#475569',
    backgroundColor: '#F1F5F9',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  slide: {
    marginLeft: 14,
    marginBottom: 10,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#FED7AA',
    borderLeftStyle: 'solid',
  },
  slideHeading: { fontSize: 11.5, fontWeight: 600, color: '#0F172A', marginBottom: 4 },
  paragraph: { fontSize: 10.5, color: '#334155', lineHeight: 1.55, marginBottom: 5 },
  bullet: { fontSize: 10.5, color: '#334155', lineHeight: 1.5, marginBottom: 3, marginLeft: 6 },
  callout: {
    marginLeft: 14,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#FFF7ED',
    borderRadius: 4,
  },
  calloutTag: {
    fontSize: 7,
    fontFamily: 'IBM Plex Mono',
    color: '#EA580C',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 3,
    fontWeight: 500,
  },
  calloutText: { fontSize: 10, color: '#7C2D12', lineHeight: 1.5 },
  emptyStep: { marginLeft: 14, fontSize: 10, color: '#94A3B8', fontStyle: 'italic' },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 52,
    right: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#94A3B8',
    borderTopStyle: 'solid',
  },
  footerText: { fontSize: 7.5, fontFamily: 'IBM Plex Mono', color: '#64748B', letterSpacing: 0.8 },
});

// Split a body string into readable paragraphs (mirrors ReadingSlide's "\n\n" split).
function toParagraphs(body) {
  if (!body || typeof body !== 'string') return [];
  return body
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);
}

function ReadingStepBody({ contentJson }) {
  const slides = Array.isArray(contentJson?.slides) ? contentJson.slides : [];
  if (slides.length === 0) {
    return <Text style={styles.emptyStep}>Konten reading belum tersedia.</Text>;
  }
  return (
    <View>
      {slides.map((slide, i) => (
        <View key={i} style={styles.slide} wrap={false}>
          {slide?.heading ? <Text style={styles.slideHeading}>{slide.heading}</Text> : null}
          {toParagraphs(slide?.body).map((para, j) => (
            <Text key={j} style={styles.paragraph}>{para}</Text>
          ))}
          {Array.isArray(slide?.bullets) && slide.bullets.length > 0
            ? slide.bullets.map((b, j) => (
                <Text key={`b-${j}`} style={styles.bullet}>{`•  ${b}`}</Text>
              ))
            : null}
          {slide?.callout?.text ? (
            <View style={styles.callout}>
              {slide.callout.tag ? <Text style={styles.calloutTag}>{slide.callout.tag}</Text> : null}
              <Text style={styles.calloutText}>{slide.callout.text}</Text>
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
}

export function ModuleSummaryDocument({ module, pathTitle, methodLabel }) {
  const steps = Array.isArray(module?.steps) ? module.steps : [];
  const moduleNumber = module?.orderIndex ?? '';
  const generated = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Document
      title={`Ringkasan Modul — ${module?.title || ''}`}
      author="SNS NDT Services"
      subject={`Ringkasan modul ${pathTitle || ''}`}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          <View style={styles.brandBlock}>
            <View style={styles.brandSwatch} />
            <View>
              <Text style={styles.brandText}>SNS NDT</Text>
              <Text style={styles.brandSub}>SAR NDT SERVICES</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaLabel}>Ringkasan Modul</Text>
            <Text style={styles.headerMetaValue}>{methodLabel || '—'}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.kicker}>◉ Ringkasan Pembelajaran</Text>
        {pathTitle ? <Text style={styles.pathTitle}>{pathTitle}</Text> : null}
        <Text style={styles.moduleTitle}>{module?.title || 'Modul'}</Text>
        <Text style={styles.moduleSub}>
          {moduleNumber !== '' ? `Modul ${moduleNumber}` : 'Modul'} · {steps.length} step
        </Text>

        {/* Steps */}
        {steps.length === 0 ? (
          <Text style={styles.emptyStep}>Modul ini belum memiliki konten.</Text>
        ) : (
          steps.map((step, idx) => {
            const isQuiz = step?.kind === 'quiz';
            const isReading = step?.kind === 'reading';
            return (
              <View key={step?.id ?? idx} style={styles.step} wrap>
                <View style={styles.stepHeading}>
                  <Text style={styles.stepNumber}>{idx + 1}</Text>
                  <Text style={styles.stepTitle}>
                    {isQuiz ? `Kuis: ${step?.title || 'Asesmen'}` : (step?.title || 'Step')}
                  </Text>
                  {isQuiz ? <Text style={styles.quizTag}>Asesmen</Text> : null}
                </View>
                {isReading ? <ReadingStepBody contentJson={step?.contentJson} /> : null}
                {!isReading && !isQuiz ? (
                  <Text style={styles.emptyStep}>
                    {step?.contentJson?.sceneCaption || step?.contentJson?.body || 'Langkah animasi / interaktif — buka di platform untuk konten penuh.'}
                  </Text>
                ) : null}
              </View>
            );
          })
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>SNS NDT · sarndtservices.com</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `Dibuat ${generated} · Hal. ${pageNumber}/${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}

// Build a safe file name like 'Ringkasan-RT-L1-Modul-2.pdf'
function buildFileName({ pathCode, module }) {
  const safeCode = (pathCode || 'modul').toString().replace(/[^\w-]+/g, '-');
  const order = module?.orderIndex ?? '';
  return `Ringkasan-${safeCode}-Modul-${order}.pdf`;
}

export function DownloadModuleSummaryButton({
  module,
  moduleNumber,
  pathTitle,
  methodLabel,
  pathCode,
  className,
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Path detail is lightweight (no step contentJson), so fetch the module's
      // full content on demand before rendering the PDF. Fall back to whatever
      // module data we already have if the fetch fails.
      let fullModule = module;
      const num = moduleNumber ?? module?.orderIndex;
      try {
        if (pathCode && num != null) {
          const fetched = await learningPathService.module(pathCode, num);
          if (fetched) fullModule = fetched;
        }
      } catch {
        /* keep fallback module */
      }
      // Lazy/dynamic import so the PDF lib never bloats the main bundle.
      const { pdf } = await import('@react-pdf/renderer');
      const blob = await pdf(
        <ModuleSummaryDocument module={fullModule} pathTitle={pathTitle} methodLabel={methodLabel} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = buildFileName({ pathCode, module });
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      // Best-effort; surface a gentle hint if available.
      const { showToast } = await import('@/utils/toast').catch(() => ({ showToast: null }));
      if (showToast) showToast.error('Gagal membuat ringkasan PDF. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className={
        className ||
        'inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 font-plexMono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 disabled:opacity-60 disabled:cursor-wait'
      }
      aria-label={`Unduh ringkasan modul ${module?.title || ''} (PDF)`}
    >
      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
      {loading ? 'Menyiapkan…' : 'Unduh ringkasan (PDF)'}
    </button>
  );
}

export default ModuleSummaryDocument;
