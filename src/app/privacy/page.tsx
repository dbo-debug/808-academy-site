export const metadata = {
  title: "Privacy Policy | The 808 Academy",
  description: "Privacy policy for The 808 Academy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-4 text-white/70">
          We respect your privacy. This page will be updated with our full policy shortly.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 space-y-3">
          <p>
            <span className="font-semibold text-white">What we collect:</span> basic contact info you submit (name, email, phone) and enrollment details.
          </p>
          <p>
            <span className="font-semibold text-white">How we use it:</span> to run enrollment, schedule sessions, provide access, and send important updates.
          </p>
          <p>
            <span className="font-semibold text-white">Contact:</span> admin@the808academy.com
          </p>
        </div>
      </section>
    </main>
  );
}
