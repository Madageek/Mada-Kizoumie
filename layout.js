export function escapeHtml(str = "") {
content = "",
brandTitle = "MadaKizoumie",
brandSubtitle = "gaming • podcasts • mashups",
}) {
const fullTitle = title ? `${escapeHtml(title)} • ${escapeHtml(brandTitle)}` : escapeHtml(brandTitle);
const desc = escapeHtml(description);
const canon = canonical ? escapeHtml(canonical) : "";
const og = escapeHtml(ogImage || "");


const nav = [
{ href: `${basePath}/`, label: "Accueil", key: "home" },
{ href: `${basePath}/videos/`, label: "Vidéos", key: "videos" },
{ href: `${basePath}/playlists/`, label: "Playlists", key: "playlists" },
{ href: `${basePath}/communaute/`, label: "Communauté", key: "community" },
]
.map(
(n) =>
`<a class="${n.key === page ? "active" : ""}" href="${n.href}">${escapeHtml(n.label)}</a>`
)
.join("");


return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${fullTitle}</title>
<meta name="description" content="${desc}" />
${canon ? `<link rel="canonical" href="${canon}" />` : ""}


<meta property="og:type" content="website" />
<meta property="og:title" content="${fullTitle}" />
<meta property="og:description" content="${desc}" />
${canon ? `<meta property="og:url" content="${canon}" />` : ""}
${og ? `<meta property="og:image" content="${og}" />` : ""}


<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${fullTitle}" />
<meta name="twitter:description" content="${desc}" />
${og ? `<meta name="twitter:image" content="${og}" />` : ""}


<link rel="stylesheet" href="${basePath}/assets/styles.css" />
<meta name="theme-color" content="#07070c" />


${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ""}
</head>
<body>
<div class="header">
<div class="header-inner">
<a class="brand" href="${basePath}/">
<div class="brand-mark" aria-hidden="true"></div>
<div>
<h1>${escapeHtml(brandTitle)}</h1>
<p>${escapeHtml(brandSubtitle)}</p>
</div>
</a>
<nav class="nav" aria-label="Navigation principale">
${nav}
</nav>
</div>
</div>


<div class="unbox-strip" aria-hidden="true"></div>


<main class="container">
${content}
<div class="footer">
<div>© ${new Date().getFullYear()} • ${escapeHtml(brandTitle)} • Propulsé par GitHub Pages.</div>
</div>
</main>
</body>
</html>`;
}