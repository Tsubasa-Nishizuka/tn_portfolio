import Link from "next/link";
import labels from "src/labels";

export default function Contact() {
  return (
    <section className="text-center">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-semibold mb-4">
          {labels.CONTACT_TITLE}
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          {labels.CONTACT_DESC}
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/signin"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {labels.CONTACT_BUTTON_TRY}
          </Link>
          <a
            href="https://github.com/Tsubasa-Nishizuka/tn_portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            {labels.CONTACT_BUTTON_GITHUB}
          </a>
        </div>
      </div>
    </section>
  );
}
