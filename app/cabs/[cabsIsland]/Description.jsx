export default function Description({ text, className = "" }) {
  // Example text coming from DB
  // "At the sightseeing... (CLICK HERE TO READ city limits for EXCLUDES HOTELS/RESORTS)"

  // Replace only the target phrase with an anchor tag
  const formattedText = text.replace(
    /(CLICK HERE TO READ city limits for EXCLUDES HOTELS\/RESORTS)/g,
    `<a href="/city-limit-policy" target="_blank" class="text-blue-600 underline">$1</a>`
  );

  return (
    <p className={className || ""}
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
}
