import { Document, Page, Text, View, StyleSheet, Font, Svg, Path, Rect, Line, Defs, LinearGradient, Stop } from '@react-pdf/renderer';

// Register IBM Plex Sans for cert (Google Fonts CDN — works in @react-pdf)
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
    padding: 0,
    fontFamily: 'IBM Plex Sans',
    color: '#0F172A',
    position: 'relative',
  },
  // Decorative band top
  topBand: { height: 18, backgroundColor: '#0F172A' },
  topAccent: { height: 4, backgroundColor: '#EA580C' },
  bottomAccent: { height: 4, backgroundColor: '#EA580C', marginTop: 'auto' },
  bottomBand: { height: 18, backgroundColor: '#0F172A' },
  // Inner border
  border: {
    position: 'absolute',
    top: 36,
    left: 36,
    right: 36,
    bottom: 36,
    borderWidth: 1,
    borderColor: '#0F172A',
    borderStyle: 'solid',
  },
  borderInner: {
    position: 'absolute',
    top: 44,
    left: 44,
    right: 44,
    bottom: 44,
    borderWidth: 0.5,
    borderColor: '#94A3B8',
    borderStyle: 'dashed',
  },
  // Content
  content: {
    paddingTop: 60,
    paddingHorizontal: 70,
    paddingBottom: 40,
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 36,
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandSwatch: {
    width: 16,
    height: 16,
    backgroundColor: '#EA580C',
    borderRadius: 3,
  },
  brandText: { fontSize: 14, fontWeight: 700, letterSpacing: -0.5 },
  brandSub: { fontSize: 8, fontFamily: 'IBM Plex Mono', color: '#64748B', letterSpacing: 1 },
  serialBlock: { alignItems: 'flex-end' },
  serialLabel: { fontSize: 7, fontFamily: 'IBM Plex Mono', color: '#64748B', letterSpacing: 1.4, textTransform: 'uppercase' },
  serialNumber: { fontSize: 12, fontFamily: 'IBM Plex Mono', fontWeight: 500, marginTop: 2 },
  // Headline
  kicker: {
    fontSize: 9,
    fontFamily: 'IBM Plex Mono',
    color: '#EA580C',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: 500,
    marginBottom: 6,
  },
  certifyText: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  recipientName: {
    fontSize: 36,
    fontWeight: 700,
    letterSpacing: -1,
    marginBottom: 18,
    color: '#0F172A',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#0F172A',
    borderBottomStyle: 'solid',
  },
  awardLine: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 1.4,
  },
  pathTitle: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: -0.4,
    marginBottom: 4,
    color: '#0F172A',
  },
  pathSubtitle: {
    fontSize: 11,
    fontFamily: 'IBM Plex Mono',
    color: '#64748B',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  body: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: 30,
    maxWidth: '80%',
  },
  // Stats / metadata box
  metaBox: {
    flexDirection: 'row',
    gap: 32,
    paddingTop: 18,
    borderTopWidth: 0.5,
    borderTopColor: '#94A3B8',
    borderTopStyle: 'solid',
    marginTop: 'auto',
  },
  metaCell: { flexDirection: 'column', gap: 2 },
  metaLabel: { fontSize: 7, fontFamily: 'IBM Plex Mono', color: '#64748B', letterSpacing: 1.2, textTransform: 'uppercase' },
  metaValue: { fontSize: 13, fontWeight: 600, color: '#0F172A' },
  // Signature row
  sigRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 28,
    gap: 30,
  },
  sigBlock: { flex: 1 },
  sigName: { fontSize: 12, fontWeight: 600, color: '#0F172A' },
  sigTitle: { fontSize: 9, fontFamily: 'IBM Plex Mono', color: '#64748B', letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 1 },
  sigLine: { borderTopWidth: 0.5, borderTopColor: '#0F172A', borderTopStyle: 'solid', marginBottom: 4, paddingTop: 0 },
  // QR
  qrBlock: { alignItems: 'flex-end', gap: 4 },
  qrCaption: { fontSize: 7, fontFamily: 'IBM Plex Mono', color: '#64748B', letterSpacing: 1.2, textTransform: 'uppercase' },
});

function GeometricLogo() {
  // SNS NDT geometric mark (mimics sidebar swatch + decorative element)
  return (
    <Svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute', top: 60, right: 70 }}>
      <Defs>
        <LinearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#EA580C" />
          <Stop offset="1" stopColor="#F59E0B" />
        </LinearGradient>
      </Defs>
      <Rect x="2" y="2" width="56" height="56" fill="#0F172A" />
      <Rect x="6" y="6" width="48" height="48" fill="url(#g1)" />
      <Rect x="14" y="14" width="32" height="32" fill="#0F172A" />
      <Rect x="22" y="22" width="16" height="16" fill="#F59E0B" />
    </Svg>
  );
}

