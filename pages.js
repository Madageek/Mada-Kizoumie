import { escapeHtml, isoToFr, truncate } from "./layout.js";
<div class="cta-row" style="margin-top:14px">
<a class="btn primary" href="https://www.youtube.com/watch?v=${escapeHtml(v.id)}" target="_blank" rel="noopener">▶ Ouvrir sur YouTube</a>
<a class="btn" href="${basePath}/videos/">← Retour vidéos</a>
</div>
</div>
</div>
</section>`,
jsonLd: JSON.stringify(jsonLd)
};
}


export function pagePlaylistsIndex({ basePath, channel, playlists }) {
const cards = playlists.map((p) => playlistCard({ basePath, p })).join("");
return `
<section class="section">
<h2>Playlists • ${escapeHtml(channel.title)}</h2>
<input class="search" id="q" placeholder="Rechercher une playlist…" aria-label="Rechercher" />
<div class="grid" id="grid">${cards}</div>
</section>
<script>
const q = document.getElementById('q');
const grid = document.getElementById('grid');
const cards = Array.from(grid.querySelectorAll('.card'));
q.addEventListener('input', () => {
const needle = q.value.trim().toLowerCase();
for (const c of cards) {
const t = c.innerText.toLowerCase();
c.style.display = needle && !t.includes(needle) ? 'none' : '';
}
});
</script>`;
}


export function pagePlaylist({ basePath, channel, playlist, items }) {
const cards = items.map((v) => videoCard({ basePath, v })).join("");
return `
<section class="section">
<h2>${escapeHtml(playlist.title)}</h2>
<p class="subtitle">${escapeHtml(playlist.description || "").replaceAll('\n','<br/>')}</p>


<div class="cta-row" style="margin: 8px 0 14px">
<a class="btn primary" href="https://www.youtube.com/playlist?list=${escapeHtml(playlist.id)}" target="_blank" rel="noopener">▶ Ouvrir la playlist sur YouTube</a>
<a class="btn" href="${basePath}/playlists/">← Retour playlists</a>
</div>


<div class="grid">${cards}</div>
</section>`;
}


export function pageCommunity({ basePath, channel }) {
return `
<section class="section">
<h2>Communauté</h2>
<p class="subtitle">
YouTube ne fournit pas (officiellement) d’API publique stable pour lister automatiquement les posts « Communauté ».
Ici, on te met un hub propre avec lien direct + une section “Dernières vidéos” sur l’accueil.
</p>


<div class="panel" style="margin-top:12px">
<div class="panel-inner">
<p class="kicker">Onglet officiel</p>
<p class="subtitle">Pour voir les posts, sondages et images : ouvre l’onglet officiel YouTube.</p>
<div class="cta-row">
<a class="btn primary" href="${escapeHtml(channel.postsUrl)}" target="_blank" rel="noopener">💬 Ouvrir la communauté</a>
<a class="btn" href="${escapeHtml(channel.youtubeUrl)}" target="_blank" rel="noopener">▶ Chaîne YouTube</a>
</div>
</div>
</div>


<div class="panel" style="margin-top:12px">
<div class="panel-inner">
<p class="kicker">Option (plus tard)</p>
<p class="subtitle">
Si tu veux absolument afficher les posts ici, on peut ajouter un “scraper” non-officiel côté GitHub Actions (plus fragile et pas garanti).
</p>
</div>
</div>
</section>`;
}