import fs from "node:fs/promises";
for (const p of playlists) {
const items = await getPlaylistItems(p.id);
const content = pagePlaylist({ basePath, channel, playlist: p, items });
const canon = canonicalFor(`/playlists/${p.id}.html`);
const html = layout({
basePath,
page: "playlists",
title: p.title,
description: truncate(p.description || `Playlist ${p.title}`, 160),
canonical: canon,
ogImage: p.thumbnail || channel.thumb,
content,
brandTitle: channel.title,
brandSubtitle: "gaming • podcasts • mashups",
});
await write(path.join(OUT, `playlists/${p.id}.html`), html);
}


// Community
{
const content = pageCommunity({ basePath, channel });
const html = layout({
basePath,
page: "community",
title: "Communauté",
description: `Actus et posts de la communauté ${channel.title}.`,
canonical: canonicalFor("/communaute/"),
ogImage: channel.thumb,
content,
brandTitle: channel.title,
brandSubtitle: "gaming • podcasts • mashups",
});
await write(path.join(OUT, "communaute/index.html"), html);
}


// robots.txt
await write(
path.join(OUT, "robots.txt"),
`User-agent: *\nAllow: /\n${SITE_URL ? `Sitemap: ${SITE_URL}${basePath}/sitemap.xml\n` : ""}`
);


// sitemap.xml (simple: on liste les pages générées)
const urls = [
`${basePath}/`,
`${basePath}/videos/`,
`${basePath}/playlists/`,
`${basePath}/communaute/`,
...videos.map((v) => `${basePath}/videos/${v.id}.html`),
...playlists.map((p) => `${basePath}/playlists/${p.id}.html`),
];


const now = new Date().toISOString();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
.map((u) => {
const loc = SITE_URL ? `${SITE_URL}${u}` : u;
return ` <url><loc>${loc}</loc><lastmod>${now}</lastmod></url>`;
})
.join("\n")}
</urlset>`;


await write(path.join(OUT, "sitemap.xml"), sitemap);


// petite sortie console
console.log(`Built: ${videos.length} videos, ${playlists.length} playlists → dist/`);
}


await build();