function QRPlaceholder({ token }) {
  // Simple geometric QR-style block. Real QR rendered separately if needed.
  // For scanability, use the simple mark + show URL textually.
  const cells = 9;
  const size = 72;
  const cellSize = size / cells;
  // Deterministic pattern from token hash
  const pattern = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const seed = (r * 31 + c * 17 + (token?.charCodeAt((r * cells + c) % (token?.length || 1)) || 0));
      const filled = (seed % 3) === 0 ||
        (r === 0 || c === 0 || r === cells - 1 || c === cells - 1) ||
        ((r === 1 && c === 1) || (r === 1 && c === cells - 2) || (r === cells - 2 && c === 1));
      if (filled) pattern.push({ r, c });
    }
  }

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Rect x={0} y={0} width={size} height={size} fill="#FFFFFF" />
      {pattern.map((p, i) => (
        <Rect key={i} x={p.c * cellSize} y={p.r * cellSize} width={cellSize} height={cellSize} fill="#0F172A" />
      ))}
    </Svg>
  );
}

export default function CertificatePDF({ certificate, recipient, path, instructor }) {
  const issued = certificate?.issuedAt
    ? new Date(certificate.issuedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  const verifyUrl = certificate?.qrToken
    ? `https://sarndtservices.com/e-learning/certificates/verify/${certificate.qrToken}`
    : '—';

  return (
    <Document
      title={`Certificate · ${certificate?.serialNumber || ''}`}
      author="SNS NDT Services"
      subject={`Certificate of Proficiency — ${path?.title || ''}`}
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Top bands */}
        <View style={styles.topBand} />
        <View style={styles.topAccent} />

        {/* Borders */}
        <View style={styles.border} />
        <View style={styles.borderInner} />

        {/* Geometric logo decoration */}
        <GeometricLogo />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.brandBlock}>
              <View style={styles.brandSwatch} />
              <View>
                <Text style={styles.brandText}>SNS NDT</Text>
                <Text style={styles.brandSub}>SAR NDT SERVICES</Text>
              </View>
            </View>
            <View style={styles.serialBlock}>
              <Text style={styles.serialLabel}>Certificate №</Text>
              <Text style={styles.serialNumber}>{certificate?.serialNumber || 'SNS-XX-LX-XXXXX'}</Text>
            </View>
          </View>

          <Text style={styles.kicker}>◉ Certificate of Proficiency</Text>
          <Text style={styles.certifyText}>This is to certify that</Text>
          <Text style={styles.recipientName}>{recipient?.username || 'Inspector Name'}</Text>

          <Text style={styles.awardLine}>has successfully completed all required modules and final assessment for</Text>
          <Text style={styles.pathTitle}>{path?.title || 'Path Title'}</Text>
          <Text style={styles.pathSubtitle}>
            {path?.code} · {path?.method} · {path?.level}
          </Text>

          <Text style={styles.body}>
            achieving a final assessment score of {certificate?.score ? Math.round(certificate.score) : 0}% — meeting the
            minimum 75% required for certification. This proficiency aligns with ASNT Standard Topical Outline (CP-105) and
            SNT-TC-1A 2020 recommended practice.
          </Text>

          <View style={styles.metaBox}>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Final Score</Text>
              <Text style={styles.metaValue}>{certificate?.score ? `${Math.round(certificate.score)}%` : '—'}</Text>
            </View>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Issued</Text>
              <Text style={styles.metaValue}>{issued}</Text>
            </View>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Method</Text>
              <Text style={styles.metaValue}>{path?.method || '—'} {path?.level || ''}</Text>
            </View>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Validity</Text>
              <Text style={styles.metaValue}>5 years (recert)</Text>
            </View>
          </View>

          {/* Signature + QR */}
          <View style={styles.sigRow}>
            <View style={styles.sigBlock}>
              <View style={styles.sigLine} />
              <Text style={styles.sigName}>{instructor?.username || 'Saenal Aladin Rapi'}</Text>
              <Text style={styles.sigTitle}>Instructor · ASNT Level III</Text>
            </View>
            <View style={styles.sigBlock}>
              <View style={styles.sigLine} />
              <Text style={styles.sigName}>SAR NDT Services</Text>
              <Text style={styles.sigTitle}>Authorized Issuer</Text>
            </View>
            <View style={styles.qrBlock}>
              <QRPlaceholder token={certificate?.qrToken || 'SNS'} />
              <Text style={styles.qrCaption}>Verify · {certificate?.qrToken?.slice(0, 12) || ''}…</Text>
            </View>
          </View>
        </View>

        {/* Bottom bands */}
        <View style={styles.bottomAccent} />
        <View style={styles.bottomBand} />
      </Page>
    </Document>
  );
}
