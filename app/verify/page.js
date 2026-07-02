'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function VerificationForm() {
  const searchParams = useSearchParams();
  const [certificateId, setCertificateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // states: null, 'valid', 'not_found', 'revoked', 'error'
  const [certData, setCertData] = useState(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const sanitizedId = id.trim().toUpperCase();
      setCertificateId(sanitizedId);
      verifyCertificate(sanitizedId);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const val = e.target.value.toUpperCase();
    setCertificateId(val);
    // Clear result when user starts typing a new ID
    if (result) {
      setResult(null);
      setCertData(null);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;
    verifyCertificate(certificateId.trim());
  };

  const verifyCertificate = async (id) => {
    setLoading(true);
    setResult(null);
    setCertData(null);
    try {
      const response = await fetch('/api/verify-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ certificateId: id }),
      });
      
      const data = await response.json();
      setResult(data.status);
      if (data.status === 'valid' && data.data) {
        setCertData(data.data);
      }
    } catch (err) {
      console.error(err);
      setResult('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[640px] mx-auto w-full px-4">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl sm:text-5xl text-forest font-bold mb-4">
          Certificate Verification
        </h1>
        <p className="font-body text-base text-dark/85">
          Enter a GenAIEducate certificate ID to verify its authenticity.
        </p>
      </div>

      <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 mb-10">
        <input
          id="certificate-input"
          type="text"
          value={certificateId}
          onChange={handleInputChange}
          placeholder="e.g. GEE-2026-0001"
          className="flex-1 font-mono text-base border border-[#E0E0E0] rounded px-4 py-3 text-dark focus:outline-none focus:border-forest"
          disabled={loading}
        />
        <button
          id="verify-button"
          type="submit"
          disabled={loading || !certificateId.trim()}
          className="font-body font-semibold text-cream bg-terracotta hover:bg-[#B2451A] px-7 py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      {/* Result Area */}
      {loading && (
        <div className="flex justify-center items-center py-12" id="loading-spinner">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div>
        </div>
      )}

      {!loading && result === 'valid' && certData && (
        <div id="result-valid" className="bg-[#EBF5F1] border border-[#C2E0D4] border-l-4 border-l-forest rounded p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="shrink-0 text-xl font-bold text-forest">✓</span>
            <div>
              <h3 className="font-heading text-xl text-forest font-bold mb-5">
                Certificate Verified
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-4 gap-y-3 font-body text-[15px]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#666] flex items-center">Student Name</span>
                <span className="text-dark font-bold font-heading text-lg">{certData.studentName}</span>

                <span className="font-mono text-xs uppercase tracking-wider text-[#666] flex items-center">Program</span>
                <span className="text-dark font-semibold">{certData.programName}</span>

                <span className="font-mono text-xs uppercase tracking-wider text-[#666] flex items-center">Completed</span>
                <span className="text-dark">{certData.completionDate}</span>

                <span className="font-mono text-xs uppercase tracking-wider text-[#666] flex items-center">Issued</span>
                <span className="text-dark">{certData.issueDate}</span>

                <span className="font-mono text-xs uppercase tracking-wider text-[#666] flex items-center">Certificate ID</span>
                <span className="font-mono font-bold text-sm text-forest">{certData.certificateId}</span>

                <span className="font-mono text-xs uppercase tracking-wider text-[#666] flex items-center">Issued By</span>
                <span className="text-dark font-medium">GenAIEducate — Institute for Generative AI</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && result === 'not_found' && (
        <div id="result-not-found" className="bg-[#FDF3F2] border border-[#FADCD9] border-l-4 border-l-[#D93025] rounded p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="shrink-0 text-xl font-bold text-[#D93025]">✗</span>
            <div>
              <h3 className="font-heading text-xl text-[#D93025] font-bold mb-3">
                Certificate Not Found
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-dark mb-4">
                No certificate matching this ID exists in our records.
              </p>
              <p className="font-body text-sm text-[#5F6368] leading-relaxed">
                If you believe this is an error, contact{' '}
                <a href="mailto:hello@genaieducate.com" className="text-forest hover:underline">
                  hello@genaieducate.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && result === 'revoked' && (
        <div id="result-revoked" className="bg-[#FEF7F0] border border-[#FBE3CD] border-l-4 border-l-terracotta rounded p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="shrink-0 text-xl font-bold text-terracotta">⚠</span>
            <div>
              <h3 className="font-heading text-xl text-terracotta font-bold mb-3">
                Certificate Revoked
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-dark mb-4">
                This certificate has been revoked and is no longer valid.
              </p>
              <p className="font-body text-sm text-[#5F6368] leading-relaxed">
                Contact{' '}
                <a href="mailto:hello@genaieducate.com" className="text-forest hover:underline">
                  hello@genaieducate.com
                </a>{' '}
                for more information.
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && result === 'error' && (
        <div id="result-error" className="bg-lightgray border border-[#E0E0E0] border-l-4 border-l-[#5F6368] rounded p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="shrink-0 text-xl font-bold text-[#5F6368]">⚠</span>
            <div>
              <h3 className="font-heading text-xl text-dark font-bold mb-3">
                Verification Error
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-dark">
                An error occurred while trying to verify the certificate. Please try again later. If the problem persists, contact{' '}
                <a href="mailto:hello@genaieducate.com" className="text-forest hover:underline font-semibold">
                  hello@genaieducate.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col justify-between">
      <div>
        <Nav />
        <section className="py-16 sm:py-24">
          <Suspense fallback={
            <div className="max-w-[640px] mx-auto w-full px-4 text-center">
              <h1 className="font-heading text-4xl sm:text-5xl text-forest font-bold mb-4">Certificate Verification</h1>
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div>
              </div>
            </div>
          }>
            <VerificationForm />
          </Suspense>
        </section>
      </div>
      <Footer />
    </main>
  );
}
